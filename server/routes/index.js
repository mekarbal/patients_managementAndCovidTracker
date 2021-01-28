var express = require("express");
var router = express.Router();
const Patient = require("../model/Patient");
const File = require("../model/file");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");
const winston = require("winston");
/* GET home page. */
router.get("/", function (req, res, next) {
  // res.status(200).json({
  //   message: 'ok'
  // })
  res.render("index");
});

today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //As January is 0.
var yyyy = today.getFullYear();
var HH = today.getHours();
var MN = today.getMinutes();
var SC = today.getSeconds();

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/allLogs.log",
    }),
  ],
};
const loggger = winston.createLogger(logConfiguration);
// loggger.log({
//   message: "hello, Karbal",
//   level: ["info"],
//   Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
//   http: "127.0.0.1:" + 3000 + "/Home",
// });
// DONE
router.post("/add", (req, res) => {
  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cin: req.body.cin,
    email: req.body.email,
    phone: req.body.phone,
  });

  patient
    .save()
    .then((doc) => {
      res.status(200).json({
        message: doc._id,
      });
      loggger.log({
        message: req.body.firstName + " Created",
        level: ["info"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/add",
      });
    })
    .catch((err) => {
      res.status(404).json({
        messsage: err,
      });
      loggger.log({
        message: err,
        level: ["error"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/add",
      });
    });
});
// DONE
router.post("/id", (req, res) => {
  let file = {
    patient: req.body.id,
    question: req.body.question,
  };

  File.find({ patient: req.body.id })
    .then((doc) => {
      if (doc.length > 0) {
        File.updateOne({ patient: req.body.id }, { $set: file })
          .then((doc) => {
            res.status(200).json({
              message: doc,
            });
            loggger.log({
              message: "update file of " + req.body.id,
              level: ["info"],
              Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
              http: "127.0.0.1:" + 3000 + "/id",
            });
          })
          .catch((err) => {
            res.status(404).json({
              message: err,
            });
            loggger.log({
              message: err,
              level: ["error"],
              Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
              http: "127.0.0.1:" + 3000 + "/id",
            });
          });
      } else {
        file = new File({
          patient: req.body.id,
          question: req.body.question
        });
        file
          .save()
          .then((doc) => {
            res.status(200).json({
              message: doc,
            });
            loggger.log({
              message: "New file created with patient id=  " + req.body.id,
              level: ["info"],
              Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
              http: "127.0.0.1:" + 3000 + "/id",
            });
          })
          .catch((err) => {
            res.status(404).json({
              message: err,
            });
            loggger.log({
              message: "New file created with patient id=  " + req.body.id,
              level: ["error"],
              Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
              http: "127.0.0.1:" + 3000 + "/id",
            });
          });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
      loggger.log({
        message: err,
        level: ["error"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/id",
      });
    });
});

// router.get("/all/:id", (req, res) => {
//   File.findOne({ patient: req.params.id })
//     .populate("patient")
//     .sort({ date: -1 })
//     .then((doc) => {
//       res.status(200).json({
//         data: doc,
//       });
//       loggger.log({
//         message: "search with patient id",
//         level: ["info"],
//         Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
//         http: "127.0.0.1:" + 3000 + "/all/" + req.params.id,
//       });
//     })
//     .catch((err) => {
//       res.status(404).json({
//         message: err,
//       });
//       loggger.log({
//         message: err,
//         level: ["error"],
//         Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
//         http: "127.0.0.1:" + 3000 + "/all/" + req.params.id,
//       });
//     });
// });
router.get("/test/:cin", (req, res) => {
  Patient.aggregate([
    { $match: { cin: req.params.cin } },

    {
      $lookup: {
        from: "files",
        localField: "_id",
        foreignField: "patient",

        as: "test",
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 1 },
  ])
    .then((doc) => {
      res.status(200).send(doc[0]);
      loggger.log({
        message: "search with patient cin",
        level: ["info"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/test/" + req.params.cin,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
      loggger.log({
        message: err,
        level: ["error"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/all/" + req.params.cin,
      });
    });
});

router.patch("/addresult", (req, res) => {
  const file = {
    result: req.body.result,
  };
  File.updateOne({ _id: req.body.id }, { $set: file })
    .then((doc) => {
      res.status(200).send(doc);
      loggger.log({
        message: "update result",
        level: ["info"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/addresult",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
      loggger.log({
        message: err,
        level: ["error"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/addresult",
      });
    });
});

router.post("/exportpdf", (req, res) => {
  console.log(req.body)
      const pdf = new PDFDocument();
      pdf.pipe(fs.createWriteStream("pdfExport/" + req.body.cin+ ".pdf"));
      pdf
        .fontSize(25)
        .text("Resultat de test covid-19", { align: "center" })
        .text("*******************************")
        .text("nom : " + req.body.firstName, { align: "left" })
        .text("prenom : " + req.body.lastName, { align: "left" })
        .text("cin : " + req.body.cin, { align: "left" })
        .text("email : " + req.body.email, { align: "left" })
        .text("telephone : " + req.body.phone, { align: "left" })
        .text("Les symptômes de la maladie :", { align: "left" })
        .list(req.body.question)
        .text("*******************************", { align: "left" })
        .text("*******************************", { align: "left" })
        .text("*******************************", { align: "left" })
        .text("resultat de test : " + req.body.result, { align: "left" });
      pdf.end();
      res.status(200).json({
        message: "file exported",
      });
      loggger.log({
        message: "Pdf created successfully",
        level: ["info"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/addresult",
      });
    })
    
     


router.post("/sendmail", (req, res) => {
  const output = `<h2>cas urgent</h2>
  <h3>les information de patient </h3>
  <ul>
  <li>nom : ${req.body.firstName}</li>
  <li>prenom : ${req.body.lastName}</li>
  <li>cin : ${req.body.cin}</li>
  <li>email : ${req.body.email}</li>
  <li>telephone : ${req.body.phone}</li>
  <li>Les symptômes de la maladie<ul>
  <li>${req.body.question}</li>
  </ul>
  </li>
  <li><h3>reslutat de test est : ${req.body.result}</h3></li>
  </ul>`;
  const sendTo = "hamoda.abdo@outlook.fr";
  sendMali(output, sendTo).then((send) => {
    res.status(200).json({
      message: "email sended",
    });
    loggger.log({
      message: "send Mail successfully",
      level: ["info"],
      Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
      http: "127.0.0.1:" + 3000 + "/sendmail",
    });
  });
});

async function sendMali(output, sendTo) {
  try {
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "gmail", // generated ethereal user
        pass: "password", // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"cas urgent" <centre.test@safi.com>', // sender address
      to: sendTo, // list of receivers
      subject: "warning ✔", // Subject line
      text: "resultat de test ", // plain text body
      html: output, // html body
    });
  } catch (error) {
    console.log(error);
    loggger.log({
      message: error,
      level: ["error"],
      Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
      status: 500,
    });
  }
}

router.get("/lastid", (req, res) => {
  Patient.findOne()
    .sort({ _id: -1 })
    .select("_id cin")
    .then((doc) => {
      res.status(200).json({
        message: doc,
      });
      loggger.log({
        message: "get last id",
        level: ["info"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/lastid",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
      loggger.log({
        message: err,
        level: ["error"],
        Date: dd + "/" + mm + "/" + yyyy + " " + HH + ":" + MN + ":" + SC,
        http: "127.0.0.1:" + 3000 + "/lastid",
      });
    });
});

module.exports = router;
