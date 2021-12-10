import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { parse } from "https://deno.land/std@0.117.0/flags/mod.ts";

import router from './routes/index.routes.ts';

const app = new Application();

const DEFAULT_PORT = 8080;
const portFromArgs = parse(Deno.args).port;
const port = portFromArgs ?? DEFAULT_PORT;

app.use(router.routes());
app.use(router.allowedMethods());


app.addEventListener("error", (evt) => {
    console.log(evt.error);
});


console.log(`Listening on port: ${port}`);
await app.listen({ port });