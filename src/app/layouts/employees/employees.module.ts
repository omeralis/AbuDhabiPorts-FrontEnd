import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './employees/employees.component';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { employeesRoutingModule } from './employees-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    employeesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    IconsModule,
    ConfirmDialogModule,
    CalendarModule
  ],
  providers:[ConfirmationService]
})
export class EmployeesModule { }
