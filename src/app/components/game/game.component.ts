import { Component, OnInit } from '@angular/core';
import { GameDataService, Winner } from 'src/app/services/GameDataService';
import { MockGameDataService } from 'src/app/services/mock-game-data.service';
import { AuthService } from 'src/app/services/AuthService';
import { MockAuthService } from 'src/app/services/mock-auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private gameDataService: GameDataService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }

  onGameWin() {
    this.gameDataService.saveGame(Winner.User);
  }

  onGameLost() {
    this.gameDataService.saveGame(Winner.Opponent);
  }

  onGameDraw() {
    this.gameDataService.saveGame(Winner.Draw);
  }

  onHomeButtonClick() {
    this.router.navigate(['home']);
  }
}
