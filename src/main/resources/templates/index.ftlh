<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Employee Directory</h1>

    <div class="controls">
        <input type="text" id="search-input" placeholder="Search by name or email..." />
        <button onclick="showForm()">Add Employee</button>
    </div>

    <div id="employee-list-container">
        <#list employees as employee>
            <div class="employee-card" data-id="${employee.id}">
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p>Email: ${employee.email}</p>
                <p>Department: ${employee.department}</p>
                <p>Role: ${employee.role}</p>
                <button class="edit-btn" data-id="${employee.id}">Edit</button>
                <button class="delete-btn" data-id="${employee.id}">Delete</button>
            </div>
        </#list>
    </div>

    <div id="form-container" class="hidden">
        <h2 id="form-title">Add Employee</h2>
        <form id="employee-form">
            <input type="hidden" id="employee-id">
            <input type="text" id="first-name" placeholder="First Name" required>
            <input type="text" id="last-name" placeholder="Last Name" required>
            <input type="email" id="email" placeholder="Email" required>
            <input type="text" id="department" placeholder="Department" required>
            <input type="text" id="role" placeholder="Role" required>
            <button type="submit">Save</button>
            <button type="button" onclick="hideForm()">Cancel</button>
        </form>
    </div>

    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>
