import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EmployeeApp';

  employees: any[] = [];

  newEmployee = {
    employee_name: '',
    employee_salary: '',
    employee_age: ''
  };

  employeeToUpdate = {
    id: 0,
    employee_name: '',
    employee_salary: '',
    employee_age: ''
  };
  
  employeeIdToDelete: number | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response.data;
        console.log('Employees:', this.employees);
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  createEmployee(): void {
    this.employeeService.createEmployee(this.newEmployee).subscribe(
      (response) => {
        console.log('Employee created:', response);
        this.getAllEmployees();
        this.newEmployee = { employee_name: '', employee_salary: '', employee_age: '' };
      },
      (error) => {
        console.error('Error creating employee', error);
      }
    );
  }

  getEmployeeById(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (response) => {
        console.log('Employee details:', response.data);
        this.employeeToUpdate = {
          id: response.data.id,
          employee_name: response.data.employee_name,
          employee_salary: response.data.employee_salary,
          employee_age: response.data.employee_age
        };
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }

  updateEmployee(): void {
    const { id, employee_name, employee_salary, employee_age } = this.employeeToUpdate;
    this.employeeService.updateEmployee(id, { employee_name, employee_salary, employee_age }).subscribe(
      (response) => {
        console.log('Employee updated:', response);
        this.getAllEmployees();
        this.employeeToUpdate = { id: 0, employee_name: '', employee_salary: '', employee_age: '' };
      },
      (error) => {
        console.error('Error updating employee', error);
      }
    );
  }

  deleteEmployee(): void {
    if (this.employeeIdToDelete !== null) {
      this.employeeService.deleteEmployee(this.employeeIdToDelete).subscribe(
        (response) => {
          console.log('Employee deleted:', response);
          this.getAllEmployees();
          this.employeeIdToDelete = null;
        },
        (error) => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }
}
