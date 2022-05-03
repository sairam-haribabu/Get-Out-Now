var sdk = apigClientFactory.newClient();

function logOut(){
    localStorage.setItem("username","")
    localStorage.setItem("friendusername","")
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
    localStorage.setItem("username","")
}

function friendProfile(friendName) {
    localStorage.setItem('friendusername', friendName);
    location.href = './profile.html';
}

function myProfile() {
    localStorage.setItem('friendusername', "")
    location.href = './profile.html';
}

function followFriend(me, friend) {
    sdk.followGet({'username':me, 'friendName':friend}, {}, {}).then((response) => {
        if(response) {
            location.reload()
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}

function isFriend(friendusername, friendsInfo) {
    for(i in friendsInfo) {
        if(friendusername == friendsInfo[i]['username']) {
            return true
        }
    }
    return false
}

$(document).ready(function() {
    console.log( "ready!" )
    let username = localStorage.getItem('friendusername');
    if(localStorage.getItem('friendusername') == "") {
        username = localStorage.getItem('username');
    }
    console.log("profile");
    console.log(username)

    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        console.log(response)

        userInfo = response['user']
        friendsInfo = response['friends']
        eventsInfo = response['events']

        let image = $("<img class='dp' src = '" + "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + userInfo['photo'] + "'>")
        $("#dp").append(image)
        
        let heading = $("<h4> YOUR FRIENDS </h4>")
        $("#friends-block").append(heading)
        // $("#friends-block").append($("<br>"))

        for(i in friendsInfo) {
            let div = $("<div class='friend'> <div/>")
            let imgsrc = "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + friendsInfo[i]['photo']
            let divImage = $("<div class='friend-image'> <img src = '" + imgsrc + "'>  <div/>")
            $(div).append(divImage)
            let divName = $("<div class='friend-name' onclick='friendProfile(\"" + friendsInfo[i]['username'] + "\")'>" + friendsInfo[i]['name'] +  "</a> <div/>")
            $(div).append(divName)
            $("#friends-block").append(div)
        }

        heading = $("<h4> UPCOMING EVENTS </h4>")
        $("#events-block").append(heading)
        // $("#events-block").append($("<br>"))

        for(i in eventsInfo) {
            let div = $("<div class='event'> <div/>")
            let imgsrc = eventsInfo[i]['photo']
            let divImage = $("<div class='event-image'> <img src = '" + imgsrc + "'>  <div/>")
            $(div).append(divImage)
            let divName = $("<div class='event-name' onclick='eventPage(\"" + eventsInfo[i]['eventid'] + "\")'>" + eventsInfo[i]['name'] +  "</a> <div/>")
            $(div).append(divName)
            $("#events-block").append(div)
        }

        $("#username").text(username)
        $("#name").text(userInfo['name'])
        $("#bio").text(userInfo['bio'])
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });

    if(localStorage.getItem("friendusername") != "") {
        if(isFriend(localStorage.getItem("friendusername"), friendsInfo)) {
            let div = $("<button type='submit' id='follow'> FOLLOWING </button>")
            $("#follow-block").append(div)
        } else {
            let me = localStorage.getItem('username');
            let div = $("<button type='submit' id='follow' onclick='followFriend(\"" + me + "\", \"" + username + "\")'> FOLLOW </button>")
            $("#follow-block").append(div)
        }
    }
});