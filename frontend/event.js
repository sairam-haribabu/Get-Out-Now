var sdk = apigClientFactory.newClient();

var response = {
    "id": "Z7r9jZ1Ad8z_N",
    "data": {
        "name": "West Conf Qtrs: Suns at Pelicans Rd 1 Hm Gm 1",
        "url": "https://www.ticketmaster.com/event/Z7r9jZ1Ad8z_N",
        "image": {
            "url": "https://s1.ticketm.net/dam/a/b1c/4be191e2-6357-433c-a421-aa1ffb2e8b1c_1340051_TABLET_LANDSCAPE_16_9.jpg",
            "width": 1024,
            "height": 576
        },
        "date": {
            "dateTime": "2022-04-23T01:30:00Z",
            "localDate": "2022-04-22"
        },
        "categories": [
            "Sports",
            "Basketball",
            "NBA"
        ],
        "family": false,
        "venue": {
            "id": "ZFr9jZee1e",
            "name": "Smoothie King Center",
            "image": null,
            "location": {
                "address": "1501 Dave Dixon Drive",
                "city": "New Orleans",
                "state": "LA",
                "country": "US",
                "postalCode": "70113",
                "timezone": "America/Chicago",
                "coordinates": {
                    "longitude": "-90.082802",
                    "latitude": "29.9429"
                }
            }
        },
        "attendees": []
    }
}

function showEvents() {
    var img = document.createElement("img");
    img.src = response["data"]["image"]["url"]
    document.getElementById('image-block').appendChild(img)
    

    var nameDiv = document.createElement("div");
    nameDiv.appendChild(document.createTextNode(response["data"]["name"]));
    nameDiv.appendChild(document.createElement("br"))
    document.getElementById('name-block').appendChild(nameDiv)

    // eventsDiv.appendChild(document.createElement("br"))
    var detailsDiv = document.createElement("div");
    detailsDiv.appendChild(document.createTextNode("Location: " + response["data"]["venue"]["name"]));
    detailsDiv.appendChild(document.createElement("br"))
    var address = response["data"]["venue"]["location"]
    detailsDiv.appendChild(document.createTextNode("Address" + address["address"] + ", " + address["city"] + ", " + address["state"]));
    detailsDiv.appendChild(document.createElement("br"))
    detailsDiv.appendChild(document.createTextNode("Friends attending"))
    detailsDiv.appendChild(document.createElement("br"))
    document.getElementById('details-block').appendChild(detailsDiv)
    for (let key in response["data"]["attendees"]) {
        detailsDiv.appendChild(document.createTextNode(key));
        detailsDiv.appendChild(document.createElement("br"))
    }
}

window.onload = function() {
    event_id = localStorage.getItem('event-id');
    showEvents()
  };