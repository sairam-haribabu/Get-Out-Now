
//=============== AWS IDs ===============
var userPoolId = 'us-east-1_fvK1OHbeR';
var clientId = '543gs8p8cujqb4oe90gs88io3l';
var region = 'us-east-1';
var identityPoolId = 'us-east-1:57a23bb2-c25e-48a8-ae01-690095c05f6a';
//=============== AWS IDs ===============

var cognitoUser;
var idToken;
var userPool;
var newUser = false;
var poolData = { 
    UserPoolId : userPoolId,
    ClientId : clientId
};

getCurrentLoggedInSession();

function switchToVerificationCodeView(){
    $("#emailInput").hide();
    $("#userNameInput").hide();
    $("#passwordInput").hide();
    $("#confirmPasswordInput").hide();
    $("#logInButton").hide();
    $("#registerButton").hide();
    $("#verificationCodeInput").show();
    $("#verifyCodeButton").show();
}

function switchToRegisterView(){
    $("#emailInput").show();
    $("#userNameInput").show();
    $("#passwordInput").show();
    $("#confirmPasswordInput").show();
    $("#logInButton").hide();
    $("#registerButton").show();
    $("#verificationCodeInput").hide();
    $("#verifyCodeButton").hide();
    newUser = true
}

function switchToLogInView(){
    localStorage.setItem('username', "");
    localStorage.setItem('email', "");
    localStorage.setItem('category', "");
    $("#userNameInput").val('');
    $("#passwordInput").val('');
    $("#emailInput").hide();
    $("#userNameInput").show();
    $("#passwordInput").show();
    $("#confirmPasswordInput").hide();
    $("#logInButton").show();
    $("#registerButton").show();
    $("#verificationCodeInput").hide();
    $("#verifyCodeButton").hide();
}

function switchToLoggedInView(){
    $("#emailInput").hide();
    $("#userNameInput").hide();
    $("#passwordInput").hide();
    $("#confirmPasswordInput").hide();
    $("#logInButton").hide();
    $("#registerButton").hide();
    $("#verificationCodeInput").hide();
    $("#verifyCodeButton").hide();
    
    if(localStorage.getItem('username') == null || localStorage.getItem('username') =='') {
        localStorage.setItem('username', $('#userNameInput').val());
        console.log(localStorage.getItem('username'))
    }
    if(localStorage.getItem('email') == null || localStorage.getItem('email') =='') {
        console.log("setting email localstorage");
        localStorage.setItem('email', $('#emailInput').val());
        console.log(localStorage.getItem('emailInput'))
    }

    if(newUser) {
        location.href = '../frontend/user_info.html';
    } else {
        location.href = '../frontend/main.html';
    }
    newUser = false
}

function clearLogs(){
    $('#log').empty();
}

/*
Starting point for user logout flow
*/
function logOut(){
    if (cognitoUser != null) {

        $("#loader").show();
        cognitoUser.signOut();
        switchToLogInView();
        logMessage('Logged out!');
        $("#loader").hide();
    }
}

/*
Starting point for user login flow with input validation
*/
function logIn(){
    $('#log').empty();
    if(!$('#userNameInput').val() || !$('#passwordInput').val()){
        logMessage('Please enter Username and Password!');
    }else{
        var authenticationData = {
            Username : $('#userNameInput').val(),
            Password : $("#passwordInput").val(),
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        var userData = {
            Username : $('#userNameInput').val(),
            Pool : userPool
        };
        cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        $("#loader").show();
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                logMessage('Logged in!');
                switchToLoggedInView();
                idToken = result.getIdToken().getJwtToken();
                getCognitoIdentityCredentials();
            },

            onFailure: function(err) {
                logMessage(err.message);
                $("#loader").hide();
            },

        });
    }
}

/*
Starting point for user registration flow with input validation
*/
function register(){
    $('#log').empty();
    switchToRegisterView();
    $('#log').empty();

    if( !$('#emailInput').val() || !$('#userNameInput').val()  || !$('#passwordInput').val() || !$('#confirmPasswordInput').val() ) {
            logMessage('Please fill all the fields!');
    }else{
        if($('#passwordInput').val() == $('#confirmPasswordInput').val()){
            registerUser($('#emailInput').val(), $('#userNameInput').val(), $('#passwordInput').val());
        }else{
            logMessage('Confirm password failed!');
        }
        
    }
}

/*
Starting point for user verification using AWS Cognito with input validation
*/
function verifyCode(){
    if( !$('#verificationCodeInput').val() ) {
        logMessage('Please enter verification field!');
    }else{
        $("#loader").show();
        cognitoUser.confirmRegistration($('#verificationCodeInput').val(), true, function(err, result) {
            if (err) {
                logMessage(err.message);
            }else{
                logMessage('Successfully verified code!');
                switchToLogInView();
            }
            
            $("#loader").hide();
        });
    }
}

/*
User registration using AWS Cognito
*/
function registerUser(email, username, password){
    var attributeList = [];
    
    var dataEmail = {
        Name : 'email',
        Value : email
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    $("#loader").show();
    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            logMessage(err.message);
        }else{
            cognitoUser = result.user;
            logMessage('Registration Successful!');
            logMessage('Username is: ' + cognitoUser.getUsername());
            logMessage('Please enter the verification code sent to your Email.');
            switchToVerificationCodeView();
        }
        $("#loader").hide();
    });
}

/*
This method will get temporary credentials for AWS using the IdentityPoolId and the Id Token recieved from AWS Cognito authentication provider.
*/
function getCognitoIdentityCredentials(){
    AWS.config.region = region;

    var loginMap = {};
    loginMap['cognito-idp.' + region + '.amazonaws.com/' + userPoolId] = idToken;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
        Logins: loginMap
    });

    AWS.config.credentials.clearCachedId();

    AWS.config.credentials.get(function(err) {
        if (err){
            logMessage(err.message);
        }
        else {
            logMessage('AWS Access Key: '+ AWS.config.credentials.accessKeyId);
            logMessage('AWS Secret Key: '+ AWS.config.credentials.secretAccessKey);
            logMessage('AWS Session Token: '+ AWS.config.credentials.sessionToken);
        }

        $("#loader").hide();
    });
}

/*
If user has logged in before, get the previous session so user doesn't need to log in again.
*/
function getCurrentLoggedInSession(){

    $("#loader").show();
    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    cognitoUser = userPool.getCurrentUser();

    if(cognitoUser != null){
        cognitoUser.getSession(function(err, session) {
            if (err) {
                logMessage(err.message);
            }else{
                logMessage('Session found! Logged in.');
                switchToLoggedInView();
                idToken = session.getIdToken().getJwtToken();
                getCognitoIdentityCredentials();
            }
            $("#loader").hide();
        });
    }else{
        logMessage('Session expired. Please log in again.');
        $("#loader").hide();
    }

}

/*
This is a logging method that will be used throught the application
*/
function logMessage(message){
    $('#log').append(message + '</br>');
}


$(document).ready(function() {
    $('#log').empty();
    if(localStorage.getItem('username').length <= 0) {
        logOut();
    }
    localStorage.setItem('username', '');
    localStorage.setItem('friendusername', '');
    localStorage.setItem('email', '');
    localStorage.setItem('event-id', '');
    localStorage.setItem('mainuserfriends', '');    
})
