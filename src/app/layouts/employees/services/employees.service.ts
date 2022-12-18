import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from 'src/app/shared/models/router/ApiRoutes';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  endpoint: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  // get data of case
  getEmployees() {
    return this.http.get(this.endpoint + ApiRoutes.employees.all);
  }
  // add new Employees
  addEmployees(data: any) {
    return this.http.post(this.endpoint + ApiRoutes.employees.add, data);
  }
  //edit Employees
  UpdateEmployees(id: number, data: any) {
    return this.http.put(this.endpoint + ApiRoutes.employees.edit + id, data);
  }
  //delete Employees
  DeleteEmployees(id: number) {
    return this.http.delete(this.endpoint + ApiRoutes.employees.delete + id);
  }
}
