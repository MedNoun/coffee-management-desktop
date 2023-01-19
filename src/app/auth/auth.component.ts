import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.userService.init();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
      };
      this.userService.login(payload);
    }
  }
  get users() {
    return this.userService.users;
  }
}
