class Appointment {
  constructor(DateOfAppointment, TimeOfAppointment, Name, ServicesCompleated) {
    this.Name = Name;
    this.DateOfAppointment = DateOfAppointment;
    this.TimeOfAppointment = TimeOfAppointment;
    this.ServicesCompleated = ServicesCompleated;
  }
}


class AppointmentService {
    static url = "https://63bb0bcecf99234bfa50f42b.mockapi.io/users";
    static loadAllAppointments() {
        return $.get(this.url);
    }

    static getInfoFetch() {
        fetch(this.url)
            .then(response => response.json())
            .then((data) => {
                console.log(data[1]);
                let appoint = data[0]
                console.log(appoint)
            })
            
            .catch(err => console.log(err));
    }


    static getAppointment(id) {
        return $.get(this.url + `/${id}`);
    }

    static createAppointment(Name, DateOfAppointment, TimeOfAppointment, ServicesCompleated) {
        return $.post(this.url, Name, DateOfAppointment, TimeOfAppointment, ServicesCompleated);
    }

    static updateAppointment(appointment) {
        return $.ajax({
            url: this.url + `/${appointment.id}`,
            dataType: "json",
            data: JSON.stringify(appointment),
            contentType: "data",
            type: "PUT",
        });
    }
    static deleteAppointment(id) {
        console.log(id);
        return $.ajax({
            url: this.url + "/" + id,
            type: "DELETE",
        });
    }
}  
class DOMManager {

    static appointments;
        
    static loadAllAppointments() {
        AppointmentService.loadAllAppointments().then((appointments) => this.render(appointments));
    }

    static createAppointment(Name, DateOfAppointment, TimeOfAppointment, ServicesCompleated) {
        AppointmentService.createAppointment(new Appointment(Name, DateOfAppointment, TimeOfAppointment, ServicesCompleated)).then(() => {
            let Name = $("#Name").val();
            console.log(Name)
            return AppointmentService.getAllAppointments();
            
        })
            .then((appointments) => this.render(appointments));
        console.log(Name)
    }

    static deleteAppointment(id) {
        console.log(AppointmentService.deleteAppointment);
        AppointmentService.deleteAppointment(id)
            .done(() => {
                return AppointmentService.getAllAppointments();
            })
            .then((appointments) => this.render(appointments));
    }

  static render(appointments) {
    this.appointments = appointments;
    $("#app").empty();
    for (let appointment of appointments)
      $("#app").prepend(
        ` <form class="form-control">
        <div class="card" id="${appointments.id}>
        <div class="card-header">
        <h2>${appointment.Name}</h2>
        <div class="card">${appointment.DateOfAppointment}</div>
        <div class="card">${appointment.TimeOfAppointment}</div>
        <div class="card">${appointment.ServicesCompleated}</div>
        
        <button class="btn btn-danger" onclick="DOMManager.deleteAppointment(${appointment.id})">Delete</button>
        </div>
        </div>
`
      );
console.log(appointments);
    }
  }


$("#create-new-appointment").click(() => {
  AppointmentService.createAppointment($("#Name, #DateOfAppointment, #TimeOfAppointment, #ServicesCompleated"));
    $("#Name, #DateOfAppointment, #TimeOfAppointment, #ServicesCompleated").val();{
        DOMManager.loadAllAppointments();
    }
    
});

AppointmentService.getInfoFetch();
DOMManager.loadAllAppointments();
console.log(AppointmentService.loadAllAppointments());
console.log(AppointmentService.getAppointment(5));

// `<div id="${user._id}" class="card">
//                 <div class="card-header">
//                 <h2>${user.name}</h2>
//                 <button class="btn btn-danger" onclick="DOMManager.deleteAppointment('${Appointment._id}')">Delete</button>
//                 <div class="card-body">
//                 <div class="card">
//                 <div class="row">
//                 <div class="col-sm">
//                 <input type="text" id="${user.id}-users-name" class="form-control" placeholder="Users Name">
//                 <div class="col-sm">
//                 <input type="date" id="${user.id}-users-date" class="form-control"
//                 placeholder="Enter A Date"
//                 </div>
//                 <div class="col-sm">
//                 <input type="time" id="${user.id}-users-time" class="form-control"
//                 placeholder="Enter A Time"
//                 </div>
//                 </div>
//                 <div class="col-sm">
//                 <input type="text" id="${user.id}-services" class="form-control" placeholder="Services">
//                 </div>
//                 </div>
//                 <button id="${user.id}-new-date" onclick="DOMManager.addDate('${user.id}')" class="btn btn-primary form-control">Add</button>
//                 </div>
//                 </div>
//                 </div>
//                 </div> <br>`;
