import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.userService.observable.subscribe((v) => {
      this.router.navigateByUrl('home');
    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  async onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
      };
      await this.userService.login(payload);
    }
  }

  get users() {
    return this.userService.users;
  }
}
