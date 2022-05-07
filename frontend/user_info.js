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
    console.log(username+data.type);
    let urlcreate="https://xlvb6nuhve.execute-api.us-east-1.amazonaws.com/dev/uploaddp/" + dp['name'];

    xhr.open("PUT", urlcreate);
    xhr.setRequestHeader("Content-Type", data.type);
    xhr.send(data);
}


function submitUserData() {
    var selected = [];
    for (var option of document.getElementById('categories').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    } 
    console.log(selected);
    username = document.getElementById('username').value;
    namee = document.getElementById('name').value;
    bio = document.getElementById('bio').value;
    dp = document.getElementById('dp').files[0];
    email = document.getElementById('email').value;
    city=document.getElementById("autocomplete").value;
    
    if(username==null || username == "" || namee==null || namee == "" || 
       bio==null || bio == "" || dp==null || dp == "" || email==null || email == "" || 
       city==null || city == ""){
         logMessage("Please fill in all the fields!");
         window.scrollTo(0, 0);
       }
    else{

      uploadPhoto(dp, username)

      sdk.userinfoGet({"bio":bio, "name":namee, "username":username,"photo":dp['name'], "email":email, "city":city,"categories":selected}, {}, {}).then((response) => {
          console.log(response)
          if(response) {
              location.href = './main.html';
          }
          document.getElementById('username').value = "";
          document.getElementById('name').value = "";
          document.getElementById('bio').value = "";
          document.getElementById('dp').value = "";
          document.getElementById('email').value = "";
          document.getElementById('autocomplete').value = "";

      })
      .catch((error) => {
          console.log('an error occurred', error);
      });
  }
}

// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let autocomplete;
const countryRestrict = { country: "us" };

function initMap() {
  // Create the autocomplete object and associate it with the UI input control.
  // Restrict the search to the default country, and to place type "cities".
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["(cities)"],
      componentRestrictions: countryRestrict,
      fields: ["geometry"],
    }
  );
  autocomplete.addListener("place_changed", onPlaceChanged);
  // Add a DOM event listener to react when the user selects a country.
//   document
//     .getElementById("country")
//     .addEventListener("change", setAutocompleteCountry);
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
  let val=document.getElementById("autocomplete").value;
  console.log(val);
}

function logMessage(message){
  $("#error").html("");
  $('#error').append(message + '</br>');
}


// Set the country restriction based on user input.
// Also center and zoom the map on the given country.
function setAutocompleteCountry() {
  const country = document.getElementById("country").value;

  if (country == "all") {
    autocomplete.setComponentRestrictions({ country: [] });
  } else {
    autocomplete.setComponentRestrictions({ country: country });
  }
}

window.initMap = initMap;


$(document).ready(function() {
    $("#username").val(localStorage.getItem('username'));
    $("#email").val(localStorage.getItem('email'));

})