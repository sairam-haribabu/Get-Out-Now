var sdk = apigClientFactory.newClient();

function getFriendsEvents() {
    username = localStorage.getItem('username');
    console.log("username");
    console.log(username);
    sdk.friendseventsGet({'username': username}).then((response) => {
        console.log("response: !")
        console.log(response);
    })
}

$(document).ready(function() {
    getFriendsEvents()
})