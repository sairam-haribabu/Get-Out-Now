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
    $("#display-block").empty();
    if (users.length > 0) {
        let heading = $("<h4> Search results based on user...</h4>")
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
        $("#display-block").append(row)
    }
}

function displayEvents(events) {
    console.log(events)
    for(key in events) {
        if(key != 'all') {
            let heading = $("<h4> Search results based on " + key + "...</h4>")
            $("#display-block").append($("<br>"))
            $("#display-block").append(heading)
            $("#display-block").append($("<br>"))
        }

        displayAllEvents(events[key]);
    }
}

function displayAllEvents(events) {
    let row = $("<div class='row'> </div>")
    for(i in events) {
        let event = events[i];
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

    $("#display-block").append(row)
}


function getSlice(page){
    $("#display-block").empty();
    page = parseInt(page);
    start= (page - 1) * 9;
    end = start + 9;
    let e = totalEvents.slice(start, end);
    displayAllEvents(e);
    
}


function addPagination() {
    totalPages = Math.ceil(totalEvents.length / 9);
    for(var i = 1; i <= totalPages; i++) {
        start= (i - 1) * 9;
        end = start + 9
        let button = $("<button class='btn btn-primary page' type='submit' onclick='getSlice(\"" + i.toString() + "\")'> " + i.toString() + "</button>")
        $("#paginationBar").append(button)

        if (i == 1) {
            button.click();
        }
    }
}


function executeSearch(keyword) {
    console.log("keyword: " + keyword);
    // user is searching for event name, date, categories, location or all
    sdk.searchGet({'query':keyword}, {}, {}).then((response) => {
        console.log("KEY: " + keyword);
        document.getElementById('keyword').value = ""; // clearing search for next search
        response = response['data']['body'];

        console.log("response...");
        console.log(response);
        if(response) {
            if ("all" in response["events"]) {
                // DISPLAYING EVENTS
                totalEvents = response["events"]["all"];
                addPagination();
            } else {
                if(Object.keys(response['events']).length == 0 && response['users'].length == 0) {
                    let heading = $("<h4> No search results found. </h4>")
                    $("#display-block").append(heading)
                } else {
                    // DISPLAYING USERS
                    displayUsers(response['users']);
                    // DISPLAYING EVENTS
                    displayEvents(response['events']);
                }
            }
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}


function searchEvents() {
    document.getElementById('display-block').innerHTML = '';
    keywordEl = document.getElementById('keyword');
    $("#paginationBar").empty();
    if (keywordEl.value.length == 0) { // most general search
        if (totalEvents == null) {
            keyword = localStorage.getItem("userlocation") + " + " + localStorage.getItem("usercategory");
            executeSearch(keyword);
        } else {
            addPagination();
        }
    } else {
        keyword = document.getElementById('keyword').value;
        // $("#display-block").append($("<h2> Search results for " + keyword + "</h2>"))
        // $("#display-block").append($("<br>"))
        executeSearch(keyword)
    }
}

function getUserInfo(){
    username=localStorage.getItem('username');
    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        localStorage.setItem("userlocation",response['city'])
        localStorage.setItem("usercategory",response['categories'])
    })
}

$(document).ready(function() {
    if(localStorage.getItem('username').length <= 0) {
        logOut();
    }
    if(localStorage.getItem('category') != null && localStorage.getItem('category') != "") {
        $("#keyword").val(localStorage.getItem('category'))
    }
    if(localStorage.getItem('usercategory').length == 0 || localStorage.getItem('userlocation').length == 0){
        console.log("get user info");
        getUserInfo()
    }
    setTimeout(function() {
        searchEvents();
    }, 500);
})
