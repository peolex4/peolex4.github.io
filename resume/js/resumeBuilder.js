 var bio = {
     "name": "Paolo",
     "role": "Front-end Developer",
     "contacts": {
         "mobile": "+39335XXXXXX3",
         "email": "peolex4@hotmail.com",
         "github": "peolex4",
         "twitter": "",
         "location": "Ladispoli (Rome)"
     },
     "welcomeMessage": "my welcome message",
     "skills": [
         "awsomeness", "sympathy", "braveness"
     ],
     "biopic": "images/paolo_tandem_web.jpg"
 };

 bio.display = function() {

     for (var info in bio.contacts) {
         if (bio.contacts.hasOwnProperty(info)) {
             console.log(bio.contacts[info].github);
             var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
             var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
             var formattedGithub = HTMLgithub.replace("%contact%", "Github").replace("%data%", bio.contacts.github);
             var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
         }
     }
     //should be changed this loop ???
     $("#topContacts").append(formattedMobile, formattedEmail, formattedGithub, formattedLocation);
     $("#footerContacts").append(formattedMobile, formattedEmail, formattedGithub, formattedLocation);
     var formattedName = HTMLheaderName.replace("%data%", bio.name);
     var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
     var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
     var welcomeMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
     $("#header").prepend(formattedRole);
     $("#header").prepend(formattedName);
     $("#header").append(formattedBioPic);
     $("#header").append(welcomeMessage);
     $("#header").append(HTMLskillsStart);
     for(var skill = 0; skill < bio.skills.length; skill++){
         var formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
         $("#skills").append(formattedSkill);
     }
 };

 var work = {
     "jobs": [{
         "employer": "Snapp",
         "title": "App developer - Software tester",
         "location": "Rome",
         "dates": "Jan2014-Nov2015",
         "description": "A very beautiful experience, I spent there almost two years and were very great years!",
         "url": "https://snapp.click/"
     }]
 };

 work.display = function() {

     $("#workExperience").append(HTMLworkStart);
     for(var i = 0; i < work.jobs.length; i++){
         var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer).replace("#", work.jobs[i].url);
         var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
         var formattedEmployerTitle = formattedEmployer + formattedTitle;
         $(".work-entry:last").append(formattedEmployerTitle);
         var formattedDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
         $(".work-entry:last").append(formattedDates);
         var workLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
         $(".work-entry:last").append(workLocation);
         var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);
         $(".work-entry:last").append(formattedDescription);
     }
 };

 var projects = {
     "projects": [{
         "title": "Sample Project 1",
         "dates": "Sep2016",
         "description": "Preview of one my course's projcet",
         "images": [
             "images/project_example_01.jpg"
         ],
         "url": "https://github.com/peolex4/portfolio_mockup_project"
     }]
 };

 projects.display = function() {

     $("#projects").append(HTMLprojectStart);
     for(var i = 0; i < projects.projects.length; i++){
         var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title).replace("#", projects.projects[i].url);
         $(".project-entry:last").append(formattedProjectTitle);
         var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
         $(".project-entry:last").append(formattedDates);
         var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
         $(".project-entry:last").append(formattedDescription);
         for (var j = 0; j < projects.projects[i].images.length; j++) {
             var formattedProjectImage = HTMLprojectImage.replace("%data%", projects.projects[i].images[j]);
             $(".project-entry:last").append(formattedProjectImage);
         }
     }
 };

 var education = {
     "schools": [{
         "name": "Sandro Pertini",
         "location": "Ladispoli (Rome)",
         "degree": "Diploma di Liceo",
         "majors": ["Scientifico P.N.I."],
         "dates": "2003-2009",
         "url": "http://www.liceopertini.net/"
     }, {
         "name": "Sapienza Università di Roma",
         "location": "Rome",
         "degree": "Bachelor's Degree",
         "majors": ["Statistical management"],
         "dates": "2009-2016",
         "url": "http://www.dss.uniroma1.it/en"
     }, {
         "name": "Pompeu Fabra",
         "location": "Barcelona",
         "degree": "Erasmus",
         "majors": ["Parties"],
         "dates": "2012",
         "url": "https://www.upf.edu/en/"
     }],
     "onlineCourses": [{
         "title": "Front-End Web Developer Nanodegree",
         "school": "Udacity",
         "dates": "In progress",
         "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
     }]
 };

 education.display = function() {

     for (var i = 0; i < education.schools.length; i++) {
         $("#education").append(HTMLschoolStart);
         var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[i].name).replace("#", education.schools[i].url);
         var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
         var formattedSchoolNameDegree = formattedSchoolName + formattedSchoolDegree;
         $(".education-entry:last").append(formattedSchoolNameDegree);
         var formattedDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
         $(".education-entry:last").append(formattedDates);
         var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);
         $(".education-entry:last").append(formattedLocation);
         for (var major = 0; major < education.schools[i].majors.length; major++) {
             var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[i].majors[major]);
             $(".education-entry:last").append(formattedMajor);
         }
     }
     $("#education").append(HTMLonlineClasses);
     for (var course = 0; course < education.onlineCourses.length; course++) {
         $("#education").append(HTMLschoolStart); //trick!
         var onlineCourseTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
         var onlineCourseSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
         var onlineCourseTitleSchool = onlineCourseTitle + onlineCourseSchool;
         $(".education-entry:last").append(onlineCourseTitleSchool);
         var onlineCourseDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
         $(".education-entry:last").append(onlineCourseDates);
         var courseLink = education.onlineCourses[course].url;
         var onlineCourseURL = HTMLonlineURL.replace("%data%", courseLink);
         $(".education-entry:last").append(onlineCourseURL);
         $(".education-entry:last").find("a").attr("href", courseLink);
         //$(".education-entry:last").find("a").last().attr("href", courseLink); //così cambierebbe solo all'ultimo <a> element!
     }
 };

 bio.display();
 work.display();
 projects.display();
 education.display();
 $("#mapDiv").append(googleMap);

 //CSS customizations
 yellowfingCSS = function() {
     var myYellow = "#f2f523";
     $("h1").css("color", myYellow);
     $("#skills-h3").css("color", myYellow);
     $(".orange").css("background-color", myYellow);
     $(".orange-text").css("color", myYellow);
 };
 //to see yellofing customizations
 yellowfingCSS();