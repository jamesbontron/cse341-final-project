const routes = require('express').Router();
const dbconnection = require('../model/dbconnection');
const { ObjectId } = require('mongodb');

routes.get('/', (req, res) => {
  //console.log(req.user);
  res.render('admin-dashboard', {
    title: `Welcome to your admin dashboard ${req.user.firstName}`,
    name: req.user.displayName,
    image: req.user.image,
    role: req.user.role,
  });
});

routes.get('/add-appointment', (req, res) => {
  const doctors = dbconnection.getUser().find({ role: 'doctor' });
  let selectDisplay = '<select name="doctorId" id="doctorId">';
  doctors.toArray().then((documents) => {
    for (document of documents) {
      selectDisplay += `<option value="${document._id}">${document.displayName}</option>`;
    }
    selectDisplay += '</select>';
    res.render('add-form', {
      title: 'Add an appointment',
      select: selectDisplay,
      patientId: req.user._id,
    });
  });
});

routes.get('/manage-appointments', (req, res) => {
  if (req.user.role === 'doctor') {
    const patientAppointments = dbconnection
      .getAppointment()
      .find({ doctorId: req.user._id });
    let listAppointments = '';
    patientAppointments.toArray().then((documents) => {
      const patients = dbconnection.getPatient().find().toArray();

      patients.then((patient) => {
        for (document of documents) {
          let patientName = '';
          for (pat of patient) {
            if (pat._id == document.patientId) {
              patientName = pat.displayName;
            }
          }
          listAppointments += `<li><p>Date : ${document.date}</p>
          <p>Hour: ${document.hour}</p>
          <p>Patient comments: ${document.patientComments}</p>
          <p>Patient: ${patientName}</p>
          <p>Status: ${document.status}</p>
          <a href="/admin/manage-appointments/${document._id}">Edit it</a>
          <button type="button" onclick="deleteData('${document._id}')">Delete it</button>
          </li>
          `;
        }

        res.render('manage-appointments', {
          title: 'Manage your appointments',
          listAppointment: listAppointments,
          doctorId: req.user._id,
        });
      });
    });
  }
});

routes.get('/manage-appointments/:id', (req, res) => {
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
    const doctors = dbconnection.getUser().find({ role: 'doctor' });
    let selectDisplay = '<select name="doctorId" id="doctorId">';
    doctors.toArray().then((doctor) => {
      for (doc of doctor) {
        selectDisplay += `<option value="${doc._id}"`;
        if (doc._id == appointment.doctorId) {
          selectDisplay += `selected`;
        }
        selectDisplay += `>${doc.displayName}</option>`;
      }
      selectDisplay += '</select>';
      let updateForm = `<label for='date'>Date: </label>
      <input type='date' name='date' id='date' value=${appointment.date} required /><br />
      <label for='hour'>Hour: </label>
      <input type='time' name='hour' id='hour' value=${appointment.hour} required /><br />
      <label for='doctorId'>Doctor: </label>`;
      updateForm += `${selectDisplay}`;
      updateForm += `
      <br />
      <textarea
        name='patientComments'
        id='patientComments'
        cols='30'
        rows='10'
        required
      >${appointment.patientComments}</textarea>
      <input type='hidden' name='patientId' id='patientId' value=${appointment.patientId} />
      <button type='button' onclick="putData('${appointment._id}')">Update Appointment</button>`;
      res.render('update-appointment', {
        title: 'Update your appointment',
        updateInputs: updateForm,
        patientId: req.user._id,
      });
    });
  });
});

routes.get('/logout', (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/admin');
  });
});

module.exports = routes;
