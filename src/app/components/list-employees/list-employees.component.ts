
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationMessageComponent } from '../shared/confirmation-message/confirmation-message.component';




@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'phone', 'email', 'maritalStatus', 'joinDate', 'sex', 'actions'];
  listEmployees: Employee[] = [];
  dataSource: any;



  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;



  constructor(private _employeeService: EmployeeService,
    public dialog: MatDialog,
    public snackBar : MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.loadEmployees()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();      
    }
  }

  loadEmployees() {
    this.listEmployees = this._employeeService.getEmployees();
    this.dataSource = new MatTableDataSource(this.listEmployees);
    console.log(this.listEmployees)
  }

  deleteEmployee(index: number) {

    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '350px',
      data: { message: "Are you sure?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this._employeeService.deleteEmployee(index);
        this, this.loadEmployees();
        this.snackBar.open('Employee deleted', '',{duration: 2500})
      }
    });
  }
  editEmployee(index: number) {
    this._employeeService
  }
}


