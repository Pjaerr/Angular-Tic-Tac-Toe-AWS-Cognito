import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-up-view',
  templateUrl: './sign-up-view.component.html',
  styleUrls: ['./sign-up-view.component.css']
})
export class SignUpViewComponent implements OnInit {

  email: string;
  password: string;

  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    this.authService.signUp({ email: this.email, password: this.password }).then(success => {
      this.authService.authenticateUser({ email: this.email, password: this.password })
        .then(() => {
          this.router.navigate(['home']);
        })
        .catch(err => {
          this.errorMessage = err;
        });
    })
      .catch(err => {
        this.errorMessage = err;
      });
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }

}
