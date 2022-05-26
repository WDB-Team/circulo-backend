//-->...
import express from "express";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
//--
import auth_router from "./routes/auth_routes.js";
import user_router from "./routes/users/user_routes.js";
import boy_router from "./routes/boys/boy_routes.js";
//--
import Storage_Init from "./library/mongodbconnection.js";
import errorsHandlers from "./utils/middlewares/errors_handlers.js";
//--
const app: express.Application = express();
//--
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
(async () => {
	const storage_init: Storage_Init = new Storage_Init();
	await storage_init.circuloServiceConnection();
})();
//--
//-- Ruteo de los servicios...
app.use("/api/authorization", auth_router);
app.use("/api/user", user_router);
app.use("/api/boy", boy_router);
//--
//--Errors Handlers
app.use(errorsHandlers.logErrors);
app.use(errorsHandlers.errorHandler);
//--
const port: string | number = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(
		`La aplicacion esta escuchando en http://localhost:${port} ....!`,
	);
});
