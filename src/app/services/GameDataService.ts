import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';

export interface UserGameData {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
}

export enum Winner {
    User = "user",
    Opponent = "opponent",
    Draw = "draw"
}

@Injectable()
export abstract class GameDataService {
    constructor(authService: AuthService) { };
    abstract getUserGameData(): Promise<UserGameData>;
    abstract saveGame(winner: Winner): void;
}

/**
 * Our GameDataService should pull in a service for authentication and then grab the JWT
 * token from that service to then make its API requests. For our mock API it will pull in
 * the mock auth service that doesn't do anything and then return a static object with the info
 *
 * The IGameDataService could potentially be an abstract class so we can specify that it needs to
 * have an IAuthService injected through its constructor.
 */