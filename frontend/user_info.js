var sdk = apigClientFactory.newClient();

function submitUserData() {
    username = document.getElementById('username').value;
    namee = document.getElementById('name').value;
    bio = document.getElementById('bio').value;
    sdk.userinfoGet({"bio":bio, "name":namee, "username":username}, {}, {}).then((response) => {
        console.log(response)
        if(response) {
            location.href = './main.html';
        }
        document.getElementById('username').value = "";
        document.getElementById('name').value = "";
        document.getElementById('bio').value = "";
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}