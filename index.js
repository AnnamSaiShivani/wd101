function sartDate() {
    const todays = new Date();
    return new Date(todays.getFullYear() - 55, todays.getMonth(), todays.getDate()).toISOString().split('T')[0];
}

function endDate() {
    const todays = new Date();
    return new Date(todays.getFullYear() - 18, todays.getMonth(), todays.getDate()).toISOString().split('T')[0];
}

const date_of_birth = document.getElementById('dob');
date_of_birth.setAttribute('min', minDate());
date_of_birth.setAttribute('max', maxDate());

let Form = document.getElementById("userForm");

const getEntries = () => {
    let Input = localStorage.getItem("userEntries");
    if (Input) {
        entries = JSON.parse(Input);
    } else {
        Input = [];
    }
    return Input;
}

let userEntries = getEntries();

const dispEntries = () => {
    const entries = getEntries();
    const tableEntries = entries.map((entry) => {
        const name = `<td class="bor">${entry.name}</td>`;
        const email = `<td class="bor">${entry.email}</td>`;
        const password = `<td class="bor">${entry.password}</td>`;
        const dateOfBirth = `<td class="bor">${entry.dob}</td>`; 
        const getdata = `<td class="bor">${entry.getdata}</td>`;

        const row = `<tr>${name} ${email} ${password} ${dateOfBirth} ${getdata}</tr>`;
        return row;
    }).join("\n");

    const tableofentry = `<h1>Entries</h1><table class="table"><tr class="bor"><th class="bor">Name</th><th class="bor">Email</th><th class="bor">Password</th><th class="bor">Dob</th><th class="bor">Accepted terms?</th></tr>${tableEntries}</table>`;

    let info = document.getElementById("tableView");
    info.innerHTML = table;
}

dispEntries();

const formSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dateOfBirth = document.getElementById("dob").value; 
    const getdata = document.getElementById("getdata").checked;

    const entry = {
        name, email, password, dob: dateOfBirth, getdata
    }

    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries)); 
    dispEntries();
}

userForm.addEventListener("submit", formSubmit);
