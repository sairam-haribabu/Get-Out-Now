var sdk = apigClientFactory.newClient();

function submitUserData() {
    username = document.getElementById('username').value;
    namee = document.getElementById('name').value;
    bio = document.getElementById('bio').value;
    sdk.userinfoPut({'username':username, 'name':namee, 'bio':bio}, {}, {}).then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}