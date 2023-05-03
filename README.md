# Credentials

### MongoDB cluster0
```javascript 
username: coursemoreadmin
password: GT!ChristMercyGrace;;23
percentEncodedPassword: GT%21ChristMercyGrace%3B%3B23
```
### Scraper Python Dependencies
    1. Create virtual environment instance https://code.visualstudio.com/docs/python/python-tutorial
    2. Run following commands
            pip3 install lxml
            pip3 install bs4
            pip3 install beautifulsoup4
## Make sure node.js is installed
https://nodejs.org/en/download

### Run Server and Install Dependencies
    In the terminal (back-end Repo)...
        npm i
        node server.js

### Run Front-End Install Dependencies
    In the terminal (front-end Repo)...
        npm i
        npm start

## You must have your IP address added in MONGO ATLAS 
    If you are running our MONGO project you should recieve invitation from Abrar. If you would like to generate data yourself
        1. Run python3 oscarScraper.py
        2. Run python3 critiqueScraper.py

        At this point you should have all necessary data in DB


### EXAMPLE Degree Works Export (for testing)
https://github.com/jryzhik/coursemore/blob/main/ExampleDegreeWorks.html

### OSCAR HTML RAW FILE (for courses)
https://github.com/jryzhik/coursemore/blob/main/back-end/scrapers/html/oscarExport.html

### FIGMA UI design
https://www.figma.com/file/LTBjmbi02y4R7yEKTLsATf/coursemore?node-id=0%3A1&t=vctNezqlDxAA4Zuw-1

### WORK OUTLINE

- [x] Start Rough UI
- [x] Filter Page Rough UI
- [x] Rank Page Rough UI
- [x] Schedule Page Rough UI
- [x] Create Routes
- [x] Create Mongo Schema
- [x] Create Oscar Scraper
- [x] Create Degree Works Scraper
- [x] Send Scraper data to Mongo
- [x] Create Main Route that takes parameters and returns JSON course

### CODE CITATION
    Upload module tutorial https://www.youtube.com/watch?v=dbYBVbrDnwg&t=1815s

### Programming Languages and Versions
    python3
    react.js "^18.2.0",
    javascript
    node v16.19.1
    
