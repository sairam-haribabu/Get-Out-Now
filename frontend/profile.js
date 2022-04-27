var sdk = apigClientFactory.newClient();

function friendProfile() {
    localStorage.setItem('friendusername', 'sairam');
    location.href = './profile.html';
}

$(document).ready(function() {
    console.log( "ready!" );
    let username = localStorage.getItem('username');
    if(localStorage.getItem('friendusername') == "") {
        username = localStorage.getItem('username');
    }
    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        console.log(response, username, response['name'])
        $("#username").text(username)
        $("#name").text(response['name'])
        $("#bio").text(response['bio'])
        for(i in response['friends']) {
            console.log("F", response['friends'][i])
            let div = $("<div class='friend'> <div/>")
            let divImage = $("<div class='friend-image'> <img src = './boston.jpg'> <div/>")
            $(div).append(divImage)
            let divName = $("<div class='friend-name' onclick='friendProfile()'>" + response['friends'][i] +  "</a> <div/>")
            $(div).append(divName)
            $("#friends-block").append(div)
        }
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
});