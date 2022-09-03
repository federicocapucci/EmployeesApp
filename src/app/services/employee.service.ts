import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  listEmployees : Employee[] = []; 

  constructor() {    
  }
  ngOnInit(): void {
    this.loadEmployeesFromMemory();  
  }

  loadEmployeesFromMemory(): void {
    if(localStorage.getItem('employeesProject20')!==null){
      this.listEmployees = JSON.parse(localStorage.getItem('employeesProject20')!)
    }
  }

  getEmployees() {    
    this.listEmployees = JSON.parse(localStorage.getItem('employeesProject20') || '');
    return this.listEmployees
  }

  deleteEmployee(index:number) { 
    this.listEmployees.splice(index,1);
    localStorage.setItem('employeesProject20', JSON.stringify(this.listEmployees))
  }
  
  getEmployeeForEdit(index:number){
    return this.listEmployees[index];
  }

  editEmployee(employee : Employee, id : number){    
    this.listEmployees[id] = employee;    
    localStorage.setItem('employeesProject20', JSON.stringify(this.listEmployees))
  }


  saveEmployee(employee : Employee) {
    this.listEmployees.unshift(employee);
    localStorage.setItem('employeesProject20', JSON.stringify(this.listEmployees))
  }
}
