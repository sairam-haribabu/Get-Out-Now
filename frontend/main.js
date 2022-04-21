var sdk = apigClientFactory.newClient();

function searchEvents() {
    keyword = document.getElementById('keyword').value;
    console.log(keyword)
    sdk.searchGet({'query':keyword}, {}, {}).then((response) => {
        console.log(response);
        document.getElementById('keyword').value = "";
    })
    .catch((error) => {
        console.log('an error occurred', error);
    });
}