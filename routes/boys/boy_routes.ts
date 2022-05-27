//-->...
import BoyController from "../../services/boys/boy_controller.js";
import responses from "../../utils/middlewares/responses.js";
import express, { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
//--
//--Importando la estrategia JWT.
require("../../security/jwt.js");
const boy_controller: BoyController = new BoyController();
const router: Router = express.Router();
/**
 * @description:
 */
router.get(
	"/searchBoyById",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.boy_id) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const document: any = await boy_controller.searchBoyById(
				request.body.boy_id,
			);
			if (document._id) {
				responses.Success(request, response, document, 200);
			}
			if (document === 0) {
				responses.Errors(request, response, "Niño no encontrado...!", 400);
			}
			if (document.error) {
				next(document.error);
			}
		}
	},
);
/**
 * @description:
 */
router.post(
	"/addBoy",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (
			!request.body.user_id ||
			!request.body.full_name ||
			!request.body.edad ||
			!request.body.sexo ||
			!request.body.alimentos_dañinos ||
			request.body.alimentos_dañinos.length === 0 ||
			!request.body.little_description
		) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const transaction: any = await boy_controller.addBoy(request.body);
			if (transaction.user_id) {
				responses.Success(request, response, transaction.user_id, 201);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
/**
 * @description:
 */
router.delete(
	"/deleteBoyOf",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.boy_id) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const transaction: any = await boy_controller.deleteBoyOf(
				request.body.boy_id,
			);
			if (transaction === 1) {
				responses.Success(request, response, "Niño eliminado...!", 200);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Niño no existente...!", 400);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
/**
 * @description:
 */
router.patch(
	"/addHarmfulFood",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.boy_id || !request.body.dangerous_food) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const transaction: any = await boy_controller.addHarmfulFood(
				request.body.boy_id,
				request.body.dangerous_food,
			);
			if (transaction === 1) {
				responses.Success(request, response, "Alimentos añadidos...!", 200);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Alimentos ya existentes...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el niño especificado por el id...!",
					400,
				);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
/**
 * @description:
 */
router.patch(
	"/updateFullNameOfBoy",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.boy_id || !request.body.new_fullname) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const transaction: any = await boy_controller.updateFullNameOfBoy(
				request.body.boy_id,
				request.body.new_fullname,
			);
			if (transaction === 1) {
				responses.Success(
					request,
					response,
					"Nombre del niño actualizado...!",
					200,
				);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Nombre ya existente...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el niño especificado por el id...!",
					400,
				);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
/**
 * @description:
 */
router.patch(
	"/updateLittleDescriptionOfBoy",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.boy_id || !request.body.new_little_description) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const transaction: any =
				await boy_controller.updateLittleDescriptionOfBoy(
					request.body.boy_id,
					request.body.new_little_description,
				);
			if (transaction === 1) {
				responses.Success(
					request,
					response,
					"Descripcion del niño actualizada...!",
					200,
				);
			}
			if (transaction === 2) {
				responses.Errors(
					request,
					response,
					"Descripcion ya existente...!",
					400,
				);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el niño especificado por el id...!",
					400,
				);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
/**
 * @description:
 */
router.patch(
	"/updateAgeOfBoy",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.boy_id || !request.body.new_age) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const transaction: any = await boy_controller.updateAgeOfBoy(
				request.body.boy_id,
				request.body.new_age,
			);
			if (transaction === 1) {
				responses.Success(
					request,
					response,
					"Edad del niño actualizada...!",
					200,
				);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Edad ya existente...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el niño especificado por el id...!",
					400,
				);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
/**
 * @description:
 */
router.patch(
	"/updateSexOfBoy",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.boy_id || !request.body.new_sex) {
			responses.Errors(
				request,
				response,
				"Envio de informacion invalida...!",
				400,
			);
		} else {
			const transaction: any = await boy_controller.updateSexOfBoy(
				request.body.boy_id,
				request.body.new_sex,
			);
			if (transaction === 1) {
				responses.Success(
					request,
					response,
					"Sexo del niño actualizada...!",
					200,
				);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Sexo ya existente...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el niño especificado por el id...!",
					400,
				);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
//--
export default router;
