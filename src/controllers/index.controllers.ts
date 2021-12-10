import { Context, RouterContext } from "https://deno.land/x/oak/mod.ts";

import client from "../database/db.ts";
import { User } from "../user.ts";


export const getUser = async (ctx: RouterContext<"/users/:id">) => {
    try {
        const id = Number(ctx.params.id);

        if (!id) throw new Error("Invalid id");

        const user = await client.query(
            "SELECT * FROM users WHERE idusers = ? LIMIT 1",
            [id]
        );

        if (!user[0]) throw new Error("User not exist");

        ctx.response.status = 200;
        ctx.response.body = {
            message: "User received",
            user,
        };
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = {
            message: "Invalid request",
            error: error.message,
        };
    }
};

export const getUsers = async (ctx: Context) => {
    try {
        const users = await client.query(`SELECT * FROM users`);

        ctx.response.status = 200;
        ctx.response.body = {
            message: "Received",
            users,
        };
    } catch (error) {
        console.log(error.message);

        ctx.response.status = 400;
        ctx.response.body = {
            message: "Invalid request",
            error: error.message,
        };
    }
};

export const deleteUser = async (ctx: RouterContext<"/users/:id">) => {
    try {
        const id = Number(ctx.params.id);

        if (!id) throw new Error("Invalid id");

        let responseDelete = await client.execute(
            `DELETE FROM users WHERE idusers = ? LIMIT 1`,
            [id]
        );

        if (responseDelete.affectedRows) {
            ctx.response.status = 200;
            ctx.response.body = {
                message: "User deleted"
            };
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = {
            message: "Invalid request",
            error: error.message,
        };
    }
};

export const postUser = async (ctx: Context) => {
    try {
        const newUser: User = await ctx.request.body().value;

        await client.execute(`INSERT INTO users(name, country) VALUES(?, ?)`, [
            newUser.name,
            newUser.country,
        ]);

        ctx.response.status = 200;
        ctx.response.body = {
            message: "User created successfully",
            newUser,
        };
    } catch (error) {
        console.log(error.message);

        ctx.response.status = 400;
        ctx.response.body = {
            message: "Invalid request",
            error: error.message,
        };
    }
};

export const putUser = async (ctx: RouterContext<"/users/:id">) => {
    try {
        const id = Number(ctx.params.id);

        if (!id) throw new Error("Invalid id");

        const newData: User = await ctx.request.body().value;

        let responseUpdate = await client.execute(`UPDATE users
            SET name = ?, country = ? WHERE (idusers = ?) LIMIT 1`, [
            newData.name,
            newData.country,
            id
        ]);

        if (responseUpdate.affectedRows) {
            ctx.response.status = 200;
            ctx.response.body = {
                message: "User updated",
                newData
            };
        } else {
            ctx.response.status = 404;
            ctx.response.body = {
                message: "User not found",
            };
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = {
        message: "Invalid request",
        error: error.message,
        };
    }
};