
let certificates = [];
let applications = 0;
let currentCGPA = null;

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === id);
  });

  document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.classList.toggle("active",
      btn.getAttribute("onclick").includes("'" + id + "'"));
  });
}

for (let i = 1; i <= 8; i++) {
  document.getElementById("semesters").innerHTML +=
    `<input type="number" id="sem${i}" min="0" max="10"
      step="0.01" placeholder="Semester ${i} SGPA">`;
}

function calculateCGPA() {
  let total = 0;
  let count = 0;

  for (let i = 1; i <= 8; i++) {
    let value = document.getElementById("sem" + i).value;
    if (value !== "") {
      let sgpa = Number(value);
      if (sgpa < 0 || sgpa > 10) {
        alert("SGPA must be between 0 and 10");
        return;
      }
      total += sgpa;
      count++;
    }
  }

  if (count === 0) {
    alert("Enter at least one semester SGPA");
    return;
  }

  currentCGPA = total / count;
  let cgpa = currentCGPA.toFixed(2);
  document.getElementById("cgpaResult").textContent = "CGPA: " + cgpa;
  document.getElementById("dashCgpa").textContent = cgpa;
}

function addCertificate() {
  let input = document.getElementById("certificate");
  let name = input.value.trim();
  if (!name) return alert("Enter a certificate name");

  certificates.push(name);
  let item = document.createElement("li");
  item.textContent = name;
  document.getElementById("certificateList").appendChild(item);
  document.getElementById("certCount").textContent = certificates.length;
  input.value = "";
}

function applyJob() {
  let result = document.getElementById("applyResult");

  if (currentCGPA === null) {
    result.textContent = "Please calculate your CGPA first.";
  } else if (currentCGPA >= 7) {
    applications++;
    document.getElementById("appCount").textContent = applications;
    result.textContent = "Demo application submitted!";
  } else {
    result.textContent = "Demo eligibility requires CGPA 7.0.";
  }
}

function saveProfile() {
  let name = document.getElementById("studentName").value.trim();
  let roll = document.getElementById("rollNumber").value.trim();

  document.getElementById("profileResult").textContent =
    name && roll ? "Profile saved for this session: " + name :
    "Please enter name and roll number.";
}

showPage("dashboard");
