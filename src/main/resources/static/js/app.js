let currentPage = 1;
let itemsPerPage = 10;
let employees = [...mockEmployees];
let filteredEmployees = [...employees];

const employeeListContainer = document.getElementById("employee-list-container");
const paginationControls = document.getElementById("pagination-controls");
const employeeForm = document.getElementById("employee-form");
const formContainer = document.getElementById("form-container");

function renderEmployees() {
  employeeListContainer.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageEmployees = filteredEmployees.slice(start, end);

  if (pageEmployees.length === 0) {
    employeeListContainer.innerHTML = "<p>No employees found.</p>";
    return;
  }

  pageEmployees.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    employeeListContainer.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  paginationControls.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.onclick = () => {
      currentPage = i;
      renderEmployees();
    };
    paginationControls.appendChild(btn);
  }
}

function deleteEmployee(id) {
  const index = employees.findIndex(e => e.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    applyCombinedFilters();
  }
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  document.getElementById("employee-id").value = emp.id;
  document.getElementById("first-name").value = emp.firstName;
  document.getElementById("last-name").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;
  document.getElementById("form-title").innerText = "Edit Employee";
  showForm();
}

function showForm() {
  formContainer.classList.remove("hidden");
}

function hideForm() {
  employeeForm.reset();
  formContainer.classList.add("hidden");
  document.getElementById("employee-id").value = "";
  document.getElementById("form-title").innerText = "Add Employee";
}

employeeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("employee-id").value;
  const newEmp = {
    id: id ? parseInt(id) : Date.now(),
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    role: document.getElementById("role").value.trim(),
  };

  if (id) {
    const index = employees.findIndex(e => e.id === parseInt(id));
    if (index !== -1) employees[index] = newEmp;
  } else {
    employees.push(newEmp);
  }
  applyCombinedFilters();
  hideForm();
});

// Search
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", applyCombinedFilters);

// Sort
const sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", applyCombinedFilters);

// Items per page
const itemsSelect = document.getElementById("items-per-page");
itemsSelect.addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderEmployees();
});

function toggleFilter() {
  document.getElementById('filter-sidebar').classList.toggle('hidden');
}

// Combined filter + search + sort
function applyCombinedFilters() {
  const dept = document.getElementById('filter-department')?.value.trim().toLowerCase() || "";
  const role = document.getElementById('filter-role')?.value.trim().toLowerCase() || "";
  const search = searchInput.value.trim().toLowerCase();
  const sortKey = sortSelect.value;

  filteredEmployees = employees.filter(emp => {
    const matchesDept = dept === '' || emp.department.toLowerCase() === dept;
    const matchesRole = role === '' || emp.role.toLowerCase().includes(role);
    const matchesSearch = search === '' ||
      emp.firstName.toLowerCase().includes(search) ||
      emp.lastName.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search);
    return matchesDept && matchesRole && matchesSearch;
  });

  if (sortKey) {
    filteredEmployees.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }

  currentPage = 1;
  renderEmployees();
}

document.addEventListener("DOMContentLoaded", () => {
  applyCombinedFilters();
});
