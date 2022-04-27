var sdk = apigClientFactory.newClient();

$( document ).ready(function() {
    console.log( "ready!" );
});



function loadProfile() {
    let username = localStorage.getItem('username');
    sdk.profileGet({'username':username}, {}, {}).then((response) => {
        response = response['data']['body']
        console.log(response)
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}