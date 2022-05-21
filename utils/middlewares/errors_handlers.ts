//-->...
import { Request, Response } from "express";
import settings from "../../configs/settings";
import responses from "./responses.js";
/**
 * @description: Es el middleware que tratara todos los errorres del proyecto.
 * @param next: Es la callback que llamara al siguiente middleware.
 */
function logErrors(
	error: any,
	request: Request,
	response: Response,
	next: Function,
): void {
	console.error("Error capturado por el middleware:", error);
	next(error);
}
/**
 * @description: Es el middleware que tratara todos los errorres de streams del proyecto. Es decir cuando se envia un
 *               decumento en la response desde el server y este es demaciado grande y se tiene que mandar por trozos.
 * @param next: Es la callback que llamara al siguiente middleware.(Aqui ya es al middleware por defecto de express).
 */
function errorHandler(
	error: any,
	request: Request,
	response: Response,
	next: Function,
): void {
	//--catch errors while streams
	if (response.headersSent) {
		next(error);
	}
	const error_status: number = error.status || 500;
	responses.Errors(
		request,
		response,
		error.reason + " (error interno)",
		error_status,
	);
}
//--
export default { logErrors, errorHandler };
