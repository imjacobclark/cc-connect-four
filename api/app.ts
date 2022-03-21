import { Application, Router, helpers } from "https://deno.land/x/oak/mod.ts";
import Engine from './src/Engine.ts'
import Board from './src/Board.ts'
import State from './src/State.ts'
import Player from './src/Player.ts'
import PlayerFactory from "./src/PlayerFactory.ts";

const games = new Map<string, Engine>();

const startState: State = new State([
    [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    [Player.Red,Player.Red,Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
], undefined);

const router = new Router();
router
    .post("/games/new", (context) => {
        const uuid = crypto.randomUUID();
        const board: Board = new Board(startState);
        const engine = new Engine(board);
        games.set(uuid, engine);

        context.response.body = {
            uuid
        }
    })
    .get("/games/board/:id", (context) => {
        const query = helpers.getQuery(context, { mergeParams: true });

        context.response.body = {
            board: games.get(query.id)?.board
        }
    })
    .post("/games/board/:id/play", async (context) => {
        const query = helpers.getQuery(context, { mergeParams: true });
        const result = context.request.body({ type: "json" });
        const body = await result.value;

        const game = games.get(query.id);
        game?.dropToken(body.col, PlayerFactory.getPlayer(body.player));

        context.response.body = {
            positions: game
        }
    });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });