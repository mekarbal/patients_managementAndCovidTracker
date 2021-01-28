
async function reload(e) {
    e.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value
    let cin = document.getElementById('cin').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    form = {
        firstName: firstName,
        lastName: lastName,
        cin: cin,
        phone: phone,
        email: email
    }
    console.log(form)

    try {
        await axios.post('http://localhost:8080/add', form)
    } catch (error) {
        console.log(error);
    }
    await getLastIserted();

}

async function getLastIserted() {
    try {
        var id = await axios.get('http://localhost:8080/lastid')
        var data = {
            id: id.data.message._id,
            cin: id.data.message.cin
        }
        localStorage.setItem('dataLocal', JSON.stringify(data));
        var storage = JSON.parse(localStorage.getItem('dataLocal')).cin;

        console.log(storage);
        window.location.href = "patient.html"

    } catch (error) {
        console.log(error);
    }
}

// console.log(localStorage.getItem('id'))
var qustion = [];
async function getPatientInfo(e) {
    e.preventDefault();
    let cin = document.getElementById('cin').value;
    body = { cin: cin };
    console.log(body)
    try {
        await axios.get('http://localhost:8080/test/' + cin)
            .then(res => {
                console.log(res.data)
                let data = res.data;
                if (data) {
                    console.log(data.test[0].date)
                    qustion = data.test[0].question;
                    document.getElementById('display').innerHTML = showData(data)
                    document.getElementById('result').innerHTML = data.test[0].result
                    document.getElementById('qu').innerHTML = "";
                    ArrayLooping(data.test[0].question)
                    var result = document.getElementById('result').innerHTML;
                    if (result === "positif") {
                        document.getElementById('sendMail').style.display = "block";
                        document.getElementById('result').innerHTML =  data.test[0].result ;
                    } else if (result === "negatif") {
                        document.getElementById('sendMail').style.display = "none";
                        document.getElementById('result').innerHTML = data.test[0].result;
                    }else {
                        document.getElementById('sendMail').style.display = "none";
                        document.getElementById('result').innerHTML = "";

                    }
                    document.getElementById('select').style.display = "block";
                    document.getElementById('pdf').style.display = "block";
                    document.getElementById('saveResult').style.display = "block";
                    var vide = document.getElementsByClassName('empty');
                    for (let i = 0; i < vide.length; i++) {
                        vide[i].style.display = "block"
                        
                    }
                    


                } else {
                    document.getElementById('display').innerHTML = "CIN not found";
                    // document.getElementById('result').innerHTML = "";
                    // document.getElementById('qu').innerHTML = "";
                    var vide = document.getElementsByClassName('empty');
                    for (let i = 0; i < vide.length; i++) {
                        vide[i].style.display = "none"
                        
                    }
                    document.getElementById('sendMail').style.display="none"
                }
            })

    } catch (error) {
        console.log(error)
    }
    console.log(qustion)
}


// display data from axios res in interface 
function showData(res) {
    let output = `
      <br>
      <h1>Patient Information</h1>
      <hr style="background-color: wheat;">
      <h4 id="firstName">${res.firstName}</h4>
      <h4 id="lastName">${res.lastName}</h4>
      <h4 id="cin1">${res.cin}</h4>
      <h4 id="email">${res.email}</h4>
      <h4 id="phone">${res.phone}</h4>
      <input id="ficheId" type="hidden" value="${res.test[0]._id}">
      
      `;
    return output
    //   <h4 >${res.test[0].result}</h4>
}

// function for make a loop inside array question 
function ArrayLooping(arr) {
    for (let i = 0; i < arr.length; i++) {
        var element = arr[i];
        document.getElementById('qu').innerHTML = document.getElementById('qu').innerHTML + `<h4>${element}</h4>`;
    }
}

// save result 
async function saveResult(e) {
    e.preventDefault();
    let id = document.getElementById('ficheId').value;
    let result = document.getElementById('select').value;
    body = { id: id, result: result }
    console.log(id + result)
    await axios.patch('http://localhost:8080/addresult', body)
        .then(getPatientInfo(e))
        .catch(error => { console.ArrayLooping(error) })
}

// export pdf 
async function pdfExport(e) {
    e.preventDefault();
    let firstName = document.getElementById('firstName').innerHTML;
    let lastName = document.getElementById('lastName').innerHTML;
    let cin = document.getElementById('cin1').innerHTML;
    let email = document.getElementById('email').innerHTML;
    let phone = document.getElementById('phone').innerHTML;
    let result = document.getElementById('result').innerHTML;


    body = { firstName: firstName, lastName: lastName, cin: cin, email: email, phone: phone, question: qustion, result: result }
    console.log(body)
    await axios.post('http://localhost:8080/exportpdf', body)
        .then(
            document.getElementById('message').innerHTML = "PDF a ete exporte"

        )
        .catch(error => {
            console.log(error)
        })
    var openPdf = '../../../server/pdfExport/' + cin + '.pdf';
    setTimeout(function () { window.open(openPdf); }, 2000)
}
// send mail
async function send(e) {
    e.preventDefault();
    let firstName = document.getElementById('firstName').innerHTML;
    let lastName = document.getElementById('lastName').innerHTML;
    let cin = document.getElementById('cin1').innerHTML;
    let email = document.getElementById('email').innerHTML;
    let phone = document.getElementById('phone').innerHTML;
    let result = document.getElementById('result').innerHTML;
    body = { firstName: firstName, lastName: lastName, cin: cin, email: email, phone: phone, question: qustion, result: result }
    console.log(body)
    await axios.post('http://localhost:8080/sendmail', body)
        .then(
            document.getElementById('message').innerHTML = "email envoiyer"
        )
        .catch(error => {
            console.log(error)
        })
}

document.getElementById('localId').value = JSON.parse(localStorage.getItem('dataLocal')).id
document.getElementById('localCin').value = JSON.parse(localStorage.getItem('dataLocal')).cin

// console.log(localStorage.getItem('id'))
async function saveQu(e) {
    var yourArray = [];
    e.preventDefault();
    $("input:checkbox[name=checkData]:checked").each(function () {
        yourArray.push($(this).val());
    });
    let id = document.getElementById('localId').value;

    form = { id: id, question: yourArray }

    try {
        await axios.post('http://localhost:8080/id', form)
    } catch (error) {
        console.log(error);
    }
    localStorage.removeItem("dataLocal");
    window.location.href = "result.html"
}