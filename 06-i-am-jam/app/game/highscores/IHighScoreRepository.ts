import { Scoreboard } from "./Scoreboard";

export interface IHighScoreRepository {
    getScoreboard(): Promise<Scoreboard>;
    updateGlobalScoreboard(name: string, score: number): Promise<Scoreboard>;
}

