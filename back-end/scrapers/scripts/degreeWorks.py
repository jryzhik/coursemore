from bs4 import BeautifulSoup
import sys

# print('#Hello from python#')
# print('File name: ' + sys.argv[1] + '#')
file_name = sys.argv[1]
file_path = 'uploads/' + file_name
# print("file path", file_path)

with open(file_path, 'r') as html_file:
    content = html_file.read()

    soup = BeautifulSoup(content, 'lxml')
    possible_titles = soup.find_all('td', class_='RuleAdviceTitle')
    listRequirementCount = []
    acceptedCourseListDraft = []
    acceptedCourseListFinal = []
    requiredCourseNumbersOnly = []
    for i in range(0, len(possible_titles)):
        if 'Still Needed:' in possible_titles[i]:
            listRequirementCount.append(i)
    for i in range(0, len(listRequirementCount)):
        rule_in_question = possible_titles[listRequirementCount[i]].next_sibling.next_sibling
        if rule_in_question.a is not None:
            acceptedCourseListDraft.append(rule_in_question)
    for course in acceptedCourseListDraft:
        acceptedCourseListFinal = acceptedCourseListFinal + course.find_all('a')
    for course in acceptedCourseListFinal:
        course_number = ""
        for c in course.text:
            if c.isdigit():
                course_number = course_number + c
        requiredCourseNumbersOnly.append(course_number)

    for course in requiredCourseNumbersOnly:
        print("CS ", course)