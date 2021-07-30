function login() {

    console.log("logging in...");

    let un = document.getElementById("usern").value;
    let pw = document.getElementById("pw").value;
    

    console.log(un);
    console.log(pw);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 & this.status == 200) {
            
            employee = JSON.parse(this.responseText)
            localStorage.setItem("EId", employee.EId)
            localStorage.setItem("name", employee.name)

            console.log(employee)
            console.log(localStorage.getItem('EId'))
            if (employee.username){

                targList = document.getElementsByClassName("hide");
                document.getElementsByClassName("hide")
                if (targList) {
                  for (let x = 0; x < targList.length; x++) {
                    targList[x].style.visibility = "visible";
                  }

                }
                let info =
                     `<h3>Welcome ${employee.name}</h3>`
                     document.getElementById("welcome").innerHTML = info;



            } else {alert("Incorrect Username or Password!");}
        }
    }

    url = "http://localhost:7000/employees?username=" + un + "&password=" + pw
    xhr.open("GET", url, true);
    xhr.send();
}

function submitForm() {



    console.log("submitting form...");

    let date1 = document.getElementById("date1").value;
    let date2 = document.getElementById("date2").value;
    let location = document.getElementById("location").value;
    let description = document.getElementById("description").value;
    let cost = document.getElementById("cost").value;
    let grading_format = document.getElementById("grading_format").value;
    let event_type = document.getElementById("event_type").value;
    let reason = document.getElementById("reason").value;
    let approval = document.getElementById("attachment").value;
    let attachment = document.getElementById("attachment2").value;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            if (JSON.parse(this.responseText)) {
                document.getElementById("success").innerHTML = "Form Successfully sent!"
            } else {
                document.getElementById("success").innerHTML = "Form un-successfully sent!"
            }
        } else if (this.readyState == 4) {
            document.getElementById("success").innerHTML = "Request was not successfully processed!"
        }

    }


    let url = "http://localhost:7000/reimbursements";
    xhttp.open("POST", url, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');

    
    let reimbursement = {
    employees: employee,
    events: {
        evId: 1,
        eventTypes: {
            etId: 1,
            eventType: event_type,
            percent: 90
        },
        gradingFormats: {
            gfId: 1,
            gradingFormat: grading_format,
            description: "the standard letter grade"
        },
        startTime: 0,
        endTime: 0,
        cost: cost,
        location: location,
        description: description
    },
    claim: cost,
    grade: "",
    reason: reason,
    SApproved: false,
    depHeadApproved: false,
    benCoApproved: false
    }
    //The optional argument in the send() method allows us to provide a body.
    xhttp.send(JSON.stringify(reimbursement));


}