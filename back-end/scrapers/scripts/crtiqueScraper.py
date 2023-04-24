import requests
import json
import time

"""NEED TO CALL MONGODB instructors and only get name"""
course_size_weights = {
    'very small (fewer than 10 students)': 5,
    'small (10-20 students)': 15,
    'mid-size (21-30 students)': 25,
    'large (31-49 students)': 40,
    'very large (50 students or more)': 50
}


def average_gpa(list_GPA):
    sum_gpa = 0.0
    total_weight = 0
    for value in list_GPA:
        course_weight = course_size_weights[value['class_size_group'].lower()]
        course_weighted_gpa = course_weight * value['GPA']
        sum_gpa += course_weighted_gpa
        total_weight += course_weight
    average_gpa = sum_gpa / total_weight
    return round(average_gpa, 2)


"""Used for accurate search of professors"""


def reverse_name(name):
    name_to_list = name.split()
    reverse_name_string = ""
    middle_name = True if len(name_to_list) == 3 else False
    while len(name_to_list) > 0:
        if len(name_to_list) == 2 and middle_name:
            reverse_name_string += name_to_list[0] + " "
            name_to_list.remove(name_to_list[0])
        if len(name_to_list) == 1:
            reverse_name_string += name_to_list.pop()
        else:
            reverse_name_string += name_to_list.pop() + " "
    return reverse_name_string


# Get all the courses from course collection
all_courses = requests.get('http://localhost:5050/courses/')
all_courses = all_courses.json()
for course in all_courses:
    """Find the unique valueID of professor from course critique"""
    name_fromDB = course["InstructorName"]
    if name_fromDB != 'TBA':
        #See if instructor already exists
        json_create_look = f'"InstructorName": "{name_fromDB}"'
        json_create_look = '{' + json_create_look + '}'
        json_initialize_look = json.loads(json_create_look)
        res = requests.get('http://localhost:5050/instructors/instructor', json=json_initialize_look)
        if res.json() == []:
            name_fromDB_reversed = reverse_name(name_fromDB)
            course_critique_search = requests.get(
                f"https://c4citk6s9k.execute-api.us-east-1.amazonaws.com/prod/elastic?q={name_fromDB_reversed}").json()
            professor_object = course_critique_search.get('searchresponse')[0]
            professor_name = professor_object['value']
            professor_uniqueID = professor_object['uniqueID']
            """Use the uniqueID and find GPA"""
            professor_report = requests.get(
                f"https://c4citk6s9k.execute-api.us-east-1.amazonaws.com/prod/data/prof?profID={professor_uniqueID}&by=section").json()
            professor_data_raw = professor_report.get('raw')
            if professor_data_raw != []:
                final_average_gpa = average_gpa(professor_data_raw)

                #Add instructor to Instructor Collection in MongoDB
                json_create = f'"InstructorName": "{name_fromDB}", "GPA": "{final_average_gpa}"'
                json_create = '{' + json_create + '}'
                json_initialize = json.loads(json_create)
                res = requests.post('http://localhost:5050/instructors/add', json=json_initialize)
                time.sleep(0.200)

