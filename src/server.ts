import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log("🔌 MongoDB database connected successfully!");

        server = app.listen(envVars.PORT, () => {
            console.log(`🔥 Server is listening at port ${envVars.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();

// ! server specific error handling
process.on("unhandledRejection", (err) => {
    console.log(
        "🏴‍☠️ 🏴‍☠️ Unhandled rejection detected...Server shutting down..",
        err
    );
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.log(
        "🏴‍☠️ 🏴‍☠️ uncaughtException detected...Server shutting down..",
        err
    );
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("SIGTERM", () => {
    console.log("Sigterm signal detected... server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
});
