//-->...
import { Connection, Model } from "mongoose";
import UserSchema from "../schemas/user_schema.js";
import BoySchema from "../schemas/boy_schema.js";
//--
class ModelFactory {
	//--
	private user_sechema: UserSchema;
	private boy_sechema: BoySchema;
	//--
	constructor() {
		this.user_sechema = new UserSchema();
		this.boy_sechema = new BoySchema();
	}
	//& Metodos...!
	/**
	 * @description:
	 * @param model_name:
	 * @param connection:
	 * @returns:
	 */
	public async getModel(
		model_name: string,
		connection: Connection,
	): Promise<Model<any>> {
		return new Promise<Model<any>>(function (
			resolve: Function,
			reject: Function,
		) {
			let model: Model<any>;
			if (connection.modelNames().includes(model_name)) {
				model = connection.model(model_name);
				resolve(model);
			} else {
				reject(
					`El modelo especificado: <<${model_name}>> no existe en la coneccion: ${connection.name}..!`,
				);
			}
		});
	}
	/**
	 * @description:
	 * @param connection:
	 * @returns:
	 */
	public async createModelsToSpecifiedConnection(
		connection: Connection,
	): Promise<boolean> {
		let bs: boolean = true;
		try {
			bs = await this.user_sechema.createModel(connection);
			bs = await this.boy_sechema.createModel(connection);
		} catch (error: any) {
			process.exit(1);
		}
		return bs;
	}
}
//--
export default ModelFactory;
