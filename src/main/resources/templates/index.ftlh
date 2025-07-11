<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Employee Directory</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/css/style1.css" />
</head>
<body>

<!-- Header -->
<header class="top-bar">
  <h1>Employee Directory</h1>
  <div class="top-bar-controls">
    <input type="text" id="search-input" placeholder="Search by name or email" />
    <div class="filter-group">
      <label for="filter-department">Filter:</label>
      <select id="filter-department">
        <option value="">All</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Developer">Developer</option>
      </select>
    </div>
  </div>
</header>

<!-- Controls -->
<div class="controls-bar">
  <div class="left-controls">
    <div class="control-group">
      <label for="sort-select">Sort:</label>
      <select id="sort-select">
        <option value="">-- Select --</option>
        <option value="firstName">First Name</option>
        <option value="department">Department</option>
      </select>
    </div>

    <div class="control-group">
      <label for="items-per-page">Show:</label>
      <select id="items-per-page">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>

  <button class="add-employee-btn" onclick="showForm()">Add Employee</button>
</div>

<!-- Employee Cards -->
<div id="employee-list-container" class="employee-grid">
  <#list employees as emp>
    <div class="employee-card">
      <strong>${emp.firstName} ${emp.lastName}</strong>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    </div>
  </#list>
</div>

<!-- Pagination -->
<div id="pagination-controls"></div>

<!-- Add/Edit Form -->
<div id="form-container" class="modal hidden">
  <div class="modal-content">
    <h2 id="form-title">Add Employee</h2>
    <form id="employee-form">
      <input type="hidden" id="employee-id" name="employee-id" />

      <label for="first-name">First name</label>
      <input type="text" id="first-name" name="first-name" placeholder="Enter first name" required />

      <label for="last-name">Last name</label>
      <input type="text" id="last-name" name="last-name" placeholder="Enter last name" required />

      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="Enter email" required />

      <label for="department">Department</label>
      <input type="text" id="department" name="department" placeholder="Enter department" required />

      <label for="role">Role</label>
      <input type="text" id="role" name="role" placeholder="Enter role" required />

      <div class="form-buttons">
        <button type="button" onclick="hideForm()">Cancel</button>
        <button type="submit" class="primary">Add</button>
      </div>
    </form>
  </div>
</div>

<!-- Footer -->
<footer>
  <p>© 2025 Employee Directory App. All rights reserved.</p>
</footer>

<script src="/js/app.js"></script>
</body>
</html>
