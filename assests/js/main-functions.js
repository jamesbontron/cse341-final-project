async function postData() {
  let date = document.getElementById("date").value;
  let hour = document.getElementById("hour").value;
  let doctorId = document.getElementById("doctorId").value;
  let patientId = document.getElementById("patientId").value;
  let comments = document.getElementById("patientComments").value;

  data = {
    date: date,
    hour: hour,
    doctorId: doctorId,
    patientId: patientId,
    patientComments: comments,
    status: "pending",
  };
  // Default options are marked with *
  const response = await fetch("/appointment", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response.status);
  if (response.status == 201) {
    window.location.replace("/dashboard");
  } else {
    alert("error adding the appointment");
  }
}

async function putData(id, status) {
  let date = document.getElementById("date").value;
  let hour = document.getElementById("hour").value;
  let doctorId = document.getElementById("doctorId").value;
  let patientId = document.getElementById("patientId").value;
  let comments = document.getElementById("patientComments").value;

  data = {
    date: date,
    hour: hour,
    doctorId: doctorId,
    patientId: patientId,
    patientComments: comments,
    status: status,
  };
  // Default options are marked with *
  const response = await fetch(`/appointment/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response.status);
  if (response.status == 201) {
    window.location.replace("/dashboard/manage-appointments");
  } else {
    alert("error updating the appointment");
  }
}

async function deleteData(id) {
  const urlId = `/appointment/${id}`;
  // Default options are marked with *
  console.log(urlId);
  const response = await fetch(urlId, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  const result = response.json();
  result.then((data) => {
    console.log(data);
  });
  alert("Appointment Deleted!");
  window.location.replace("/dashboard/manage-appointments");
  return result;
}

async function confirmAppointment(id, status) {
  let date = document.getElementById("date").value;
  let hour = document.getElementById("hour").value;
  let doctorId = document.getElementById("doctorId").value;
  let patientId = document.getElementById("patientId").value;
  let comments = document.getElementById("patientComments").value;

  data = {
    date: date,
    hour: hour,
    doctorId: doctorId,
    patientId: patientId,
    patientComments: comments,
    status: status,
  };
  // Default options are marked with *
  const response = await fetch(`/appointment/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response.status);
  if (response.status == 201) {
    window.location.replace("/admin/manage-appointments");
  } else {
    alert("error updating the appointment");
  }
}

async function finishAppointment(id, status) {
  let date = document.getElementById("date").value;
  let hour = document.getElementById("hour").value;
  let doctorId = document.getElementById("doctorId").value;
  let patientId = document.getElementById("patientId").value;
  let comments = document.getElementById("patientComments").value;
  let doctorComments = document.getElementById("doctorComments").value;

  let priceInput = document.getElementById("price");
  let invoiceButton = document.getElementById("invoiceButton");
  let finishButton = document.getElementById("finishButton");

  data = {
    date: date,
    hour: hour,
    doctorId: doctorId,
    patientId: patientId,
    patientComments: comments,
    doctorComments: doctorComments,
    status: status,
  };
  // Default options are marked with *
  const response = await fetch(`/appointment/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(response.status);
  if (response.status == 201) {
    alert("Record Finished");
    priceInput.disabled = false;
    invoiceButton.disabled = false;
    finishButton.disabled = true;
  } else {
    alert("error updating the appointment");
  }
}
