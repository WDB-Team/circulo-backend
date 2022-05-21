//-->...
import { Response, Request } from "express";
//--
function Success(request: Request, response: Response, message: any, status: number): void {
  response.header({
    "Custom-Headers": "Tipo-Personalizado...!",
  });
  response.status(status || 200).send({
    Error: "",
    Body: message,
  });
}
//--
function Errors(request: Request, response: Response, message: any, status: number): void {
  response.header({
    "Custom-Headers": "Tipo-Personalizado...!",
  });
  response.status(status || 500).send({
    Error: message,
    Body: "",
  });
}
//--
export default { Success, Errors };
