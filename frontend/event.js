var sdk = apigClientFactory.newClient();

function showEvents(response) {
    var img = document.createElement("img");
    let question_img = $("<img src = '" + response["data"]["image"]["url"] + "' class='eImage'>")
	$(".eventImage").append(question_img)
    

    var nameDiv = $("<div> " + response['data']['name'] + "</div>")
    var nameDiv = $("<div> </div>")
    nameDiv.append(response["data"]["name"]);
    nameDiv.append($("<br>"))

    $("#name-block").append(nameDiv)


    var detailsDiv = $("<div> </div>")
    detailsDiv.append(response["data"]["venue"]["name"]);
    detailsDiv.append($("<br>"))
    var address = response["data"]["venue"]["location"]
    detailsDiv.append(address["address"] + ", " + address["city"] + ", " + address["state"]);
    detailsDiv.append($("<br>"))
    detailsDiv.append($("<br>"))
    $("#details-block").append(detailsDiv)
   
    let friends = $("<div> </div>") 
    for (let key in response["data"]["attendees"]) {
        let friend = $("<div>" + response["data"]["attendees"][key] + "</div>")
        if (username != response["data"]["attendees"][key]){
            friends.append(response["data"]["attendees"][key])
            friends.append($("<br>"))
        }
    }
    $("#friends-block").append(friends)
}

function attend_event(name, eventid){
    console.log("boom")
    sdk.attendeventGet({'eventid':eventid, 'name':name}, {}, {}).then((response) => {
        response = response['data']['body']
        
        let button = $("<input type='submit' class='attending' name='attend' value = 'Attending'>")
        button.prop('disabled', true);
        $("#attend_button").empty()
        $("#attend_button").append(button)
    })
}

window.onload = function() {
    event_id = localStorage.getItem('event-id');
    username = localStorage.getItem('username');
    let flag = false
    console.log(username)
    sdk.eventGet({'eventid':event_id}, {}, {}).then((response) => {
        console.log("E", event_id)
        response = response['data']['body']   
        console.log(response["data"]["attendees"][0])
        showEvents(response)
        for( let key in response["data"]["attendees"]){
            if (username == response["data"]["attendees"][key]){
                flag = true
            }
        }
        if (flag){
            console.log("a")
            let button = $("<input type='submit' class='attending' name='attend' value = 'Attending'>")
            button.prop('disabled', true);
            $("#attend_button").empty()
            $("#attend_button").append(button)
        }
        else{
            console.log("b")
            let button = $("<input type='submit' class='attend' name='attend' value = 'Attend Event'>")
            $("#attend_button").empty()
            $("#attend_button").append(button)
            $("#attend_button").click (function(){attend_event(username, event_id)});
            
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
    
  };