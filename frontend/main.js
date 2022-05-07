var sdk = apigClientFactory.newClient();
var totalEvents;

function myProfile() {
    localStorage.setItem('friendusername', "");
    location.href = './profile.html';
}

function friendsProfile(username) {
    if(localStorage.getItem("username") == username) {
        myProfile()
    } else {
        localStorage.setItem('friendusername', username);
        location.href = './profile.html';
    }
}

function show_event(id) {
    localStorage.setItem('event-id', id);
    location.href = './event.html';
}

function home() {
    localStorage.setItem('category', "")
    location.href = './main.html';
}

function getFriendsEvents(id) {
    localStorage.setItem('event-id', id);
    location.href = './friends_events.html';
}

function logOut(){
    localStorage.setItem('userlocation', '');   
    localStorage.setItem('usercategory', '');   
    localStorage.setItem("username", "")
    localStorage.setItem("friendusername", "")
    localStorage.setItem("email", "")
    var userPoolId = 'us-east-1_fvK1OHbeR';
    var clientId = '543gs8p8cujqb4oe90gs88io3l';

    var poolData = { 
        UserPoolId : userPoolId,
        ClientId : clientId
    };
    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser);
    if (cognitoUser){
        cognitoUser.signOut();
        location.href = '../login/index.html';
    }
}

function displayUsers(users) {
    if (users.length > 0) {
        let heading = $("<h4> SEARCH RESULTS BASED ON USER </h4>")
        $("#display-block").append(heading)
        $("#display-block").append($("<br>"))

        let row = $("<div class='row'> </div>")
        for(i in users) {
            let user = users[i]
            if(i%3 == 0) {
                if(i != 0) {
                    $("#display-block").append(row)
                    $("#display-block").append($("<br>"))
                }
                $(row).append($("<div class='col-md-1'> </div>"))
                row = $("<div class='row'> </div>")
                $(row).append($("<div class='col-md-1'> </div>"))
            }
            let div = $("<div class='user col-md-3'> </div>")
            let imgsrc = "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + user['data']['photo']
            let divImage = $("<div class='user-image'> <img src = '" + imgsrc + "' onclick='friendsProfile(\"" + user['username'] + "\")'>  <div/>")
            $(div).append(divImage)
            let divName = $("<div class='user-name'>" + user['data']['name'] + "<div/>")
            $(div).append(divName)
            $(row).append(div)
        }
        if(i == 0) {
            $("#display-block").append(row)
        }
    }
}

function displayEvents(events) {
    console.log(events)
    for(key in events) {
        if(key != 'all') {
            let heading = $("<h4> SEARCH RESULTS BASED ON " + key + " </h4>")
            $("#display-block").append(heading)
            $("#display-block").append($("<br>"))
        }

        let row = $("<div class='row'> </div>")
        for(i in events[key]) {
            let event = events[key][i]
            if(i%3 == 0) {
                if(i != 0) {
                    $("#display-block").append(row)
                    $("#display-block").append($("<br>"))
                }
                $(row).append($("<div class='col-md-1'> </div>"))
                row = $("<div class='row'> </div>")
                $(row).append($("<div class='col-md-1'> </div>"))
            }
            let div = $("<div class='event col-md-3'> </div>")
            let imgsrc = event['image']
            let divImage = $("<div class='event-image'> <img src = '" + imgsrc + "' onclick='show_event(\"" + event['id'] + "\")'>  <div/>")
            $(div).append(divImage)
            let divName = $("<div class='event-name'>" + event['name'] + "<div/>")
            $(div).append(divName)
            $(row).append(div)
        }

        if(i == 0) {
            $("#display-block").append(row)
        }
    }
}

