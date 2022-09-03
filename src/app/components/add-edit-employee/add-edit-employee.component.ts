import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';



@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  myForm: FormGroup;
  employeeId :any;
  action = 'Create a  new ';  

  constructor(private fb: FormBuilder, private _employeeService: EmployeeService, private router: Router, private snackBar: MatSnackBar, private aRoute : ActivatedRoute) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      joinDate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      maritalStatus: ['', [Validators.required]],
      sex: ['', [Validators.required]]
    });
    
    this.employeeId = this.aRoute.snapshot.params['id'];

  }

  ngOnInit(): void {

    if(this.employeeId !== undefined) {
      this.action = " Edit an";
      setTimeout(() => {
        this.makeEmployeeEditable(this.employeeId)
      }, 10); //This took me half a day
      
    }else{
      if(this.myForm.invalid){
      this.router.navigate(['/add'])
    }
    }
  }

  getErrorMessage() {
    return 'You must enter a valid input';
  }

  saveEmployee() {
    if (this.myForm.valid) {
      const employee: Employee = {
        name: this.myForm.get('name')!.value,
        phone: this.myForm.get('phone')!.value,
        email: this.myForm.get('email')!.value,
        joinDate: this.myForm.get('joinDate')!.value.toLocaleDateString(),
        maritalStatus: this.myForm.get('maritalStatus')!.value,
        sex: this.myForm.get('sex')!.value
      }

      if(this.employeeId === undefined) {
        this.addNewEmployee(employee)       
      }else{
        this.saveEditedEmployee(employee)     
    }
    }
  }

  addNewEmployee(employee: Employee){
    this._employeeService.saveEmployee(employee)
    this.snackBar.open('Employee saved!', '', { duration: 2500 })
    this.router.navigate(['/'])
  }

  makeEmployeeEditable(index:number){
    const employee : Employee = this._employeeService.getEmployeeForEdit(index);
    // this.savedDate = new FormControl ( new Date('10/10/2020'));      
    this.myForm.patchValue(employee);    
    this.myForm.patchValue({joinDate: new Date(employee.joinDate)}); //This took me half a day   
    
  }
  saveEditedEmployee(employee: Employee) {
    this._employeeService.editEmployee(employee,this.employeeId)
    this.snackBar.open('Employee updated!', '', { duration: 2500 })
    this.router.navigate(['/'])
  }



}
