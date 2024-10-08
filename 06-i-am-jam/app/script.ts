import { HubSpotUi } from "./HubSpotUi";
import { createGameUi } from "./GameUi";
import { Scoreboard } from "./game/highscores/Scoreboard";
import { Game } from "./game/Game";
import { waitForHorizontalOrientation } from "./orientation";

let game: Game = null;
const requireSignup = false;

(async () => {
    const startGameFunction = await createGameUi(onGameStart, onGameEnd);

    if (requireSignup) {
        HubSpotUi.createForm(async (form) => {
            HubSpotUi.hideForm();

            // (╯°□°）╯︵ ┻━┻
            const firstName = form.data.data[1].value;
            const lastName = form.data.data[2].value;

            await waitForHorizontalOrientation();

            game = startGameFunction(`${firstName} ${lastName}`);
        });
    } else {
        HubSpotUi.hideForm();
        await waitForHorizontalOrientation();
        game = startGameFunction("Default Player");
    }
})();


function onGameStart() {
    console.log("start");
    document.body.classList.remove("gameover");
    document.body.classList.remove("completed");
    document.body.classList.add("gameactive");
}

function onGameEnd(scoreboard: Scoreboard, reason: string) {
    document.body.classList.remove("gameactive");
    document.body.classList.add("gameover");
    if (reason === "completed") {
        document.body.classList.add(reason);
    }

    const template = document.getElementById("score-item") as HTMLTemplateElement;
    const scoreboardContainer = document.getElementById("scores-list") as HTMLDivElement;

    scoreboardContainer.innerHTML = "";

    for (const score of scoreboard.scores) {
        const clone = template.content.cloneNode(true) as HTMLDivElement;
        clone.querySelector(".name").innerHTML = score.name;
        clone.querySelector(".time").innerHTML = new Date(score.score).toISOString().slice(14, -1);
        scoreboardContainer.appendChild(clone);
    }

    document.getElementById("scores").click = () => {
        game.controls.simulateButtonPress("start");
    };

    document.getElementById("scores").ontouchend = () => {
        game.controls.simulateButtonPress("start");
    };
}


export { };
