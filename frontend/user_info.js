var sdk = apigClientFactory.newClient();

function uploadPhoto(){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            // window.alert("Successfully uploaded " + data.name);
        }
    });
    xhr.withCredentials = false;
    let urlcreate="https://1cjfczdwec.execute-api.us-east-1.amazonaws.com/stage2/upload/ccbdbucket3/" + data.name;

    xhr.open("PUT", urlcreate);
    xhr.setRequestHeader("Content-Type", data.type);
    xhr.setRequestHeader("x-api-key", "9uRzHzPX9J4Kx3W987u9i60UaXyZji6waPY9wni6")
    xhr.setRequestHeader("x-amz-meta-customLabels", label)
    xhr.send(data);
}


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