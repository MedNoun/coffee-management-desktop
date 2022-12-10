import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public date: Date = new Date(Date.now());
  private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
  constructor(
    private router: Router,
    private readonly userService: UserService
  ) {}
  public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(
      _
    )}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  };

  async createUser() {
    const expl = {
      firstName: 'Farah',
      lastName: 'Kallel',
      password: 'azerty123',
      username: 'Farah123',
      email: 'farah@gmail.com',
    };
    const users = await this.userService.delete({ username: 'Med3oun' });
  }
  async readUsers() {
    const users = await this.userService.readAll();
  }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }
}
