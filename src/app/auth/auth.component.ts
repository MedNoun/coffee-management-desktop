import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private readonly authService: AuthService,
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
      console.log('this is the sended payload :', payload);

      this.authService.localLogin(payload).then((re) => {
        console.log('ree', re);
      });
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
