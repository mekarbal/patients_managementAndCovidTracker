const url = "https://60056b6f75860e0017c5c865.mockapi.io/admin/doctor";

function fetchData() {
  var email = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var email_zone = document.getElementById('email_error');
  var password_zone = document.getElementById('password_error');

  console.log(email, password);
  allData = {};
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      allData = data;
      console.log(allData);

      allData.map((doctor) => {
        console.log(doctor.password);

        if (doctor.email == email && doctor.password == password) {
          window.location.href = "../views/chart.html";
        } else {
          email_zone.innerHTML = "wrong credention";
          password_zone.innerHTML = "wrong credention";
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
