//-->...
import UserSystemController from "../../services/users/user_controller.js";
import responses from "../../utils/middlewares/responses.js";
import express, { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
//--
//--Importando la estrategia JWT.
require("../../security/jwt.js");
const usersystem_controller: UserSystemController = new UserSystemController();
const router: Router = express.Router();
/**
 * @description:
 */
router.get(
	"/getAllBoyOfUser",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.user_id) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const array_documents: any = await usersystem_controller.getAllBoyOfUser(
				request.body.user_id,
			);
			if (array_documents === 0) {
				responses.Errors(request, response, "El usuario no posee niños...!", 400);
			}
			if (array_documents) {
				responses.Success(request, response, array_documents, 200);
			}
			if (array_documents.error) {
				next(array_documents.error);
			}
		}
	},
);
/**
 * @description:
 */
router.get(
	"/searchUserById",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.user_id) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const document: any = await usersystem_controller.searchUserById(request.body.user_id);
			if (document._id) {
				responses.Success(request, response, document, 200);
			}
			if (document === 0) {
				responses.Errors(request, response, "User no encontrado...!", 400);
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
router.get(
	"/searchUserByEmail",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.email) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const document: any = await usersystem_controller.searchUserByEmail(request.body.email);
			if (document._id) {
				responses.Success(request, response, document, 200);
			}
			if (document === 0) {
				responses.Errors(request, response, "User no encontrado...!", 400);
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
	"/addUserSystem",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.full_name || !request.body.email || !request.body.password) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const transaction: any = await usersystem_controller.addUserSystem(request.body);
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
router.patch(
	"/updateFullNameOfUser",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.user_id || !request.body.new_fullname) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const transaction: any = await usersystem_controller.updateFullNameOfUser(
				request.body.user_id,
				request.body.new_fullname,
			);
			if (transaction === 1) {
				responses.Success(request, response, "Nombre del usuario actualizado...!", 200);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Nombre ya existente...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el usuario especificado por el id...!",
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
	"/updateEmailOfUser",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.user_id || !request.body.new_email) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const transaction: any = await usersystem_controller.updateEmailOfUser(
				request.body.user_id,
				request.body.new_email,
			);
			if (transaction === 1) {
				responses.Success(request, response, "Email del usuario actualizado...!", 200);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Email ya existente...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el usuario especificado por el id...!",
					400,
				);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
router.patch(
	"/updatePasswordOfUser",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.user_id || !request.body.new_password) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const transaction: any = await usersystem_controller.updatePasswordOfUser(
				request.body.user_id,
				request.body.new_password,
			);
			if (transaction === 1) {
				responses.Success(request, response, "Password del usuario actualizado...!", 200);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Password ya existente...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el usuario especificado por el id...!",
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
	"/updateLittleDescriptionOfUser",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.user_id || !request.body.new_little_description) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const transaction: any = await usersystem_controller.updateLittleDescriptionOfUser(
				request.body.user_id,
				request.body.new_little_description,
			);
			if (transaction === 1) {
				responses.Success(request, response, "Descripcion del usuario actualizada...!", 200);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Descripcion ya existente...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el usuario especificado por el id...!",
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
	"/updateAddressOfUser",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.user_id || !request.body.new_address) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const transaction: any = await usersystem_controller.updateAddressOfUser(
				request.body.user_id,
				request.body.new_address,
			);
			if (transaction === 1) {
				responses.Success(request, response, "Direccion del usuario actualizada...!", 200);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Direccion ya existente...!", 400);
			}
			if (transaction === 0) {
				responses.Errors(
					request,
					response,
					"No se pudo encontrar el usuario especificado por el id...!",
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
router.delete(
	"/deleteUserSystem",
	passport.authenticate("jwt", { session: false }),
	async function (request: Request, response: Response, next: NextFunction) {
		if (!request.body.user_id) {
			responses.Errors(request, response, "Envio de informacion invalida...!", 400);
		} else {
			const transaction: any = await usersystem_controller.deleteUserSystem(request.body.user_id);
			if (transaction === 1) {
				responses.Success(request, response, "Usuario eliminado...!", 200);
			}
			if (transaction === 2) {
				responses.Errors(request, response, "Usuario no existente...!", 400);
			}
			if (transaction.error) {
				next(transaction.error);
			}
		}
	},
);
//--
export default router;
