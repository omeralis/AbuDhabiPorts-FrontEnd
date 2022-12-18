import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  login() {
    this.isLoading = true;
    this.submitted = true;
    if (this.LoginForm.invalid) {
      this.isLoading = false;
      this.isLoading = false;
      return;
    }
    this.authService.signIn(this.LoginForm.value);
    this.isLoading = false;
  }
  // validation
  get loginForm(): any {
    return this.LoginForm.controls;
  }
}
