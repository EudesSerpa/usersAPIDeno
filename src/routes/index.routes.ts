import { Router } from "https://deno.land/x/oak/mod.ts";

import {
    getUser,
    getUsers,
    deleteUser,
    postUser,
    putUser
} from "../controllers/index.controllers.ts";


const router = new Router();

router
    .get("/", (ctx) => {
        ctx.response.body = "Home";
    })
    .get("/users/:id", getUser)
    .get("/users", getUsers)
    .delete("/users/:id", deleteUser)
    .post("/users", postUser)
    .put("/users/:id", putUser);


export default router;