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


function myProfile() {
    localStorage.setItem('friendusername', "")
    location.href = './profile.html';
}


function showEventDetails(response) {
    let img = $("<img src = '" + response["image"]["url"] + "' class='mainImage'>")
	$("#image-block").append(img)
    
    var nameDiv = $("<div> " + response['name'] + "</div>")

    $("#name-block").append(nameDiv)

    if(response['info']!="N/A") {
        $("#info-block").append(response['info'])
    } else if(response['note'] != "N/A") {
        $("#info-block").append(response['note'])
    }

    let address = response['instances'][0]['venue']['name'] + ", " + response['instances'][0]['venue']['location']['address'] + ", " + response['instances'][0]['venue']['location']['city']
    $("#date-block").append($("<div> On " + response['instances'][0]['date'] + " At " + address + " </div>"))

    $("#ticket-block").append($("<h4> Click here to get your ticket from TicketMasters! </h4>"))
    $("#ticket-block").append($("<a href='" + response['url'] + "'> GET TICKETS </a> </div>"))

    if(response['attractions']) {
        let attractions = response['attractions']['name']['externalLinks']
        attractionKeys = Object.keys(attractions)
        $("#attraction-block").append($("<h4> FOLLOW US </h4>"))
        $("#attraction-block").append($("<br>"))
        let rowDiv = $("<div class='row'> </div>")
        $(rowDiv).append($("<div class='col-md-4'> </div>"))
        // for(i in attractionKeys) {
        //     if(['facebook', 'instagram', 'twitter', 'youtube'].includes(attractionKeys[i]) && attractions[attractionKeys[i]] != null) {
        //         let div = $("<div class='col-md-1'> <a href ='" + attractions[attractionKeys[i]] + "' class='social fa fa-" + attractionKeys[i] + "'> </a> </div>")
        //         $(rowDiv).append(div)
        //     }
        // }
        attractionKeys = ['facebook', 'twitter', 'instagram', 'youtube']
        for(i in attractionKeys) {
            let div = $("<div class='col-md-1'> <a href ='" + attractions[attractionKeys[i]] + "' class='social fa fa-" + attractionKeys[i] + "'> </a> </div>")
            $(rowDiv).append(div)
        }
        $("#attraction-block").append(rowDiv)
    }

    if(response['attendees'].length > 0) {
        let heading = $("<h3> FRIENDS ATTENDING </h3>")
        $("#friends-block").append(heading)

        let friendRow = $("<div class='row'> </div>")
        for(i in response['attendees']) {
            let div = $("<div class='col-md-2 friend'> <div/>")
            let imgsrc = "https://ccbduserphotobucket.s3.us-east-1.amazonaws.com/" + response['attendees'][i]['photo']
            let divImage = $("<div class='friend-image'> <img src = '" + imgsrc + "' class='friend-image'>  <div/>")
            $(div).append(divImage)
            let divName = $("<div class='friend-name' onclick='friendProfile(\"" + response['attendees'][i]['username'] + "\")'>" + response['attendees'][i]['name'] +  "</a> <div/>")
            $(div).append(divName)
            $(friendRow).append(div)
        }
        $("#friends-block").append(friendRow)
    }
}


function attend_event(name, eventid){
    sdk.attendeventGet({'eventid':eventid, 'name':name}, {}, {}).then((response) => {
        response = response['data']['body']
        let button = $("<button class='btn btn-primary attending' type='submit' disabled> ATTENDING </button>")
        $("#attend-block").empty()
        $("#attend-block").append(button)
    })
}


function userAttendingEvent(username, response) {
    for(i in response) {
        if(response[i]['username'] == username) {
            return true
        } 
    }
    return false
}

window.onload = function() {
    event_id = localStorage.getItem('event-id');
    username = localStorage.getItem('username');
    let flag = false
    console.log(username)

    sdk.eventGet({'eventid':event_id}, {}, {}).then((response) => {
        console.log("E", event_id)
        response = response['data']['body']['data']  
        console.log("R", response) 
        
        showEventDetails(response)

        if(userAttendingEvent(username, response['attendees'])) {
            let button = $("<button class='btn btn-primary attending' type='submit' disabled> ATTENDING </button>")
            $("#attend-block").empty()
            $("#attend-block").append(button)
        } else {
            let button = $("<button class='btn btn-primary attending' type='submit'> ATTEND EVENT </button>")
            $("#attend-block").empty()
            $("#attend-block").append(button)
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
    
  };