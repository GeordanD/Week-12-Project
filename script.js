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
            // .then((data) => {
            //     console.log(data[1]);
            //     let appoint = data[0]
            //     console.log(appoint)
            // })
            
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
            return AppointmentService.LoadAllAppointments();
            
        })
            
            .then((appointments) => this.render(appointments));
    }

    static deleteAppointment(id) {
        console.log(AppointmentService.deleteAppointment);
        AppointmentService.deleteAppointment(id)
            .done(() => {
                return AppointmentService.loadAllAppointments();
            })
            .then((appointments) => this.render(appointments))
            .done(() => {
                return DOMManager.LoadAllAppointments();
        })

    }

  static render(appointments) {
      this.appointments = appointments;
      fetch("https://63bb0bcecf99234bfa50f42b.mockapi.io/users");
    $("#app").empty();
    for (let appointment of appointments)
      $("#app").prepend(
        ` 
        
        <div class="card  bg-dark text-danger" id="${appointments.id}>
        <div id="name" class="card-header">
        <h2>${appointment.Name}</h2>
        <div id="date" class="card bg-info text-dark">Date: ${appointment.DateOfAppointment}</div>
        <div id="time" class="card bg-info text-dark">Time: ${appointment.TimeOfAppointment}</div>
        <div id="service" class="card bg-info text-dark">Service: ${appointment.ServicesCompleated}</div>
        
        <button id="delete-btn" class="btn btn-danger" onclick="DOMManager.deleteAppointment(${appointment.id}), refreshPage();">Delete</button>
        </div>
        </div>

`
      );
console.log(appointments);
    }
  }
function refreshPage() {
    window.location.reload();
}

$("#delete-btn").click(() => {
    DOMManager.loadAllAppointments(), refreshPage();
})

$("#create-new-appointment").click(() => {
  AppointmentService.createAppointment($("#Name, #DateOfAppointment, #TimeOfAppointment, #ServicesCompleated"));
    $("#Name, #DateOfAppointment, #TimeOfAppointment, #ServicesCompleated").val();{
        DOMManager.loadAllAppointments();
    };
TODO// fix loading issue after button is pressed to make appointment..
    
});

AppointmentService.getInfoFetch();
DOMManager.loadAllAppointments();
console.log(AppointmentService.loadAllAppointments());
// console.log(AppointmentService.getAppointment());

