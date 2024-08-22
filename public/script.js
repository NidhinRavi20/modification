document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    let employees = [];

    // Function to validate input fields
    function validateInput(input) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(input);
    }

    // Function to render the employee table
    function renderTable() {
        employeeTable.innerHTML = '';
        employees.forEach((employee, index) => {
            const row = employeeTable.insertRow();
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>${employee.age}</td>
                <td class="actions">
                    <button class="edit" onclick="editEmployee(${index})">Edit</button>
                    <button class="delete" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            `;
        });
    }

    // Function to handle form submission
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const age = document.getElementById('age').value;
        const employeeId = document.getElementById('employeeId').value;

        // Validate name and position
        if (!validateInput(name) || !validateInput(position)) {
            alert('Name and Position should contain only alphabetic characters.');
            return;
        }

        if (employeeId) {
            // Edit employee
            employees[employeeId] = { name, position, age };
        } else {
            // Add new employee
            employees.push({ name, position, age });
        }

        renderTable();
        employeeForm.reset();
        document.getElementById('submitBtn').innerText = 'Add Employee';
        document.getElementById('employeeId').value = '';
    });

    // Edit employee function
    window.editEmployee = function (index) {
        document.getElementById('employeeId').value = index;
        document.getElementById('name').value = employees[index].name;
        document.getElementById('position').value = employees[index].position;
        document.getElementById('age').value = employees[index].age;
        document.getElementById('submitBtn').innerText = 'Update Employee';
    };

    // Delete employee function
    window.deleteEmployee = function (index) {
        employees.splice(index, 1);
        renderTable();
    };
});
