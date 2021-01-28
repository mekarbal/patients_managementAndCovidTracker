

// setting the main url parh
const url = "https://60056b6f75860e0017c5c865.mockapi.io/admin/doctor";

//Display data from a mock api
function fetchData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const html = data
        .map((doctor) => {
          return `
        <div class="single_container">
          <h5 class="fname"> ${doctor.firstName}</h5>
          <h5 class="lname"> ${doctor.lastName}</h5>
          <h5 class="email"> ${doctor.email}</h5>
          <h5 class="password"> ${doctor.password}</h5>
          <h5 class="phone">  ${doctor.phone}</h5>
          <h5 class="cin"> ${doctor.CIN}</h5>
          <button id="btn_edit" class="editeBtn"  data-id=${doctor.id} data-toggle="modal" data-target=".bd-example1-modal-lg">
            Edit
          </button>
          |
          <button data-id=${doctor.id} id="btn_delete">
             Delete
          </button>
        </div>
     `;
        })
        .join("");
      document
        .querySelector("#container")
        .insertAdjacentHTML("afterbegin", html);
    })
    .catch((err) => {
      console.log(err);
    });
}
fetchData();

const single_doctor = document.querySelector("#container");
single_doctor.addEventListener("click", (e) => {
  // //delete data from the mock api
  e.preventDefault();
  let pressedDelete = e.target.id == "btn_delete";
  const id = e.target.dataset.id;

  if (pressedDelete) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }

  // //edit data from the mock api
  let pressedEdit = e.target.id == "btn_edit";
  const id2 = e.target.dataset.id;
  const edit_btn = document.querySelector("#edit_post");

  if (pressedEdit) {
    //window.location.href = "../views/add_doctor.html";
    const parent = e.target.parentElement;
    const fnameContent = parent.querySelector(".fname").textContent.trim();
    const lnameContent = parent.querySelector(".lname").textContent.trim();
    const emailContent = parent.querySelector(".email").textContent.trim();
    const passwordContent = parent.querySelector(".password").textContent.trim();
    const phoneContent = parent.querySelector(".phone").textContent.trim();
    const cinContent = parent.querySelector(".cin").textContent.trim();

   
    var fnameinput = document.querySelector("#fname_update");
    var lnameinput = document.querySelector("#lname_update");
    var emailinput = document.querySelector("#email_update");
    var passwordinput = document.querySelector("#password_update");
    var phoneinput = document.querySelector("#phone_update");
    var CINinput = document.querySelector("#CIN_update");


    fnameinput.value = fnameContent;
    lnameinput.value = lnameContent;
    emailinput.value = emailContent;
    passwordinput.value = passwordContent;
    phoneinput.value = phoneContent;
    CINinput.value = cinContent;


    edit_btn.addEventListener("click", (e) => {
      e.preventDefault();

      fetch(`${url}/${id2}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: fnameinput.value,
          lastName: lnameinput.value,
          email: emailinput.value,
          password: passwordinput.value,
          CIN: CINinput.value,
          phone: phoneinput.value,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then(() => {
          location.reload();
        });
    });
  }
});

//Adding new data into mock api
const adding_form = document.querySelector(".adding__form");
adding_form.addEventListener("submit", (e) => {
  e.preventDefault();
  //calling DOM element
  let fname = document.getElementById("fname");
  let lname = document.getElementById("lname");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let phone = document.getElementById("phone");
  let cinDoc = document.getElementById("CIN");

  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: fname.value,
      lastName: lname.value,
      email: email.value,
      password: password.value,
      CIN: cinDoc.value,
      phone: phone.value,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      location.reload();
    });
});

function test() {
  edit_btn.style.backgroundColor = "yellow";
  alert("fuuhf");
}
