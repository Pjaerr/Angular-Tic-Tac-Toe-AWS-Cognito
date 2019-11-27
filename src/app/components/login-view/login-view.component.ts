import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  @Input()
  email: string;

  @Input()
  password: string;

  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    this.authService.authenticateUser({ email: this.email, password: this.password }).then(() => {
      this.router.navigate(['home']);
    }).catch(err => {
      this.errorMessage = err;
    });
  }

  onSignUpClick() {
    this.router.navigate(['sign-up']);
  }
}
