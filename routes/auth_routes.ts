//-->..
import UserSystemController from "../services/users/user_controller.js";
import config from "../configs/settings.js";
import responses from "../utils/middlewares/responses.js";
import express, { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
//--
//--Importando la estrategia basic.
require("../security/basic.js");
const usersystem_controller: UserSystemController = new UserSystemController();
const router: Router = express.Router();
router.get(
	"/inicio",
	async function (request: Request, response: Response, next: NextFunction) {
		response.send("hola llego...!");
	},
);
/**
 * @description:
 */
router.get(
	"/sign-in",
	async function (request: Request, response: Response, next: NextFunction) {
		passport.authenticate(
			"basic",
			{ session: false },
			function (
				error: any,
				user: {
					_id: Types.ObjectId;
					full_name: string;
					email: string;
					password: string | any;
					little_description: string;
				},
			) {
				try {
					if (error || !user) {
						responses.Errors(
							request,
							response,
							boom.unauthorized().message,
							400,
						);
					}
					const token: string = jwt.sign(
						{
							user_id: user._id,
							email: user.email,
							full_name: user.full_name,
						},
						config.JWT_SECRET.authJwtSecret,
						{ expiresIn: "90d" },
					);
					responses.Success(request, response, [user._id, token], 200);
				} catch (error: any) {
					next(error);
				}
			},
		)(request, response, next);
	},
);
/**
 * @description:
 */
router.post(
	"/sign-up",
	async function (request: Request, response: Response, next: NextFunction) {
		if (
			!request.body.full_name ||
			!request.body.email ||
			!request.body.password ||
			!request.body.little_description
		) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const transaction: {
				successfully_transaction?: boolean;
				user_id?: any;
				error?: any;
			} = await usersystem_controller.addUserSystem(request.body);
			if (transaction.user_id) {
				const token: string = jwt.sign(
					{
						user_id: transaction.user_id,
						email: request.body.email,
						full_name: request.body.full_name,
					},
					config.JWT_SECRET.authJwtSecret,
					{ expiresIn: "90d" },
				);
				responses.Success(request, response, [transaction.user_id, token], 201);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
//--
export default router;
