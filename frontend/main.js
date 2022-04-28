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

        response = response['data']['body']['events'];
        console.log(response);

        // getting div that holds row of events
        var allEventsDiv = document.getElementById('events-block');
        allEventsDiv.innerHTML = '';
        
        for (let key in response) {
            if (key != 'all') {
                allEventsDiv.appendChild(document.createTextNode("Search results based on " + key + "!!!!!!!!!!!!"));
            }
            
            var i = 0; // used to limit how many elements in each row
            // creating first row that the events will be placed
            var eventsRow = document.createElement("div");
            eventsRow.classList.add("row");
            allEventsDiv.appendChild(eventsRow);

            for (let idx in response[key]) {
                if (i == 3) {
                    // creates a division between the last row & this row
                    div = document.createElement("div");
                    div.classList.add("w-100");
                    eventsRow.appendChild(div);

                    // new eventsRow
                    i = 0;
                }

                let event = response[key][idx];
    
                // creating column within row
                let eventCol = document.createElement("div");
                eventCol.id = event["id"]; // link for event connects to event id
                eventCol.classList.add("col");
                eventCol.onclick = function(){show_event(eventCol.id)};
                eventsRow.appendChild(eventCol);
    
                // event image
                let eventImg = document.createElement("img");
                eventImg.src = event["image"];
                eventCol.appendChild(eventImg)
                eventCol.appendChild(document.createElement("br"));
    
                // event name -- only keep first 32 characters of name
                let name = event["name"];
                if (event["name"].length > 32) {
                    name = event["name"].substring(0, 32) + "...";
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
    localStorage.setItem('friendusername', "")
    location.href = './profile.html';
}

function show_event(id) {
    localStorage.setItem('event-id', id);
    location.href = './event.html';

}

function logOut() {
    location.href = '../login/index.html';
}