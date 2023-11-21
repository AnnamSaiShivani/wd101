function startDate() {
    const todays = new Date();
    return new Date(todays.getFullYear() - 55, todays.getMonth(), todays.getDate()).toISOString().split('T')[0];
}

function endDate() {
    const todays = new Date();
    return new Date(todays.getFullYear() - 18, todays.getMonth(), todays.getDate()).toISOString().split('T')[0];
}

const dobInput = document.getElementById('dob');
dobInput.setAttribute('min', startDate());
dobInput.setAttribute('max', endDate());

let Form = document.getElementById("Form");

const getEntries = () => {
    let entries = localStorage.getItem("userEntries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = getEntries();

const dispEntries = () => {
    const entries = getEntries();
    const tableEntries = entries.map((entry) => {
        const name = <td class="bor">${entry.name}</td>;
        const email = <td class="bor">${entry.email}</td>;
        const password = <td class="bor">${entry.password}</td>;
        const dateOfBirth = <td class="bor">${entry.dob}</td>; 
        const terms = <td class="bor">${entry.terms}</td>;

        const row = <tr>${name} ${email} ${password} ${dateOfBirth} ${terms}</tr>;
        return row;
    }).join("\n");

    const table = <h1>Entries</h1><table class="table"><tr class="bor"><th class="bor">Name</th><th class="bor">Email</th><th class="bor">Password</th><th class="bor">Dob</th><th class="bor">Accepted terms?</th></tr>${tableEntries}</table>;

    let details = document.getElementById("tableView");
    details.innerHTML = table;
}

dispEntries();

const formSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dateOfBirth = document.getElementById("dob").value; 
    const a = document.getElementById("term").checked;

    const entry = {
        name, email, password, dob: dateOfBirth,terms
    }

    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries)); 
    dispEntries();
}

userForm.addEventListener("submit", formSubmit);
