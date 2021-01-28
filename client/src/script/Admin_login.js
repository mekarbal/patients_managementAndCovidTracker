
//validationg admin login
function check() {
 //getting dom elements
  let username = document.getElementById("username").value;
  let username_error = document.getElementById("username_error");
  let password = document.getElementById("password").value;
  let password_error = document.getElementById("password_error");

  //admins login info
  let user_name = "admin";
  let user_password = "admin";

  if (username == "" || password == "") {
    username_error.innerHTML = "Fill all inputs field";
    password_error.innerHTML = "Fill all inputs field";
  } else if (username !== user_name || password !== user_password) {
    username_error.innerHTML = "wrong credention";
    password_error.innerHTML = "wrong credention";
  } else {
    username_error.innerHTML = " ";
    password_error.innerHTML = " ";
    window.location.href = "../views/doctor.html";
  }
}

