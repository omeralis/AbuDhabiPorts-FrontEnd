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
  isLoading = false;
  isLoggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  constructor(
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService
  ) {}

  // Sign-in
  signIn(user: User) {
    this.isLoading =false;
    console.log(this.isLoading)
    return this.http
      .post<any>(this.endpoint + ApiRoutes.login, user);
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
  // get Token
  getToken() {
    return localStorage.getItem('access_token');
  }
}
