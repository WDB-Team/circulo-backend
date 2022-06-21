//-->...
import { Schema, Connection, Model, Types } from "mongoose";
//--
class UserSchema {
	//--
	private schema: Schema<any>;
	//--
	constructor() {
		this.schema = this.makeSchema();
	}
	//& metodos...
	/**
	 * @description: Define el esquema que seguiran todos los usuarios en la DB.
	 * @returns: Schema<any>.
	 */
	private makeSchema(): Schema<any> {
		return new Schema(
			{
				full_name: { type: String, required: true },
				email: { type: String, required: true },
				password: { type: String, required: true },
				residencia: { type: String, required: false },
				little_description: { type: String, required: false },
			},
			{
				timestamps: {
					createdAt: "created at:",
					updatedAt: "updated at:",
				},
			},
		);
	}
	/**
	 * @description: Crea el modelo a partir del esquema definido.
	 * @param connection: Conexcion a la que se le creara el modelo.
	 * @returns: Promise<boolean>.
	 */
	public createModel(connection: Connection): Promise<boolean> {
		return new Promise<boolean>((resolve: Function, reject: Function) => {
			const model: Model<any> = connection.model("users", this.schema);
			if (model) {
				resolve(true);
			} else {
				reject(`users`);
			}
		});
	}
}
export default UserSchema;
