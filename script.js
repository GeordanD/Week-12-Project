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

    static createAppointment(Name, DateOfAppointment, TimeOfAppointment, ServicesCompleated) {
        return $.post(this.url, Name, DateOfAppointment, TimeOfAppointment, ServicesCompleated);
    }

    static deleteAppointment(id) {
        console.log(id);
         return $.ajax({
            url: this.url + `/${id}`,
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
            return AppointmentService.loadAllAppointments();
            
        })
    }

    static deleteAppointment(id) {
        console.log(AppointmentService.deleteAppointment);
        AppointmentService.deleteAppointment(id)
            .done(() => {
                return AppointmentService.loadAllAppointments();
            })
            .then((appointments) => this.render(appointments));
    }

    static render(appointments) {
        this.appointments = appointments;
        fetch("https://63bb0bcecf99234bfa50f42b.mockapi.io/users");
        $("#app").empty();
        for (let appointment of appointments) {
            $("#app").prepend(
                ` 
        
        <div class="card  bg-dark text-danger" id="${appointments.id}>
        <div id="name" class="card-header">
        <h3>${appointment.Name}</h3>
        <div id="date" class="card bg-info text-dark">Date: ${appointment.DateOfAppointment}</div>
        <div id="time" class="card bg-info text-dark">Time: ${appointment.TimeOfAppointment}</div>
        <div id="service" class="card bg-info text-dark">Service: ${appointment.ServicesCompleated}</div>
        
        <button id="delete-btn" class="btn btn-danger" onclick="DOMManager.deleteAppointment(${appointment.id}), refreshPage();">Delete</button>
        </div>
        </div>
`);
            console.log(appointment);
        }
    }
  }
function refreshPage() {
    window.location.reload();
}

$("#create-new-appointment").click(() => {
  AppointmentService.createAppointment($("#Name, #DateOfAppointment, #TimeOfAppointment, #ServicesCompleated"));
    $("#Name, #DateOfAppointment, #TimeOfAppointment, #ServicesCompleated").val("");
});


DOMManager.loadAllAppointments();





