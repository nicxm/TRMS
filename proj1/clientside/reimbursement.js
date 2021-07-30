function getForms() {

    console.log("getting forms...");

    employeeID = parseInt(localStorage.getItem('EId'))
    console.log(employeeID);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 & this.status == 200) {
            
            reimbursements = JSON.parse(this.responseText)
            reimbursementIndex = 0;         

            console.log(reimbursements[reimbursementIndex])
            
            populateResult(reimbursements)
            }
        }

    url = "http://localhost:7000/reimbursements"
    xhr.open("GET", url, true);
    xhr.send();
}

// check if local emp id is == to the reimbursements supervisor id
function getFormsToApproveBySupervisor() {

    console.log("getting forms...");

    employeeID = parseInt(localStorage.getItem('EId'))
    console.log(employeeID);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 & this.status == 200) {
            
            reimbursementsToApprove = JSON.parse(this.responseText)
            reimbursementsToApproveIndex = 0;         

            console.log(reimbursementsToApprove[reimbursementsToApproveIndex])

            populateApprovalSupervisorResult(reimbursementsToApprove)
            }
        }

    url = "http://localhost:7000/reimbursements"
    xhr.open("GET", url, true);
    xhr.send();
}

// check if local emp id is == to the reimbursements benco id
function getFormsToApproveByBenCo() {

    console.log("getting forms...");

    employeeID = parseInt(localStorage.getItem('EId'))
    console.log(employeeID);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 & this.status == 200) {
            
            reimbursementsToApprove = JSON.parse(this.responseText)
            reimbursementsToApproveIndex = 0;         

            console.log(reimbursementsToApprove[reimbursementsToApproveIndex])

            populateApprovalBenCoResult(reimbursementsToApprove)
            }
        }

    url = "http://localhost:7000/reimbursements"
    xhr.open("GET", url, true);
    xhr.send();
}

// check if local emp name is == to the reimbursements dept head name
function getFormsToApproveByDeptHead() {

    console.log("getting forms...");

    employeeID = parseInt(localStorage.getItem('EId'))
    employeeName = localStorage.getItem('name')
    console.log(employeeID);
    console.log(employeeName);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (this.readyState == 4 & this.status == 200) {
            
            reimbursementsToApprove = JSON.parse(this.responseText)
            reimbursementsToApproveIndex = 0;         

            console.log(reimbursementsToApprove[reimbursementsToApproveIndex])

            populateApprovalDeptHeadResult(reimbursementsToApprove)
            }
        }

    url = "http://localhost:7000/reimbursements"
    xhr.open("GET", url, true);
    xhr.send();
}

function getNextForm() {
    reimbursementIndex++;
    if (reimbursementIndex < reimbursements.length) {
    console.log(reimbursements[reimbursementIndex]);
    populateResult(reimbursements)
    } else {console.log("No more forms in list")}
}

function getPreviousForm() {
    reimbursementIndex--;
    if (reimbursementIndex < reimbursements.length && reimbursementIndex >= 0) {
    console.log(reimbursements[reimbursementIndex]);
    populateResult(reimbursements)
    } else {console.log("No more forms in list")}

}

function addGrade() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            if (JSON.parse(this.responseText)) {
                document.getElementById("success").innerHTML = "Grade Successfully sent!"
            } else {
                document.getElementById("success").innerHTML = "Grade un-successfully sent!"
            }
        } else if (this.readyState == 4) {
            document.getElementById("success").innerHTML = "Request was not successfully processed!"
        }

    }


    let url = "http://localhost:7000/reimbursements/" + reimbursements[reimbursementIndex].RId;
    xhttp.open("PUT", url, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');

    let grade = document.getElementById("grade").value;
    reimbursements[reimbursementIndex].grade = grade;

    //The optional argument in the send() method allows us to provide a body.
    xhttp.send(JSON.stringify(reimbursements[reimbursementIndex]));

}

function populateResult(reimbursements) {

    for (reimbursementIndex; reimbursementIndex < reimbursements.length; reimbursementIndex++) {
        if (reimbursements[reimbursementIndex].employees.EId === employeeID) {
            let info =
                `<h3>Supervisor Approval: ${reimbursements[reimbursementIndex].SApproved}</h3>
                 <h3>Benefit Coordinator Approval: ${reimbursements[reimbursementIndex].benCoApproved}</h3>
                 <h3>Supervisor Approval: ${reimbursements[reimbursementIndex].depHeadApproved}</h3>
                 <h3>Cost: ${reimbursements[reimbursementIndex].claim}</h3>
                 <h3>Event Description: ${reimbursements[reimbursementIndex].events.description}</h3>
                 <h3>Location: ${reimbursements[reimbursementIndex].events.location}</h3>
                 <h3>Grade: ${reimbursements[reimbursementIndex].grade}</h3>
                 <h3>Reason: ${reimbursements[reimbursementIndex].reason}</h3>
                `;

                document.getElementById("form").innerHTML = info;

            break;
        }

    }

}

