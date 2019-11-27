import { GameDataService, UserGameData, Winner } from './GameDataService';
import { Injectable } from '@angular/core';
import { MockAuthService } from './mock-auth-service';

@Injectable({
  providedIn: 'root',
})
export class MockGameDataService implements GameDataService {
  constructor(private authService: MockAuthService) {
  }

  getUserGameData(): Promise<UserGameData> {
    //Make a GET request to the API using the
    //JWT token from this.authService.getJwtToken();

    return new Promise<UserGameData>((resolve, reject) => {
      resolve(
        {
          gamesPlayed: 10,
          gamesWon: 4,
          gamesLost: 6
        });
    });
  }
  saveGame(winner: Winner): void {
    console.log('Saving game - ' + winner);
  }
}
