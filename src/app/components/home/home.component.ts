import { Component, OnInit } from '@angular/core';
import { GameDataService, UserGameData } from 'src/app/services/GameDataService';
import { MockGameDataService } from 'src/app/services/mock-game-data.service';
import { AuthService } from 'src/app/services/AuthService';
import { MockAuthService } from 'src/app/services/mock-auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  gameData: UserGameData = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0
  };

  constructor(
    private gameDataService: GameDataService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    this.gameDataService.getUserGameData().then((data) => {
      this.gameData = data;
    });
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  onNewGame() {
    this.router.navigate(['game']);
  }
}
