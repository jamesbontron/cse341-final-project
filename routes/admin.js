const routes = require("express").Router();
const dbconnection = require("../model/dbconnection");
const { ObjectId } = require("mongodb");

routes.get("/", (req, res) => {
  //console.log(req.user);
  res.render("admin-dashboard", {
    title: `Welcome to your admin dashboard ${req.user.firstName}`,
    name: req.user.displayName,
    image: req.user.image,
    role: req.user.role,
  });
});

routes.get("/add-appointment", (req, res) => {
  const doctors = dbconnection.getUser().find({ role: "doctor" });
  let selectDisplay = '<select name="doctorId" id="doctorId">';
  doctors.toArray().then((documents) => {
    for (document of documents) {
      selectDisplay += `<option value="${document._id}">${document.displayName}</option>`;
    }
    selectDisplay += "</select>";
    res.render("add-form", {
      title: "Add an appointment",
      select: selectDisplay,
      patientId: req.user._id,
    });
  });
});

routes.get("/manage-appointments", (req, res) => {
  if (req.user.role === "doctor") {
    const patientAppointments = dbconnection
      .getAppointment()
      .find({ doctorId: req.user._id });
    let listAppointments = "";
    patientAppointments.toArray().then((documents) => {
      const patients = dbconnection.getPatient().find().toArray();

      patients.then((patient) => {
        for (document of documents) {
          let patientName = "";
          for (pat of patient) {
            if (pat._id == document.patientId) {
              patientName = pat.displayName;
            }
          }
          listAppointments += `<li><p>Date : ${document.date}</p>
          <p>Hour: ${document.hour}</p>
          <p>Patient: ${patientName}</p>
          <p>Patient comments: ${document.patientComments}</p>
          <p>Status: ${document.status}</p>`;

          if (document.status === "Confirmed") {
            listAppointments += `<a href="/admin/attend-appointments/${document._id}">Attend or Treat</a>`;
          } else if (document.status === "Finished") {
            listAppointments += `
            <p>Your comments: ${document.doctorComments}</p>
            <a href="/admin/invoice/${document._id}">Invoice</a>`;
          } else {
            listAppointments += `<a href="/admin/manage-appointments/${document._id}">Confirm or Cancel</a>
            <button type="button" onclick="deleteData('${document._id}')">Delete it</button>`;
          }

          listAppointments += `
          
          </li>
          `;
        }

        res.render("manage-appointments", {
          title: "Manage your appointments",
          listAppointment: listAppointments,
          doctorId: req.user._id,
        });
      });
    });
  } else if (req.user.role === "administrative") {
    res.send("Not finished");
  }
});

routes.get("/manage-appointments/:id", (req, res) => {
  const passedId = req.params.id;
  /*if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }*/
  const appointmentId = new ObjectId(passedId);

  const appointment = dbconnection
    .getAppointment()
    .findOne({ _id: appointmentId });

  appointment.then((appointment) => {
    const patients = dbconnection.getPatient().find().toArray();
    let patientDisplay = ``;
    patients.then((patient) => {
      for (pat of patient) {
        if (pat._id == appointment.patientId) {
          patientDisplay += `<label for="patientId">Patient: ${pat.displayName}</label>`;
        }
      }
      let updateForm = `<label for='date'>Date: </label>
      <input type='date' name='date' id='date' value=${appointment.date} disabled /><br />
      <label for='hour'>Hour: </label>
      <input type='time' name='hour' id='hour' value=${appointment.hour} disabled /><br />
      `;
      updateForm += `${patientDisplay}`;
      updateForm += `
      <br />
      <textarea
        name='patientComments'
        id='patientComments'
        cols='30'
        rows='10'
        disabled
      >${appointment.patientComments}</textarea><br>
      <input type='hidden' name='patientId' id='patientId' value=${appointment.patientId} />
      <input type="hidden" name="doctorId" id="doctorId" value="${appointment.doctorId}" />
      <button type='button' onclick="confirmAppointment('${appointment._id}', 'Confirmed')">Confirm</button>
      <button type='button' onclick="confirmAppointment('${appointment._id}', 'Canceled')">Cancel</button>`;
      res.render("update-appointment", {
        title: "Update your appointment",
        updateInputs: updateForm,
      });
    });
  });
});

routes.get("/attend-appointments/:id", (req, res) => {
  const passedId = req.params.id;
  /*if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }*/
  const appointmentId = new ObjectId(passedId);

  const appointment = dbconnection
    .getAppointment()
    .findOne({ _id: appointmentId });

  appointment.then((appointment) => {
    const patients = dbconnection.getPatient().find().toArray();
    let patientDisplay = ``;
    patients.then((patient) => {
      for (pat of patient) {
        if (pat._id == appointment.patientId) {
          patientDisplay += `<label for="patientId">Patient: ${pat.displayName}</label>`;
        }
      }
      let updateForm = `<label for='date'>Date: </label>
      <input type='date' name='date' id='date' value=${appointment.date} disabled /><br />
      <label for='hour'>Hour: </label>
      <input type='time' name='hour' id='hour' value=${appointment.hour} disabled /><br />
      `;
      updateForm += `${patientDisplay}`;
      updateForm += `
      <br />
      <textarea
        name='patientComments'
        id='patientComments'
        cols='30'
        rows='10'
        disabled
      >${appointment.patientComments}</textarea><br>
      <textarea
        name='doctorComments'
        id='doctorComments'
        cols='30'
        rows='10'
        placeholder='Attention comments'
      ></textarea><br />
      <input type='hidden' name='patientId' id='patientId' value=${appointment.patientId} />
      <input type="hidden" name="doctorId" id="doctorId" value="${appointment.doctorId}" />
      <button type='button' id='finishButton' onclick="finishAppointment('${appointment._id}', 'Finished')">
      Finish Appointment</button><br />
      <label for='price'>Price:</label>
      <input type='number' name='price' id='price' disabled><br /> 
      <button type='button' id='invoiceButton'
      onclick='generateInvoice(
      "${appointment._id}",
      "${appointment.patientId}",
      "${appointment.doctorId}",
      "${appointment.date}",
      "${appointment.hour}"
      )' disabled>Generate Invoice</button>
      `;
      res.render("update-appointment", {
        title: "Medical Attention",
        updateInputs: updateForm,
      });
    });
  });
});

routes.get("/invoice/:appointmentId", (req, res) => {
  const appointmentId = req.params.appointmentId;

  console.log(appointmentId);

  const invoice = dbconnection
    .getInvoice()
    .findOne({ appointmentId: appointmentId });

  invoice.then((document) => {
    console.log(document);
    const doctorId = new ObjectId(document.doctorId);
    const patientId = new ObjectId(document.patientId);
    const doctor = dbconnection.getUser().findOne({ _id: doctorId });
    const appointmentDate = `Date: ${document.date} - Hour: ${document.hour}`;
    doctor.then((doc) => {
      const patient = dbconnection.getPatient().findOne({ _id: patientId });

      patient.then((pat) => {
        let appointmentInfo = `
          <p>Doctor: ${doc.displayName}<br />
          Patient: ${pat.displayName}</p>
          <p>Comments: ${document.doctorComments}</p>
          <p>Price: $${document.price}  
        `;

        res.render("invoice", {
          title: "Medical Invoice",
          appointmentDate: appointmentDate,
          appointmentInfo: appointmentInfo,
        });
      });
    });
  });
});

routes.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/admin");
  });
});

module.exports = routes;
