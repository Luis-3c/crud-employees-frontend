import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  employees: Employee[];
  readonly URL_API = 'http://localhost:3000/api/employees';
  constructor(private http: HttpClient) { }

  getEmployees(){
    return this.http.get(this.URL_API);
  }

  getEmployeeById(_id){
    return this.http.get(this.URL_API + '/' + _id);
  }

  postEmployees(employee: Employee){
    const headers = new HttpHeaders({'Content-Type': 'Application/json'});
    console.log(employee);
    return this.http.post(this.URL_API, employee, {headers: headers} );
    //console.log(employee);
  }

  putEmployee(employee: Employee){
    return this.http.put(this.URL_API + `/${employee._id}`, employee);
  }
  
  deleteEmployee(_id: String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  getFrontendCount(){
    return this.http.get(this.URL_API + '/frontcount');
  }
}
