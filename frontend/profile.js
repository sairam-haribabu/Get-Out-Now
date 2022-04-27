var sdk = apigClientFactory.newClient();

$( document ).ready(function() {
    console.log( "ready!" );
});

function loadProfile() {
    let username = localStorage.getItem('username');
    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        console.log(response, username, response['name'])
        // document.getElementById('username').value = username;
        // document.getElementById('name').value = response['name'];
        // document.getElementById('bio').value = response['bio'];
        $("#username").val(username)
        $("#name").val(response['name'])
        $("#bio").val(response['bio'])
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}