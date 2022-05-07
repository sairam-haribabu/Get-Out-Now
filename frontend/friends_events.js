var sdk = apigClientFactory.newClient();

function myProfile() {
    localStorage.setItem('friendusername', "");
    location.href = './profile.html';
}

function show_event(id) {
    localStorage.setItem('event-id', id);
    location.href = './event.html';
}

function home() {
    localStorage.setItem('category', "")
    location.href = './main.html';
}

function logOut(){
    localStorage.setItem("username","")
    localStorage.setItem("friendusername","")
    localStorage.setItem("email", "")
    var userPoolId = 'us-east-1_fvK1OHbeR';
    var clientId = '543gs8p8cujqb4oe90gs88io3l';
    var poolData = { 
        UserPoolId : userPoolId,
        ClientId : clientId
    };
    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    cognitoUser = userPool.getCurrentUser();
    if (cognitoUser){
        cognitoUser.signOut();
        location.href = '../login/index.html';
    }
}

function getFriendsEvents() {
    username = localStorage.getItem('username');
    sdk.friendseventsGet({'username': username}).then((response) => {
        events = response['data']['body'];
        console.log("E", events);

        // getting div that holds row of users
        var allDisplayDiv = document.getElementById('display-block');
        allDisplayDiv.innerHTML = '';

        console.log("L", events.length)
        var length = Object.keys(events).length
        if(length > 0) {
            // DISPLAYING FRIEND'S EVENTS
            let i = -1;
            let row = $("<div class='row'> </div>");
            for(key in events) {
                i++;
                let event = events[key];
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
                let imgsrc = event['photo']
                let divImage = $("<div class='event-image'> <img src = '" + imgsrc + "' onclick='show_event(\"" + event['eventid'] + "\")'>  <div/>")
                $(div).append(divImage)
                let divName = $("<div class='event-name'>" + event['name'] + "<div/>")
                $(div).append(divName)
                $(row).append(div)
                let friendsAttending = "(Join " + event['friendsAttending'][0] + ")"
                if (event["friendsAttending"].length > 1) {
                    friendsAttending = "(Join " + event['friendsAttending'][0] + " + " + (event["friendsAttending"].length - 1) + " others)"
                }
                
                let divName2 = $("<div class='friend-name'>" + friendsAttending + "<div/>")
                $(div).append(divName2)
                $(row).append(div)
            }

            if(i == 0) {
                $("#display-block").append(row)
            }
        } else {
            let heading = $("<h4> No upcoming events found for your friends. </h4>")
            $("#display-block").append(heading)
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}

$(document).ready(function() {
    getFriendsEvents()
})