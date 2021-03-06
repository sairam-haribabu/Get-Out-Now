var sdk = apigClientFactory.newClient();

function logOut(){
    localStorage.setItem('userlocation', '');   
    localStorage.setItem('usercategory', '');
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
    localStorage.setItem("username","")
}

function friendProfile(friendName) {
    if(localStorage.getItem("username") == friendName) {
        myProfile()
    } else {
        localStorage.setItem('friendusername', friendName);
        location.href = './profile.html';
    }
}

function home() {
    localStorage.setItem('category', "")
    location.href = './main.html';
}

function eventPage(id) {
    localStorage.setItem('event-id', id);
    location.href = './event.html';
}

function myProfile() {
    localStorage.setItem('friendusername', "")
    location.href = './profile.html';
}

function getFriendsEvents(id) {
    localStorage.setItem('event-id', id);
    location.href = './friends_events.html';
}

function followFriend(me, friend) {
    console.log("followFriend");
    console.log(me,friend);
    sdk.followGet({'username':me, 'friendname':friend}, {}, {}).then((response) => {
        if(response) {
            console.log(response);
            console.log(response['status']);
            location.reload()
            if(response['status'] ==200){
                localStorage.setItem("mainuserfriends",localStorage.getItem("mainuserfriends")+','+friend)
            }
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}

function isFriend(friendusername) {
    mainuserfriends=localStorage.getItem("mainuserfriends");
    if(mainuserfriends.includes(friendusername)){
        console.log("IS A FRIEND");
        return true;
    }
    else{
        console.log("not a friend");
        return false;
    }
}

function getFriend(username) {
    if(localStorage.getItem("friendusername") != "") {
        if(isFriend(localStorage.getItem("friendusername"))) {
            let div = $("<button type='submit' id='follow'> FOLLOWING </button>")
            $("#follow-block").append(div)
        } else {
            let me = localStorage.getItem('username');
            
            let div = $("<button type='submit' id='follow' onclick='followFriend(\"" + me + "\", \"" + username + "\")'> FOLLOW </button>")
            $("#follow-block").append(div)
        }
    }
}


$(document).ready(function() {
    console.log( "ready!" )
    if(localStorage.getItem('username').length <= 0) {
        logOut();
    }
    let username = localStorage.getItem('friendusername');
    if(localStorage.getItem('friendusername') == "") {
        username = localStorage.getItem('username');
    }
    console.log(username)
    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        console.log(response)
        userInfo = response
        friendsInfo = response['friends']
        eventsInfo = response['events']

        if(username==localStorage.getItem('username')){
            let mainuserfriends = "";
            for(i in friendsInfo){
                mainuserfriends = mainuserfriends + ',' + friendsInfo[i]['username'];
            }
            localStorage.setItem('mainuserfriends', mainuserfriends.substring(1));
        }

        let image = $("<img class='dp' src = '" + "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + userInfo['photo'] + "'>")
        $("#dp").append(image)
        
        if(friendsInfo.length > 0) {
            let heading = $("<h3> FRIENDS </h3>")
            $("#friends-block").append(heading)

            let friendRow = $("<div class='row'> </div>")
            for(i in friendsInfo) {
                let div = $("<div class='col-md-2 friend'> <div/>")
                let imgsrc = "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + friendsInfo[i]['photo']
                let divImage = $("<div class='friend-image'> <img src = '" + imgsrc + "' class='friend-image' onclick='friendProfile(\"" + friendsInfo[i]['username'] + "\")'>  <div/>")
                $(div).append(divImage)
                let divName = $("<div class='friend-name'>" + friendsInfo[i]['name'] +  " <div/>")
                $(div).append(divName)
                $(friendRow).append(div)
            }
            $("#friends-block").append(friendRow)
        }

        if(eventsInfo.length > 0) {
            heading = $("<h3> UPCOMING EVENTS </h3>")
            $("#events-block").append(heading)

            let eventRow = $("<div class='row'> </div>")
            for(i in eventsInfo) {
                let div = $("<div class='col-md-3 event'> <div/>")
                let imgsrc = eventsInfo[i]['photo']
                let divImage = $("<div class='event-image'> <img src = '" + imgsrc + "' onclick='eventPage(\"" + eventsInfo[i]['eventid'] + "\")'>  <div/>")
                $(div).append(divImage)
                let divName = $("<div class='event-name'>" + eventsInfo[i]['name'] +  " <div/>")
                $(div).append(divName)
                $(eventRow).append(div)
            }
            $("#events-block").append(eventRow)
        }

        $("#username").text(username)
        $("#name").text(userInfo['name'])
        $("#bio").text(userInfo['bio'])
        getFriend(username);

    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
});