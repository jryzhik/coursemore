from bs4 import BeautifulSoup
import requests
import json

# def custom_join(elements):
#     output_string = ""
#     for x in range(0, len(elements) - 1):
#         if x == 0:
#             output_string = output_string + elements[x]
#         else:
#             output_string = output_string + " " + elements[x]
#     return output_string


def military_time(time_period, time):
    if time_period == 'pm' and time != '12':
        return int(time) + 12
    else:
        return int(time)


with open('../html/oscarExport.html', 'r') as html_file:
    content = html_file.read()

    soup = BeautifulSoup(content, 'lxml')
    courseHeaders = soup.find_all('th', class_='ddtitle')
    z = 0
    m = 0
    for courseHeader in courseHeaders:
        # courseHeader = courseHeaders.__getitem__(150)
        courseInfo = courseHeader.find_parent().find_next_sibling().find('td', class_='dddefault')
        """ Begin Extracting from Title element"""
        courseHeader = courseHeader.next_element.get_text()
        courseHeaderElements = courseHeader.split(' - ')
        courseName = courseHeaderElements.__getitem__(len(courseHeaderElements) - 4)
        courseCRN = courseHeaderElements.__getitem__(len(courseHeaderElements) - 3)
        courseNumber = courseHeaderElements.__getitem__(len(courseHeaderElements) - 2).split().__getitem__(1)
        courseSection = courseHeaderElements.__getitem__(len(courseHeaderElements) - 1)
        """ Begin Extracting from Info element"""
        creditContained = courseInfo.text.split(' Credits').__getitem__(0).split(' ')
        # Remove all courses that have varied amount of credits
        if creditContained.__contains__('TO'):
            # Need to skip course and go to next one.
            # print("Skipped #", m, ": ", courseName)
            m = m + 1
        else:
            courseCredits = creditContained.__getitem__(len(creditContained) - 1)
            tableElements = courseInfo.find('tbody').find_all('tr').__getitem__(1).find_all('td')
            """ Begin Formatting the Time"""
            courseTime = tableElements[1].text.strip()
            if courseTime == 'TBA':
                hour_start = None
                hour_end = None
                minute_start = None
                minute_end = None
            else:
                time_range = courseTime.split(' - ')
                hour_start = time_range[0].split(':')[0]
                hour_start = military_time(time_range[0].split(':')[1].split(' ')[1], hour_start)
                # hour_start = hour_start if time_range[1].split(':')[1].split(' ')[1] == 'am' else hour_start
                minute_start = time_range[0].split(':')[1].split(' ')[0]
                hour_end = time_range[1].split(':')[0]
                hour_end = military_time(time_range[1].split(':')[1].split(' ')[1], hour_end)
                minute_end = time_range[1].split(':')[1].split(' ')[0]
            courseDays = None if tableElements[2].text.strip() == '' else tableElements[2].text.strip()
            courseLocation = tableElements[3].text.strip()
            # courseInstructor = tableElements[6].a['target']
            # custom_join(tableElements[6].text.split())
            courseInstructor = 'TBA' if tableElements[6].text.split()[0] == 'TBA' else tableElements[6].a['target']
#             print(f'''Iteration: {z} Course Name : {courseName}
#             CRN: {courseCRN}
#             Course Number: CS {courseNumber}
#             Section: {courseSection}
#             Credits: {courseCredits}
# Ï            Time Text: {courseTime}
#             Hour Start: {hour_start}
#             Minute Start: {minute_start}
#             Hour End: {hour_end}
#             Minute End: {minute_end}
#             Days: {courseDays}
#             Location: {courseLocation}
#             ''' )
            json_create = f'"CourseName": "{courseName}", "CourseInstructor": "{courseInstructor}", "CRN": "{courseCRN}", "CourseNumber": "{courseNumber}", "Section": "{courseSection}", "Credits": "{courseCredits}", "TimeText": "{courseTime}", "HourStart": "{hour_start}", "MinuteStart": "{minute_start}", "HourEnd": "{hour_end}", "MinuteEnd": "{minute_end}", "Days": "{courseDays}", "Location": "{courseLocation}"'
            json_create = '{' + json_create + '}'
            json_initialize = json.loads(json_create)
            res = requests.post('http://localhost:5050/courses/add', json=json_initialize)

            z = (z + 1)


