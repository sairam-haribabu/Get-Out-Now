var sdk = apigClientFactory.newClient();

function searchEvents() {
    keyword = document.getElementById('keyword').value;
    console.log(keyword)
    sdk.searchGet({'query':keyword}, {}, {}).then((response) => {
        response = response['data']['body']
        document.getElementById('keyword').value = "";
        const eventsDiv = document.createElement("div");

        for (let key in response) {
            eventsDiv.appendChild(document.createTextNode(key));
            eventsDiv.appendChild(document.createElement("br"))

            console.log(response[key])
            for (let i in response[key]) {
                let event = response[key][i]["Items"][0]['data']


                eventsDiv.appendChild(document.createTextNode(event['name']));
                eventsDiv.appendChild(document.createElement("br"))
            }
        }
        document.getElementById('result-block').appendChild(eventsDiv)
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}


function myProfile() {
    location.href = './profile.html';
}