function displayAllEvents(events) {
    console.log(events);
    console.log(events.length);
    console.log(events[0]);
    console.log("printed event 0");
    $("#display-block").empty();
    let row = $("<div class='row'> </div>")
    for(i in events) {
        let event = events[i];
        console.log(i);
        console.log(event);
        if(i%3 == 0) {
            if(i != 0) {
                $("#display-block").append(row)
                $("#display-block").append($("<br>"))
            }
            $(row).append($("<div class='col-md-1'> </div>"))
            row = $("<div class='row'> </div>")
            $(row).append($("<div class='col-md-1'> </div>"))
        }
        let div = $("<div class='event col-md-3'> </div>")
        let imgsrc = event['image']
        let divImage = $("<div class='event-image'> <img src = '" + imgsrc + "' onclick='show_event(\"" + event['id'] + "\")'>  <div/>")
        $(div).append(divImage)
        let divName = $("<div class='event-name'>" + event['name'] + "<div/>")
        console.log("appending " + event["name"] + " div");
        console.log(div);
        $(div).append(divName)
        $(row).append(div)
    }

    $("#display-block").append(row)
}


function getSlice(page){
    page = parseInt(page);
    start= (page - 1) * 9;
    end = start + 9;
    let e = totalEvents.slice(start, end);
    console.log("now have slice the following");
    console.log(e);
    displayAllEvents(e);
}


function addPagination(events) {
    totalPages = Math.ceil(events["all"].length / 9);

    for(var i = 1; i <= totalPages; i++) {
        start= (i - 1) * 9;
        end = start + 9
        let e = events["all"].slice(start, end);
        console.log(e);
        let button = $("<button class='btn btn-primary page' type='submit' onclick='getSlice(\"" + i.toString() + "\")'> " + i.toString() + "</button>")
        $("#paginationBar").append(button)

        if (i == 1) {
            button.click();
        }
    }
}

function searchEvents() {
    document.getElementById('display-block').innerHTML = '';
    keywordEl = document.getElementById('keyword');
    console.log("KEY", keywordEl.value)
    if (keywordEl == null) {
        keyword = "";
    } else {
        keyword = document.getElementById('keyword').value;
    }

    if(keyword.length > 0) {
        $("#display-block").append($("<h2> Search results for " + keyword + "</h2>"))
        $("#display-block").append($("<br>"))
    }

    // user is searching for event name, date, categories, location or all
    sdk.searchGet({'query':keyword}, {}, {}).then((response) => {
        document.getElementById('keyword').value = ""; // clearing search for next search

        console.log("response::");
        console.log(response);
        response = response['data']['body'];
        console.log(response);

        if(response) {
            // PAGINATION
            // totalRecords = records.length;
            // totalPages = Math.ceil(totalRecords / recPerPage);

            if ("all" in response["events"]) {
                // DISPLAYING EVENTS
                totalEvents = response["events"]["all"];
                // displayAllEvents(response['events']["all"]);
                addPagination(response['events'])
            } else {
                // DISPLAYING USERS
                displayUsers(response['users']);
                // DISPLAYING EVENTS
                displayEvents(response['events']);
            }
            
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}
function getUserInfo(){
    username=localStorage.getItem('username');
    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        localStorage.setItem("userlocation",response['city'])
        localStorage.setItem("usercategory",response['categories'])
    })
}

// var $pagination = $('#pagination'),
// totalRecords = 0,
// records = [],
// displayRecords = [],
// recPerPage = 9,
// page = 1,
// totalPages = 0; 
// $.ajax({
//       url: "http://dummy.restapiexample.com/api/v1/employees",
//       async: true,
//       dataType: 'json',
//       success: function (data) {
//                   records = data;
//                   console.log(records);
//                   totalRecords = records.length;
//                   totalPages = Math.ceil(totalRecords / recPerPage);
//                   apply_pagination();
//       }
// });

// function apply_pagination() {
//       $pagination.twbsPagination({
//             totalPages: totalPages,
//             visiblePages: 6,
//             onPageClick: function (event, page) {
//                   displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
//                   endRec = (displayRecordsIndex) + recPerPage;
                 
//                   displayRecords = records.slice(displayRecordsIndex, endRec);
//                   generate_table();
//             }
//       });
// }

$(document).ready(function() {
    if(localStorage.getItem('username').length <= 0) {
        logOut();
    }
    if(localStorage.getItem('category') != null && localStorage.getItem('category') != "") {
        $("#keyword").val(localStorage.getItem('category'))
    }
    searchEvents()
    if(localStorage.getItem('usercategory') == null || localStorage.getItem('userlocation') == null){
        console.log("get user info");
        getUserInfo();
    }
})