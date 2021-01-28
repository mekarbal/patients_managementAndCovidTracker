//REGEX
var name_regex = /([A-Z\sa-z]){1,30}/;
var email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
var phone_regex = /^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/;
var CIN_regex = /^[A-Z]{1,2}[0-9]{4}/;



//first name validation  
$('#fname').keyup(function(){
    if($('#fname').val() == ""){
       $('#fname_error').text("first name number is empty");
       $('#fname_error').css("color", "red")
    }else if(!$('#fname').val().match(name_regex)){
       $('#fname_error').text("only characters allowed");
       $('#fname_error').css("color", "red")
    }else{
       $('#fname_error').text("");
   }
});

//last name validation  
$('#lname').keyup(function(){
    if($('#lname').val() == ""){
       $('#lname_error').text("last name number is empty");
       $('#lname_error').css("color", "red")
    }else if(!$('#lname').val().match(name_regex)){
       $('#lname_error').text("only characters allowed");
       $('#lname_error').css("color", "red")
    }else{
       $('#lname_error').text("");
   }
});

//Email validation  
$('#email').keyup(function(){
    if($('#email').val() == ""){
       $('#email_error').text("email number is empty");
       $('#email_error').css("color", "red")
    }else if(!$('#email').val().match(email_regex)){
       $('#email_error').text("invalid email format");
       $('#email_error').css("color", "red")
    }else{
       $('#email_error').text("");
   }
});

//password validation  
$('#password').keyup(function(){
    if($('#password').val() == ""){
       $('#password_error').text("password number is empty");
       $('#password_error').css("color", "red")
    }else if(!$('#password').val().match(password_regex)){
       $('#password_error').text("invalid password format");
       $('#password_error').css("color", "red")
    }else{
       $('#password_error').text("");
   }
});

//phone validation  
$('#phone').keyup(function(){
     if($('#phone').val() == ""){
        $('#phone_error').text("phone number is empty");
        $('#phone_error').css("color", "red")
     }else if(!$('#phone').val().match(phone_regex)){
        $('#phone_error').text("invalid phone format");
        $('#phone_error').css("color", "red")
     }else{
        $('#phone_error').text("");
    }
});


//CIN validation
$('#CIN').keyup(function(){
    if($('#CIN').val() == ""){
        $('#CIN_error').text("CIN number is empty");
        $('#CIN_error').css("color", "red")
    }
    else if(!$('#CIN').val().match(CIN_regex)){
        $('#CIN_error').text("invalid CIN format");
        $('#CIN_error').css("color", "red")
    }
    else{
        $('#CIN_error').text("");
    }
});


//validate form before subbmitting
$('#add_btn').click(function(e){
    if($('#CIN_error').text() == "" &&$('#phone_error').text() == "" && $('#password_error').text() == "" && $('#email_error').text() == "" && $('#lname_error').text() == "" && $('#fname_error').text() == ""){
        //all is good
    }else{
        //errors were found
        e.preventDefault();
    }
});


/********* the patient part ***********/


//first name validation  
$('#firstName').keyup(function(){
    if($('#firstName').val() == ""){
       $('#firstName_error').text("first name  is empty");
       $('#firstName_error').css("color", "red")
    }else if(!$('#firstName').val().match(name_regex)){
       $('#firstName_error').text("only characters allowed");
       $('#firstName_error').css("color", "red")
    }else{
       $('#firstName_error').text("");
   }
});

//last name validation  
$('#lastName').keyup(function(){
    if($('#lastName').val() == ""){
       $('#lastName_error').text("last name number is empty");
       $('#lastName_error').css("color", "red")
    }else if(!$('#lastName').val().match(name_regex)){
       $('#lastName_error').text("only characters allowed");
       $('#lastName_error').css("color", "red")
    }else{
       $('#lastName_error').text("");
   }
});

//Email validation  
$('#email').keyup(function(){
    if($('#email').val() == ""){
       $('#email_error').text("email number is empty");
       $('#email_error').css("color", "red")
    }else if(!$('#Pemail').val().match(email_regex)){
       $('#email_error').text("invalid email format");
       $('#email_error').css("color", "red")
    }else{
       $('#email_error').text("");
   }
});

//phone validation  
$('#phone').keyup(function(){
     if($('#phone').val() == ""){
        $('#phone_error').text("phone number is empty");
        $('#phone_error').css("color", "red")
     }else if(!$('#phone').val().match(phone_regex)){
        $('#phone_error').text("invalid phone format");
        $('#phone_error').css("color", "red")
     }else{
        $('#phone_error').text("");
    }
});


//CIN validation
$('#cin').keyup(function(){
    if($('#cin').val() == ""){
        $('#CIN_error').text("CIN number is empty");
        $('#CIN_error').css("color", "red")
    }
    else if(!$('#cin').val().match(CIN_regex)){
        $('#CIN_error').text("invalid CIN format");
        $('#CIN_error').css("color", "red")
    }
    else{
        $('#CIN_error').text("");
    }
});



