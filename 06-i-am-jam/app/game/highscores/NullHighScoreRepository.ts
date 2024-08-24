import { Scoreboard } from "./Scoreboard";
import { IHighScoreRepository } from "./IHighScoreRepository";


export class NullHighScoreRepository implements IHighScoreRepository {
    public async getScoreboard() {        
        const items = [];

        const scoresJson = localStorage.getItem("highscores");
        if (scoresJson) {
            const scores = JSON.parse(scoresJson);
            items.push(...scores.items);
        }

        return new Scoreboard(items, false);
    }

    public async subscribe(callback: (scoreboard: Scoreboard) => void) {
    }

    public async updateGlobalScoreboard(name: string, score: number): Promise<Scoreboard> {
        const scoreboard = await this.getScoreboard();
        scoreboard.addRange([{ name, score }]);

        const str = JSON.stringify(scoreboard);
        localStorage.setItem("highscores", str);

        return scoreboard;
    }
}
