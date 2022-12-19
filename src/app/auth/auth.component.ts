import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

      this.userService.auth(payload);
      this.router.navigateByUrl('home');
    }
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     this.myService.login(this.loginForm.value).subscribe(
  //       (response) => {
  //         // handle successful login
  //       },
  //       (error) => {
  //         // handle login error
  //       }
  //     );
  //   }
  // }
  get users() {
    return this.userService.users;
  }
}
