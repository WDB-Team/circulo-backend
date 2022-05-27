//-->...
import { Schema, Model, Connection, Types } from "mongoose";
//--
class BoySchema {
	//--
	private schema: Schema<any, any, any, any>;
	//--
	constructor() {
		this.schema = this.Make_Schema();
	}
	//& metodos...
	/**
	 * @description: Define el esquema que seguiran todos los boys en la DB.
	 * @returns: Schema<any>.
	 */
	private Make_Schema(): Schema<any> {
		return new Schema(
			{
				user_id: {
					type: Types.ObjectId,
					required: true,
				},
				full_name: { type: String, required: true },
				edad: { type: Number, required: true },
				sexo: { type: String, required: true },
				alimentos_dañinos: { type: [String], required: true },
				little_description: { type: String, required: true },
			},
			{
				timestamps: {
					createdAt: "createdat:",
					updatedAt: "updatedat:",
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
			const model: Model<any> = connection.model("boys", this.schema);
			if (model) {
				resolve(true);
			} else {
				reject(`boys`);
			}
		});
	}
}
export default BoySchema;
