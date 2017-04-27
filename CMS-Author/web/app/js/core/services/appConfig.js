'use strict';
(function() {
    var appConfig = function($location) {
        var config = {
            "search": {
                "items": [],
                "itemsType": "search",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": false,
                "enableSearch": false,
                "enableViewModes": true,
                "enableScrollbar": false,
                "enableTags": true,
                "enableFooterLink": false,
                "enablePaging": true,

                "headerTitle": "Search results",
                "headerSummary": "The search results are based on your keywords. if you did not find your result, Please try searching different keywords",
                "headerRightLabel": "0 results.",

                "viewMode": "list",

                "scrollHeight": 0,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 1,
                "pagingPageSize": 10,
                "pagingPagerSize": 10,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "pubtag": {
                "items": [],
                "itemsType": "pubtag",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": false,
                "enableSearch": false,
                "enableViewModes": true,
                "enableScrollbar": false,
                "enableTags": true,
                "enableFooterLink": false,
                "enablePaging": true,

                "headerTitle": "Articles By Tag",
                "headerSummary": "Articles for the Tag, you searched for",
                "headerRightLabel": "0 results.",

                "viewMode": "list",

                "scrollHeight": 0,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 1,
                "pagingPageSize": 10,
                "pagingPagerSize": 10,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "category": {
                "items": [],
                "itemsType": "category",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": true,
                "enableSearch": true,
                "enableViewModes": true,
                "enableScrollbar": true,
                "enableTags": false,
                "enableFooterLink": false,
                "enablePaging": false,

                "headerTitle": "Available Categories",
                "headerSummary": "You can create your contents/articles, in these categories only. Request Administrator to create a new one, if the one you are looking is not available here.",
                "headerRightLabel": "0 results.",

                "viewMode": "list",

                "scrollHeight": 400,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 0,
                "pagingPageSize": 0,
                "pagingPagerSize": 0,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "tag": {
                "items": [],
                "itemsType": "tag",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": true,
                "enableSearch": true,
                "enableViewModes": true,
                "enableScrollbar": true,
                "enableTags": false,
                "enableFooterLink": false,
                "enablePaging": false,

                "headerTitle": "Available Tags",
                "headerSummary": "Add one or more Tags to your content/article. This enables better search ability in search engines.",
                "headerRightLabel": "0 results.",

                "viewMode": "list",

                "scrollHeight": 400,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 0,
                "pagingPageSize": 0,
                "pagingPagerSize": 0,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "draftedContent": {
                "items": [],
                "itemsType": "draftedContent",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": true,
                "enableSearch": true,
                "enableViewModes": true,
                "enableScrollbar": true,
                "enableTags": false,
                "enableFooterLink": false,
                "enablePaging": false,

                "headerTitle": "Your Drafted Contents",
                "headerSummary": "These are in draft Contents, You can publish them, once done with it.",
                "headerRightLabel": "0 results.",

                "viewMode": "list",

                "scrollHeight": 600,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 0,
                "pagingPageSize": 0,
                "pagingPagerSize": 0,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "publishedContent": {
                "items": [],
                "itemsType": "publishedContent",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": true,
                "enableSearch": true,
                "enableViewModes": true,
                "enableScrollbar": true,
                "enableTags": false,
                "enableFooterLink": false,
                "enablePaging": false,

                "headerTitle": "Your Published Contents",
                "headerSummary": "Your Published contents till date. Select one, to view its Authoriing History",
                "headerRightLabel": "0 results.",

                "viewMode": "list",

                "scrollHeight": 600,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 0,
                "pagingPageSize": 0,
                "pagingPagerSize": 0,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "contentHistory": {
                "items": [],
                "itemsType": "contentHistory",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": false,
                "enableSearch": true,
                "enableViewModes": true,
                "enableScrollbar": false,
                "enableTags": false,
                "enableFooterLink": false,
                "enablePaging": false,

                "headerTitle": "Selected Content's Authoring History",
                "headerSummary": "The selected Content was authored as below. You can re-author and re-publish any draft again. this replaces the latest Published content.",
                "headerRightLabel": "0 results.",

                "viewMode": "list",

                "scrollHeight": 0,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 0,
                "pagingPageSize": 0,
                "pagingPagerSize": 0,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "pubContent": {
                "items": [],
                "itemsType": "pubContent",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": true,
                "enableSearch": false,
                "enableViewModes": true,
                "enableScrollbar": false,
                "enableTags": true,
                "enableFooterLink": true,
                "enablePaging": false,

                "headerTitle": "Articles",
                "headerSummary": "Click on the Link at the bottom of List to view more articles",
                "headerRightLabel": "0 results.",

                "viewMode": "list",

                "scrollHeight": 0,

                "tags": [],

                "footerLinkText": "Click here to read more...",
                "footerLinkUrl": "/articles",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 0,
                "pagingPageSize": 0,
                "pagingPagerSize": 0,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "contentResource": {
                "items": [],
                "itemsType": "contentResource",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": false,
                "enableSearch": true,
                "enableViewModes": true,
                "enableScrollbar": false,
                "enableTags": false,
                "enableFooterLink": false,
                "enablePaging": false,

                "headerTitle": "Files:",
                "headerSummary": "Here you have all file/resources of selected Category from Left pane.",
                "headerRightLabel": "0 results.",

                "viewMode": "grid",

                "scrollHeight": 0,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 0,
                "pagingPageSize": 0,
                "pagingPagerSize": 0,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "contentResourceCategory": {
                "items": [],
                "itemsType": "contentResourceCategory",
                "onItemSelect": "undefined",

                "enableHeader": true,
                "enableMaximize": false,
                "enableSearch": false,
                "enableViewModes": true,
                "enableScrollbar": false,
                "enableTags": false,
                "enableFooterLink": false,
                "enablePaging": false,

                "headerTitle": "Select a resource",
                "headerSummary": "",
                "headerRightLabel": "",

                "viewMode": "inline",

                "scrollHeight": 0,

                "tags": [],

                "footerLinkText": "",
                "footerLinkUrl": "",
                "onFooterLinkClick": "undefined",

                "pagingTotalItems": 0,
                "pagingSelectedPage": 0,
                "pagingPageSize": 0,
                "pagingPagerSize": 0,
                "onPagingPageChange": "undefined",

                "onRefresh": "undefined",
                "isLoading": false
            },
            "viewModes": [
                {
                    "id": "list",
                    "iconClass": "glyphicon-list"
                },
                {
                    "id": "inline",
                    "iconClass": "glyphicon-th-list"
                },
                {
                    "id": "grid",
                    "iconClass": "glyphicon-th"
                }
             ],
             "itemsTypes": {
                "category": {
                    "name": "category",
                    "templateUrl": "content/category-list.html"
                },
                "content": {
                    "name": "content",
                    "templateUrl": "content/content-list.html"
                },
                "tag": {
                    "name": "tag",
                    "templateUrl": "content/tag-list.html"
                },
                "contentResource": {
                    "name": "contentresource",
                    "templateUrl": "resourcebrowser/resource-list.html"
                },
                "contentResourceCategory": {
                    "name": "contentResourceCategory",
                    "templateUrl": "content/category-list.html"
                },
                "draftedContent": {
                    "name": "draftedContent",
                    "templateUrl": "content/content-list.html"
                },
                "publishedContent": {
                    "name": "publishedContent",
                    "templateUrl": "content/content-list.html"
                },
                "contentHistory": {
                    "name": "contentHistory",
                    "templateUrl": "content/content-list.html"
                },
                "pubContent": {
                    "name": "pubContent",
                    "templateUrl": "pubcontent/pubcontent-list.html"
                },
                "search": {
                    "name": "search",
                    "templateUrl": "pubcontent/pubcontent-list.html"
                },
                "pubtag": {
                    "name": "pubtag",
                    "templateUrl": "pubcontent/pubcontent-list.html"
                }
            },
            "pubContentListTypes": {
                "pubContentPopular": {
                    "title": "Most Popular Articles",
                    "sortField": "VisitCount",
                    "sortDirAsc": false,
                    "viewMode": "list"
                },
                "pubContentLatest": {
                    "title": "Latest Articles",
                    "sortField": "PublishedDate",
                    "sortDirAsc": false,
                    "viewMode": "inline"
                },
                "pubContentRelevant": {
                    "title": "Most Relevant Articles",
                    "sortField": "Title",
                    "sortDirAsc": true,
                    "viewMode": "inline"
                },
                "pubContentRelated": {
                    "title": "Related Articles",
                    "sortField": "CategoryId",
                    "sortDirAsc": true,
                    "viewMode": "inline"
                }
            },
            "profileActions": [
                {
                    "id": "myProfile",
                    "title": "My Profile",
                    "iconClass": "glyphicon-list",
                    "templateUrl": "account/profile.html"
                },
                {
                    "id": "changePassword",
                    "title": "Change Password",
                    "iconClass": "glyphicon-th-list",
                    "templateUrl": "account/change-password.html"
                },
                {
                    "id": "myDashboard",
                    "title": "My Dashboard",
                    "iconClass": "glyphicon-th"
                },
                {
                    "id": "adminPanel",
                    "title": "Admin Panel",
                    "iconClass": "glyphicon-blackboard"
                }
             ],
             "mainCarousel": {
                "options": {
                    "ride": "carousel",
                    "pause": "hover",
                    "wrap": true,
                    "interval": 4000,
                    "theme": "default"
                }
            },
            "application": {
                "url": "http://www.learnwiseway.com",
                "name": "LearnWiseWay.com",
                "title": "Wise Learnings",
                "shortTitle": "Learn Wise Way",
                "description": "Free Learnings - CBSE Board Study Material for all classes 6-12 and all subjects including Physics, Maths, Chemistry, Biology, English, SST. CBSE syllabus, Free CBSE Sample Papers, CBSE notes, Text book solutions, online tests, guess papers, model question papers, CBSE news and updates on Learnwiseway.com. Get Access to CBSE Solutions, Online Tests, Guess Papers etc for free at Learnwiseway.com. A complete guide for CBSE students from pre-school to class-12. CBSE Board Date Sheet and latest News andfree Study Material for all classes.",
                "keywords": "CBSE board, CBSE board tutorials, CBSE board study materials, CBSE board online study material, CBSE Board Sample Paper, CBSE Question Papers, CBSE Board Guess Papers, Articles, Maths, Science, Chemistry, Biology, English, SSt ICSE",
                "copyYear": 2017,
                "appLogo": {
                    "primaryTitle": "Learn Wise Way",
                    "highCharIndex": 7,
                    "secondaryTitle": "Wise Learnings"
                }
            },
            "categories": [
                {
                    "CategoryId": 1,
                    "Name": "chemistry",
                    "Title": "Chemistry",
                    "Description": "Chemistry is the study of matter and its properties. Every material in existence is made up of matter. Chemistry is involved in everything and everywhere. There are five main branches of chemistry, each of which has many areas of study. These are main branches of Chemistry - Analytical chemistry, Physical chemistry, Organic chemistry, Inorganic chemistry, Biochemistry. The science of chemistry actually can be linked out to other branches or sub-branches that include Materials Chemistry, Theoretical Chemistry, Macro Molecular (Polymer) Chemistry, Nuclear Chemistry, Metallurgy, Forensic Chemistry, Medicinal Chemistry and more."
                },
                {
                    "CategoryId": 2,
                    "Name": "physics",
                    "Title": "Physics",
                    "Description": "You are surrounded by physics all the time, and whether you realize it or not, you use physics every day. Physics, the study of matter and energy, is an ancient and broad field of science. The word 'physics' comes from the Greek 'knowledge of nature,' and in general, the field aims to analyze and understand the natural phenomena of the universe. Because physics explains natural phenomena in the universe, it's often considered to be the most fundamental science. It provides a basis for all other sciences - without physics, you couldn't have biology, chemistry, or anything else. Physics is a broad and complex field. It covers everything from sound and light to nuclear science and geology. Because of this, it's been divided into different branches so that scientists can specialize in their knowledge of physics.\nPhysics is a natural science based on experiments, measurements and mathematical analysis with the purpose of finding quantitative physical laws for everything from the nano world of the micro cosmos to the planets, solar systems and galaxies that occupy the macro cosmos."
                },
                {
                    "CategoryId": 3,
                    "Name": "mathematics",
                    "Title": "Mathematics",
                    "Description": "Mathematics is the science that deals with the logic of shape, quantity and arrangement. Math is all around us, in everything we do. It is the building block for everything in our daily lives, including mobile devices, architecture (ancient and modern), art, money, engineering, and even sports. Mathematics as a formal area of teaching and learning was developed about 5,000 years ago by the Sumerians. They did this at the same time as they developed reading and writing. However, the roots of mathematics go back much more than 5,000 years. Throughout their history, humans have faced the need to measure and communicate about time, quantity, and distance."
                },
                {
                    "CategoryId": 4,
                    "Name": "biology",
                    "Title": "Biology",
                    "Description": "Biology is the science of life. Biologists study the structure, function, growth, origin, evolution and distribution of living organisms. There are generally considered to be at least nine “umbrella” fields of biology, each of which consists of multiple sub fields. Biology is a natural science concerned with the study of life and living organisms, including their structure, function, growth, evolution, distribution, identification and taxonomy. The Cell Theory, Evolution, Genetics, Homeostasis, Energy are the foundation of modern biology."
                }
            ]
        };

        var uiAppConfig = {
            "application": {
                "url": "http://ui.learnwiseway.com",
                "name": "LearnWiseWay.com",
                "title": "Wise Learnings |  JavaScript Frameworks",
                "shortTitle": "Learn Wise Way",
                "description": "The popularity of JavaScript has led to a very vibrant ecosystem of technologies, frameworks, and libraries. Learn most popular javascript frameworks on learnwiseway.com and get yourself loaded with Angular JS, React JS, Node JS, ECMA 6, TypeScript etc.",
                "keywords": "javascript, frameworks, ui, libraries, programming, web development, front end, angular js, react js, javascript oop, node js, node.js, ECMA Script, ECMA 5, ECMA 6",
                "copyYear": 2017,
                "appLogo": {
                    "primaryTitle": "Learn Wise Way",
                    "highCharIndex": 7,
                    "secondaryTitle": "Wise Learnings"
                }
            },
            "categories": [
                {
                    "CategoryId": 1,
                    "Name": "javascript-oop",
                    "Title": "JavaScript OOP",
                    "Description": "Object-Oriented programming is one of the widely used programming paradigms that use abstraction to create model based on real world. JavaScript has strong object-oriented programming capabilities. Although there is differences in object-oriented capability of JavaScript compared to other languages. Unlike Java, C++ etc., JavaScript does not contain class statement. JavaScript is a prototype-based language. JavaScript uses functions as classes. Defining a class is as easy as defining a function. JavaScript gives you many ways for doing Object Oriented Programming."
                },
                {
                    "CategoryId": 2,
                    "Name": "angularjs",
                    "Title": "AngularJS",
                    "Description": "AngularJS is JavaScript Framework, lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop. Angular JS is a tool set for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature needs. Angular JS gives you features like Data Binding, Directives, and Controllers out of the box. \nData-binding is an automatic way of updating the view whenever the model changes, as well as updating the model whenever the view changes. This is awesome because it eliminates DOM manipulation from the list of things you have to worry about.\nDirectives are a unique and powerful feature available in Angular JS. Directives let you invent new HTML syntax, specific to your application.\nControllers are the behavior behind the DOM elements. Angular JS lets you express the behavior in a clean readable form without the usual boilerplate of updating the DOM, registering callbacks or watching model changes."
                },
                {
                    "CategoryId": 3,
                    "Name": "react-js",
                    "Title": "React JS",
                    "Description": "React is front end library developed by Facebook. It's used for handling view layer for web and mobile apps. React JS allows us to create reusable UI components. It is currently one of the most popular JavaScript libraries and it has strong foundation and large community behind it. React JS is well compatible with JSX, is JavaScript HTML and with Redux, a state management JavaScript Library. React is an ideal fit for a component based user interface. It is only a view library and solves all the described component requirements. It is a library dedicated to solve one problem: It gives you all the tools to build effectively a component based user interface."
                },
                {
                    "CategoryId": 4,
                    "Name": "node-js",
                    "Title": "Node JS",
                    "Description": "Node is similar in design to, and influenced by, systems like Ruby's Event Machine or Python's Twisted. Node takes the event model a bit further. It presents an event loop as a runtime construct instead of as a library. In other systems there is always a blocking call to start the event-loop. Typically behavior is defined through callbacks at the beginning of a script and at the end starts a server through a blocking call like EventMachine::run(). In Node there is no such start-the-event-loop call. Node simply enters the event loop after executing the input script. Node exits the event loop when there are no more callbacks to perform. This behavior is like browser JavaScript — the event loop is hidden from the user."
                }
            ]
        };

        function getConfig() {
            initAppUrls();
            var host = $location.$$host;
            if (host.toLowerCase() === 'ui.learnwiseway.com') {
                config.application = uiAppConfig.application;
                config.categories = uiAppConfig.categories;
            }

            return config;
        }

        function initAppUrls() {
            config.appUrls = {};
            config.appUrls.API_SERVER_DUMMY_URL = '/CMSSERVERAPIURL/';
            config.appUrls.JSON_DATA_BASE_URL = '/data/';

            var host = $location.$$host;
            if (host.toLowerCase() === 'ui.learnwiseway.com') {
                config.appUrls.API_SERVER_URL = 'http://uilwwapi.learnwiseway.com';
            } else if (host.toLowerCase() === 'learnwiseway.com') {
                config.appUrls.API_SERVER_URL = 'http://lwwapi.learnwiseway.com';
            } else {
                config.appUrls.API_SERVER_URL = 'http://localhost:49192';
            }

            config.appUrls.ARTICLE_IMAGES_URL = config.appUrls.API_SERVER_URL + '/articleimages';
            config.appUrls.USER_IMAGES_URL = config.appUrls.API_SERVER_URL + '/userimages';
            config.appUrls.baseApiUrl = config.appUrls.API_SERVER_URL + '/api';
        }

        return getConfig();
    };

    appConfig.$inject = ['$location'];
    module.exports = appConfig;
})();