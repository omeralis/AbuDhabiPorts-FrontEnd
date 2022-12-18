import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ApiRoutes } from 'src/app/shared/models/router/ApiRoutes';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  dataPhone: any;

  isLoggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  constructor(private http: HttpClient, public router: Router,
    private toastr: ToastrService) {}

  // Sign-in from Email
  signIn(user: User) {
    return this.http
      .post<any>(this.endpoint + ApiRoutes.login, user)
      .subscribe({
        next: (res: any) => {
          console.log(res.token);
          localStorage.setItem('access_token', res.token);
          this.setIsLoggedIn(true); 
          this.router.navigate(['employees']);
          this.currentUser = res.token;
        },
        error: (error) => {
          console.log(error);
          this.toastr.error('Invalid username and Password');
        },
        complete: () => {},
      });
  }

  // logout
  doLogout() {
    this.setIsLoggedIn(false);
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
  // Is the token available
  private tokenAvailable(): boolean {
    return !!localStorage.getItem('access_token');
  }
  // set Behavior Subject
  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  // get Behavior Subject
  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
}
