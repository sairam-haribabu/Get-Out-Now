var sdk = apigClientFactory.newClient();


function uploadPhoto(data, username){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.withCredentials = false;
    let urlcreate="https://xlvb6nuhve.execute-api.us-east-1.amazonaws.com/alpha/uploaddp/" + username + ".jpeg";

    xhr.open("PUT", urlcreate);
    xhr.setRequestHeader("Content-Type", data.type);
    xhr.send(data);
}


function submitUserData() {
    username = document.getElementById('username').value;
    namee = document.getElementById('name').value;
    bio = document.getElementById('bio').value;
    dp = document.getElementById('dp').files[0];

    uploadPhoto(dp, username)
    sdk.userinfoGet({"bio":bio, "name":namee, "username":username}, {}, {}).then((response) => {
        console.log(response)
        if(response) {
            location.href = './main.html';
        }
        document.getElementById('username').value = "";
        document.getElementById('name').value = "";
        document.getElementById('bio').value = "";
        document.getElementById('dp').value = "";
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}


$(document).ready(function() {
    $("#username").val(localStorage.getItem('username'));
})