function populateApprovalSupervisorResult(reimbursementsToApprove) {


    for (reimbursementsToApproveIndex; reimbursementsToApproveIndex < reimbursementsToApprove.length; reimbursementsToApproveIndex++) {
        if (reimbursementsToApprove[reimbursementsToApproveIndex].SApproved == false) {
        try {
        if (reimbursementsToApprove[reimbursementsToApproveIndex].employees.employeesBySupervisorId.EId == employeeID) {
            let info =
                `<h3>Supervisor Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].SApproved}</h3>
                 <h3>Benefit Coordinator Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].benCoApproved}</h3>
                 <h3>Supervisor Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].depHeadApproved}</h3>
                 <h3>Cost: ${reimbursementsToApprove[reimbursementsToApproveIndex].claim}</h3>
                 <h3>Event Description: ${reimbursementsToApprove[reimbursementsToApproveIndex].events.description}</h3>
                 <h3>Location: ${reimbursementsToApprove[reimbursementsToApproveIndex].events.location}</h3>
                 <h3>Grade: ${reimbursementsToApprove[reimbursementsToApproveIndex].grade}</h3>
                 <h3>Reason: ${reimbursementsToApprove[reimbursementsToApproveIndex].reason}</h3>
                `;

                document.getElementById("formToApprove").innerHTML = info;
                supervisor = true;
            break;
        }
    } catch(error) {
        continue
    }
        }
    }

}

function populateApprovalBenCoResult(reimbursementsToApprove) {

    for (reimbursementsToApproveIndex; reimbursementsToApproveIndex < reimbursementsToApprove.length; reimbursementsToApproveIndex++) {
        if (reimbursementsToApprove[reimbursementsToApproveIndex].benCoApproved == false) {
        try {
        if (reimbursementsToApprove[reimbursementsToApproveIndex].employees.employeesByBenCoId.EId == employeeID) {
            let info =
                `<h3>Supervisor Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].SApproved}</h3>
                 <h3>Benefit Coordinator Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].benCoApproved}</h3>
                 <h3>Supervisor Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].depHeadApproved}</h3>
                 <h3>Cost: ${reimbursementsToApprove[reimbursementsToApproveIndex].claim}</h3>
                 <h3>Event Description: ${reimbursementsToApprove[reimbursementsToApproveIndex].events.description}</h3>
                 <h3>Location: ${reimbursementsToApprove[reimbursementsToApproveIndex].events.location}</h3>
                 <h3>Grade: ${reimbursementsToApprove[reimbursementsToApproveIndex].grade}</h3>
                 <h3>Reason: ${reimbursementsToApprove[reimbursementsToApproveIndex].reason}</h3>
                `;

                document.getElementById("formToApprove").innerHTML = info;
                benCo = true;
            break;
        }
    } catch (error) {continue}
        }
    }

}

function populateApprovalDeptHeadResult(reimbursementsToApprove) {

    for (reimbursementsToApproveIndex; reimbursementsToApproveIndex < reimbursementsToApprove.length; reimbursementsToApproveIndex++) {
        if (reimbursementsToApprove[reimbursementsToApproveIndex].depHeadApproved == false) {
        if (reimbursementsToApprove[reimbursementsToApproveIndex].employees.departments.DHead == employeeName && reimbursementsToApprove[reimbursementsToApproveIndex].employees.EId != employeeID) {
            let info =
                `<h3>Supervisor Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].SApproved}</h3>
                 <h3>Benefit Coordinator Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].benCoApproved}</h3>
                 <h3>Supervisor Approval: ${reimbursementsToApprove[reimbursementsToApproveIndex].depHeadApproved}</h3>
                 <h3>Cost: ${reimbursementsToApprove[reimbursementsToApproveIndex].claim}</h3>
                 <h3>Event Description: ${reimbursementsToApprove[reimbursementsToApproveIndex].events.description}</h3>
                 <h3>Location: ${reimbursementsToApprove[reimbursementsToApproveIndex].events.location}</h3>
                 <h3>Grade: ${reimbursementsToApprove[reimbursementsToApproveIndex].grade}</h3>
                 <h3>Reason: ${reimbursementsToApprove[reimbursementsToApproveIndex].reason}</h3>
                `;

                document.getElementById("formToApprove").innerHTML = info;
                deptHead = true;

            break;
        }
    }
    }

}

function approve() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            if (JSON.parse(this.responseText)) {
                document.getElementById("success").innerHTML = "Form Successfully approved!"
            } else {
                document.getElementById("success").innerHTML = "Form un-successfully approved!"
            }
        } else if (this.readyState == 4) {
            document.getElementById("success").innerHTML = "Request was not successfully approved!"
        }

    }

    let url = "http://localhost:7000/reimbursements/" + reimbursementsToApprove[reimbursementsToApproveIndex].RId;
    xhttp.open("PUT", url, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');

    console.log(reimbursementsToApprove[0])
try {
    if (supervisor) {
        reimbursementsToApprove[reimbursementsToApproveIndex].SApproved = true;
    }
} catch (error) {}
try {
    if (benCo) {
        reimbursementsToApprove[reimbursementsToApproveIndex].benCoApproved = true;
    }
} catch (error) {}
try {
    if (deptHead) {
        reimbursementsToApprove[reimbursementsToApproveIndex].depHeadApproved = true;
    }
} catch (error) {}
    
    //The optional argument in the send() method allows us to provide a body.
    xhttp.send(JSON.stringify(reimbursementsToApprove[reimbursementsToApproveIndex]));
}