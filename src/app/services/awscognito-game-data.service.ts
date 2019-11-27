import { Injectable } from '@angular/core';
import { GameDataService, UserGameData, Winner } from './GameDataService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AWSCognitoAuthService } from './awscognito-auth.service';
import { environment } from 'src/environments/environment';

interface AWSGameData {
  games: [
    {
      created: string;
      winner: Winner;
    }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class AWSCognitoGameDataService implements GameDataService {
  constructor(private authService: AWSCognitoAuthService, private http: HttpClient) { }

  getUserGameData(): Promise<UserGameData> {
    const userGameData: UserGameData = {
      gamesPlayed: 0,
      gamesLost: 0,
      gamesWon: 0
    };

    return new Promise<UserGameData>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authService.getJwtToken(),
        })
      };

      this.http.get(environment.CognitoAPIUrl, httpOptions)
        .subscribe((data: AWSGameData) => {
          data.games.forEach(game => {
            userGameData.gamesPlayed++;

            if (game.winner === Winner.User) {
              userGameData.gamesWon++;
            } else if (game.winner === Winner.Opponent) {
              userGameData.gamesLost++;
            }
          });

          resolve(userGameData);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  saveGame(winner: Winner): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getJwtToken(),
      })
    };

    this.http.post(environment.CognitoAPIUrl, JSON.stringify(
      {
        winner
      }
    ), httpOptions).subscribe(response => {
      console.log(response);
    })
  }
}
