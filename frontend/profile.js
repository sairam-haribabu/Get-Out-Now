var sdk = apigClientFactory.newClient();

$(document).ready(function() {
    console.log( "ready!" );
    let username = localStorage.getItem('username');
    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        console.log(response, username, response['name'])
        $("#username").text(username)
        $("#name").text(response['name'])
        $("#bio").text(response['bio'])
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
});