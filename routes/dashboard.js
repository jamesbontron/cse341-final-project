const routes = require('express').Router();
const dbconnection = require('../model/dbconnection');
const { ObjectId } = require('mongodb');

routes.get('/', (req, res) => {
  //console.log(req.user);
  res.render('dashboard', {
    title: `Welcome to your dashboard ${req.user.firstName}`,
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
  const patientAppointments = dbconnection
    .getAppointment()
    .find({ patientId: req.user._id });
  let listAppointments = '';
  patientAppointments.toArray().then((documents) => {
    const doctors = dbconnection.getUser().find({ role: 'doctor' }).toArray();

    doctors.then((doctor) => {
      for (document of documents) {
        let doctorName = '';
        for (doc of doctor) {
          if (doc._id == document.doctorId) {
            doctorName = doc.displayName;
          }
        }
        listAppointments += `<li><p>Date : ${document.date}</p>
          <p>Hour: ${document.hour}</p>
          <p>Your comments: ${document.patientComments}</p>
          <p>Doctor: ${doctorName}</p>
          <p>Status: ${document.status}</p>
          <a href="/dashboard/manage-appointments/${document._id}">Edit it</a>
          <button type="button" onclick="deleteData('${document._id}')">Delete it</button>
          </li>
          `;
      }

      res.render('manage-appointments', {
        title: 'Manage your appointments',
        listAppointment: listAppointments,
        patientId: req.user._id,
      });
    });
  });
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

      res.render('update-appointment', {
        title: 'Update your appointment',
        updateInputs: selectDisplay,
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
    res.redirect('/');
  });
});

module.exports = routes;
