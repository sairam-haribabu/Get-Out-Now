var sdk = apigClientFactory.newClient();

window.onload = searchEvents();


function searchEvents() {
    keywordEl = document.getElementById('keyword');
    if (keywordEl == null) {
        keyword = "";
    } else {
        keyword = document.getElementById('keyword').value;
    }
    // user is searching for event name, date, categories, or location
    sdk.searchGet({'query':keyword}, {}, {}).then((response) => {
        document.getElementById('keyword').value = ""; // clearing search for next search

        response = response['data']['body'];
        console.log(response);

        // getting div that holds row of users
        var allDisplayDiv = document.getElementById('display-block');
        allDisplayDiv.innerHTML = '';

        // DISPLAYING USERS
        users = response['users']
        console.log(users.length)
        if (users.length > 0) {
            allDisplayDiv.appendChild(document.createTextNode("Search results based on user"));
        
            for (let idx in users) {
                var i = 0; // used to limit how many elements in each row
                // creating first row that the users will be placed
                var usersRow = document.createElement("div");
                usersRow.classList.add("row");
                allDisplayDiv.appendChild(usersRow);

                if (i == 3) {
                    // creates a division between the last row & this row
                    div = document.createElement("div");
                    div.classList.add("w-100");
                    usersRow.appendChild(div);

                    // new usersRow
                    i = 0;
                }

                let user = users[idx]["data"];
                let username = users[idx]["username"];

                // creating column within row
                let userCol = document.createElement("div");
                userCol.classList.add("col");
                usersRow.appendChild(userCol);
                
                // user image
                let userImg = document.createElement("img");
                userImg.id = username; // link for user connects to user id
                userImg.src = "https://ccbduserphotobucket.s3.amazonaws.com/" + username + ".jpg";
                userImg.onclick = function(){show_user(userImg.id)};
                userCol.appendChild(userImg)
                userCol.appendChild(document.createElement("br"));

                // user name -- only keep first 32 characters of name
                let name = user["name"];
                if (name.length > 32) {
                    name = name.substring(0, 32) + "...";
                }
                let userName = document.createTextNode(name);
                userCol.appendChild(userName);  

                i++;
            }
        }
        
        // DISPLAYING EVENTS
        events = response['events'];
        for (let key in events) {
            if (key != 'all') {
                allDisplayDiv.appendChild(document.createTextNode("Search results based on " + key + "!!!!!!!!!!!!"));
            }
            
            var i = 0; // used to limit how many elements in each row
            // creating first row that the events will be placed
            var eventsRow = document.createElement("div");
            eventsRow.classList.add("row");
            allDisplayDiv.appendChild(eventsRow);

            for (let idx in events[key]) {
                if (i == 3) {
                    // creates a division between the last row & this row
                    div = document.createElement("div");
                    div.classList.add("w-100");
                    eventsRow.appendChild(div);

                    // new eventsRow
                    i = 0;
                }

                let event = events[key][idx];
    
                // creating column within row
                let eventCol = document.createElement("div");
                eventCol.classList.add("col");
                eventsRow.appendChild(eventCol);
                
                // event image
                let eventImg = document.createElement("img");
                eventImg.id = event["id"]; // link for event connects to event id
                eventImg.src = event["image"];
                eventImg.onclick = function(){show_event(eventImg.id)};
                eventCol.appendChild(eventImg)
                eventCol.appendChild(document.createElement("br"));
    
                // event name -- only keep first 32 characters of name
                let name = event["name"];
                if (name.length > 32) {
                    name = name.substring(0, 32) + "...";
                }
                let eventName = document.createTextNode(name);
                eventCol.appendChild(eventName);  

                i++;
            }
        }
        
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}


function myProfile() {
    localStorage.setItem('friendusername', "");
    location.href = './profile.html';
}

function show_event(id) {
    localStorage.setItem('event-id', id);
    location.href = './event.html';

}
