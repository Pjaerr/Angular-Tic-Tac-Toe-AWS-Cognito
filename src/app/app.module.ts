import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { SignUpViewComponent } from './components/sign-up-view/sign-up-view.component';
import { AuthService } from './services/AuthService';
import { MockAuthService } from './services/mock-auth-service';
import { GameDataService } from './services/GameDataService';
import { MockGameDataService } from './services/mock-game-data.service';
import { AWSCognitoAuthService } from './services/awscognito-auth.service';
import { AWSCognitoGameDataService } from './services/awscognito-game-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    HomeComponent,
    GameComponent,
    SignUpViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: AuthService, useClass: AWSCognitoAuthService },
    { provide: GameDataService, useClass: AWSCognitoGameDataService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
