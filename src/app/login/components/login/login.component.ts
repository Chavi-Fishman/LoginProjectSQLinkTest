import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LAST_CONNECTED_EMAIL } from 'app/models/local-storage-keys';
import { AuthServiceService } from 'app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = "Login";
  loginModel: { email: string, password: string };
  lastAuthEmail = localStorage.getItem(LAST_CONNECTED_EMAIL);
  indicator = false;

  constructor(private authService: AuthServiceService, private router: Router) {

    this.loginModel = {
      email: this.lastAuthEmail || '',
      password: ''
    }

  }

  ngOnInit(): void {
  }
  login() {
    this.indicator = true;
    this.authService.login(this.loginModel).subscribe(response => {
      this.indicator = false;
      if (response) {
        this.router.navigate([`info`])//todo check returnUrl and navigate to it if exist
      } else {
        alert('failed to login!');
      }
    })
  }



}
