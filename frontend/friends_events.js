var sdk = apigClientFactory.newClient();

window.onload = getFriendsEvents();

function getFriendsEvents() {
    username = localStorage.getItem('username');
    console.log("username");
    console.log(username);
    sdk.friendseventsGet({'username': username}).then((response) => {
        console.log(response);
    })
}

