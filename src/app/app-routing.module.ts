import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { SignUpViewComponent } from './components/sign-up-view/sign-up-view.component';

const routes: Routes = [
  { path: '', component: LoginViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'sign-up', component: SignUpViewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }