import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  DataResponse: any[] = [];
  userData: any;
  submitted = false;
  isLoading = false;

  constructor(public fb: FormBuilder, private authService: AuthService,
    public router: Router,
    private toastr: ToastrService) {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  // login
  login() {
    this.isLoading = true;
    this.submitted = true;
    if (this.LoginForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.authService.signIn(this.LoginForm.value)
    .subscribe({
      next: (res: any) => {
        console.log(res.token);
        this.isLoading =false;
        localStorage.setItem('access_token', res.token);
        this.authService.setIsLoggedIn(true);
        this.router.navigate(['employees']);
        this.authService.currentUser = res.token;
      },
      error: (error) => {
        console.log(error);
        this.isLoading =false;
        this.toastr.error('Invalid username and Password');
      },
      complete: () => {
        this.isLoading =false;
      },
    });
    ;
  }
  
  // validation
  get loginForm(): any {
    return this.LoginForm.controls;
  }
}
