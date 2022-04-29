var sdk = apigClientFactory.newClient();

function logOut(){
    localStorage.setItem("username") = ""
    localStorage.setItem("friendusername") = ""
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
    localStorage.setItem("username") = ""
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
    // sdk.followGet({'username':me, 'friendName':friend}, {}, {}).then((response) => {
    //     if(response) {
    //         let div = $("<div class='friend'> <div/>")
    //         let divImage = $("<div class='friend-image'> <img src = './boston.jpg'> <div/>")
    //         $(div).append(divImage)
    //         let divName = $("<div class='friend-name' onclick='friendProfile(\"" + friend + "\")'>" + friend +  "</a> <div/>")
    //         $(div).append(divName)
    //         $("#friends-block").append(div)
    //     }
    // })
    // .catch((error) => {
    //     console.log('an error occurred', error);
    // });
}

$(document).ready(function() {
    console.log( "ready!" )
    let username = localStorage.getItem('friendusername');
    if(localStorage.getItem('friendusername') == "") {
        username = localStorage.getItem('username');
    } else {
        let me = localStorage.getItem('username');
        let div = $("<button type='submit' id='follow' onclick='followFriend(\"" + me + "\", \"" + username + "\")'> FOLLOWING </button>")
        $("#follow-block").append(div)
    }
    console.log(localStorage.getItem('username'))
    console.log(localStorage.getItem('friendusername'))

    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        console.log(response)
        $("#username").text(username)
        $("#name").text(response['name'])
        $("#bio").text(response['bio'])
        let image = $("<img src = '" + "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + username + ".jpg'>")
        $("#dp").append(image)
        
        for(i in response['friends']) {
            let div = $("<div class='friend'> <div/>")
            let imgsrc = "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + response['friends'][i] + ".jpeg"
            let divImage = $("<div class='friend-image'> <img src = '" + imgsrc + "'>  <div/>")
            $(div).append(divImage)
            let divName = $("<div class='friend-name' onclick='friendProfile(\"" + response['friends'][i] + "\")'>" + response['friends'][i] +  "</a> <div/>")
            $(div).append(divName)
            $("#friends-block").append(div)
        }

        for(i in response['events']) {
            let div = $("<div class='event'> <div/>")
            let imgsrc = "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + response['events'][i]
            let divImage = $("<div class='event-image'> <img src = '" + imgsrc + "'>  <div/>")
            $(div).append(divImage)
            let divName = $("<div class='event-name' onclick='eventPage(\"" + response['events'][i] + "\")'>" + response['eventsAttending'][i] +  "</a> <div/>")
            $(div).append(divName)
            $("#events-block").append(div)
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
});