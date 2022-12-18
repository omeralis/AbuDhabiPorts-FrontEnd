import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  @ViewChild('content') content: any;
  DataResponse: any[] = [];
  titleModel: any;
  modelType: boolean = false;
  myForm: FormGroup = this.fb.group({});
  submitted: boolean = false;
  isLoading: boolean = false;
  isLoadering: boolean = false;
  constructor(
    private employeeService: EmployeesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getEmployeea();
    this.Form();
  }
  /* --------------------------- Add Form Validators -------------------------- */
  private Form(): void {
    this.myForm = this.fb.group({
      id: [''],
      fullName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      salary: [Number, Validators.required],
      address: ['', Validators.required],
    });
  }
  // get data of Employee
  getEmployeea() {
    this.isLoadering = true;
    console.log('init loading', this.isLoadering);
    this.employeeService.getEmployees().subscribe(
      (res: any) => {
        this.DataResponse = res;
        this.isLoadering = false;
        console.log('res loading', this.isLoadering);
      },
      (err) => {
        console.log(err);
        this.isLoadering = false;
        console.log('err loading', this.isLoadering);
      },
      () => {
        this.isLoadering = false;
        console.log('com loading', this.isLoadering);
      }
    );
  }
  //open model add Employee
  open(content: any) {
    this.modelType = false;
    this.myForm.reset();
    this.modalService.open(content);
    if (!this.modelType) {
      this.titleModel = 'Add New Employee';
    }
  }

  //open model edit Employee and set value
  openEdit(data: any) {
    this.modelType = true;
    this.modalService.open(this.content);
    this.myForm.controls['id'].setValue(data.id);
    this.myForm.controls['fullName'].setValue(data.fullName);
    this.myForm.controls['jobTitle'].setValue(data.jobTitle);
    this.myForm.controls['gender'].setValue(data.gender);
    this.myForm.controls['dateOfBirth'].setValue(new Date(data.dateOfBirth));
    this.myForm.controls['salary'].setValue(data.salary);
    this.myForm.controls['address'].setValue(data.address);
    if (this.modelType == true) {
      this.titleModel = 'Edit Employee';
    }
  }
  // close model
  colesModel() {
    this.modalService.dismissAll('Cross click');
  }
  // validators
  get submittedValid() {
    return this.myForm.controls;
  }
  // add and edit function
  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    if (this.myForm.invalid) {
      this.isLoading = false;
      return;
    }

    if (this.myForm.value.id) {
      this.employeeService
        .UpdateEmployees(this.myForm.value.id, this.myForm.value)
        .subscribe(
          (res) => {
            this.isLoading = false;
          },
          (error) => {
            console.log('error update Employee', error);
            this.isLoading = false;
          },
          () => {
            this.toastr.success('Updated Successfully ', 'Employee');
            this.getEmployeea();
            this.modalService.dismissAll('Cross click');
            this.isLoading = false;
          }
        );
    } else {
      this.employeeService.addEmployees(this.myForm.value).subscribe(
        (res) => {},
        (error) => {
          console.log(error);
          this.isLoading = false;
        },
        () => {
          this.toastr.success('Add Employee success ');
          this.getEmployeea();
          this.modalService.dismissAll('Cross click');
          this.isLoading = false;
        }
      );
    }
  }

  confirm(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure delete that Employee ?',
      accept: () => {
        this.RemoveEmployee(data);
      },
    });
  }
  RemoveEmployee(data: any) {
    this.employeeService.DeleteEmployees(data.id).subscribe(
      (res) => {},
      (error) => {
        console.log(error);
      },
      () => {
        this.toastr.success('Remove Employee success ');
        this.getEmployeea();
      }
    );
  }
}
