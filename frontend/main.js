var sdk = apigClientFactory.newClient();

function myProfile() {
    localStorage.setItem('friendusername', "");
    location.href = './profile.html';
}

function friendsProfile(username) {
    localStorage.setItem('friendusername', username);
    location.href = './profile.html';
}

function show_event(id) {
    localStorage.setItem('event-id', id);
    location.href = './event.html';
}

function logOut(){
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

function searchEvents() {
    keywordEl = document.getElementById('keyword');
    if (keywordEl == null) {
        keyword = "";
    } else {
        keyword = document.getElementById('keyword').value;
    }

    // user is searching for event name, date, categories, location or all
    sdk.searchGet({'query':keyword}, {}, {}).then((response) => {
        document.getElementById('keyword').value = ""; // clearing search for next search

        response = response['data']['body'];
        console.log(response);

        // getting div that holds row of users
        var allDisplayDiv = document.getElementById('display-block');
        allDisplayDiv.innerHTML = '';

        if(response) {
            // DISPLAYING USERS
            users = response['users']

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
        
            // DISPLAYING EVENTS
            events = response['events'];
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
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}

$(document).ready(function() {
    searchEvents()
})