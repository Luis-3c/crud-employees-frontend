import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: [ './employees.component.css' ]
})
export class EmployeesComponent implements OnInit {
	employee: Employee = {
		_id: null,
		name: null,
		position: null,
		office: null,
		salary: null
	};
	employees: Employee;
  editing: boolean = false;
  frontendCount : Number;

	constructor(private employeeService: EmployeeService) {
    this.getEmployees();
    this.getFrontendCount();
	}
	ngOnInit() {}

	getEmployees() {
		this.employeeService.getEmployees().subscribe(
			(data: Employee) => {
				this.employees = data;
			},
			(e) => {
				alert('Error during gettting employees');
			}
		);
	}

	addEmployee() {
		this.employeeService.postEmployees(this.employee).subscribe(
			(data) => {
				this.clearEmployee();
        this.getEmployees();
        this.getFrontendCount();
			},
			(e) => {
				alert('Error adding employee');
			}
		);
	}

	loadEmployeeById(_id) {
		//console.log(_id);
		this.employeeService.getEmployeeById(_id).subscribe(
			(data: Employee) => {
				this.employee = data;
				this.editing = true;
			},
			(e) => {
				alert('Error loading Data');
			}
		);
	}

	editEmployee() {
		this.employeeService.putEmployee(this.employee).subscribe(
			(data) => {
				this.clearEmployee();
				this.editing = false;
				this.getEmployees();
			},
			(e) => {
				alert('Error updating Employee');
			}
		);
  }
  
  getFrontendCount() {
		this.employeeService.getFrontendCount().subscribe(
			(data: Number) => {
				this.frontendCount = data;
			},
			(e) => {
				alert('Ocurrió un error!');
			}
		);
	}

	clearEmployee() {
		this.employee._id = null;
		this.employee.name = null;
		this.employee.office = null;
		this.employee.position = null;
		this.employee.salary = null;
	}
}
