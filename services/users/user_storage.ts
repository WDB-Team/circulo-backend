//-->...
import { Model, Connection, Types, Document } from "mongoose";
import ModelFactory from "../../utils/models/model_factory.js";
import StorageInit from "../../library/mongodbconnection.js";
//--
class UserSystemStorage {
	//--
	private storage: StorageInit;
	private model_factory: ModelFactory;
	//--
	constructor() {
		this.storage = new StorageInit();
		this.model_factory = new ModelFactory();
	}
	//& Metodos...
	/**
	 * @description: Este metodo añadira un usuario a la Mongo_DB.
	 * @param user: Es el usuario(Object) que se añadira a la base de datos de Mongo.
	 * @returns: Promise<any>.
	 */
	public async addUserSystemMongoDB(user: Object): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		const model: Model<any> = await this.model_factory.getModel(
			"users",
			connection,
		);
		const document: Document = new model(user);
		return new Promise<any>((resolve: Function, reject: Function) => {
			document.save(
				{ validateBeforeSave: true },
				function (error: any, document: Document<any>) {
					if (error) {
						reject({
							reason:
								"Ha ocurrido un error a la hora de guardar el usuario en el systema...!" +
								error,
						});
					} else {
						resolve({
							successfully_transaction: true,
							user_id: document._id,
						});
					}
				},
			);
		});
	}
	/**
	 * @description: Este metodo eliminara un usuario de la Mongo_DB.
	 * @param user_id: Es el usuario del systema.
	 * @returns: Promise<any>.
	 */
	public async deleteUserSystemMongoDB(user_id: string): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("users")
				.deleteOne(
					{ _id: Types.ObjectId.createFromHexString(user_id) },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de eliminar el usuario correspondiente en la Mongo_DB: " +
									error,
							});
						} else {
							resolve({
								successfully_transaction: true,
								count_deleted: result.deletedCount,
							});
						}
					},
				);
		});
	}
	/**
	 * @description: Este metodo actualizara el nombre del usuario.
	 * @param user_id: Es el usuario del sistema.
	 * @param new_fullname: Es el nuevo nombre del usuario del systema.
	 * @returns:Promise<any>.
	 */
	public async updateFullNameOfUserMongoDB(
		user_id: string,
		new_fullname: string,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("users")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(user_id) },
					{ $set: { full_name: new_fullname } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar el nombre del usuario en la Mongo_DB: " +
									error,
							});
						} else {
							resolve({
								successfully_transaction: true,
								count_modificados: result.modifiedCount,
								matched: result.matchedCount,
							});
						}
					},
				);
		});
	}
	/**
	 * @description: Este metodo actualizara el email del usuario.
	 * @param user_id: Es el usuario del sistema.
	 * @param new_email: Es el nuevo email del usuario del systema.
	 * @returns: Promise<any>
	 */
	public async updateEmailOfUserMongoDB(
		user_id: string,
		new_email: string,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("users")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(user_id) },
					{ $set: { email: new_email } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar el email del usuario en la Mongo_DB: " +
									error,
							});
						} else {
							resolve({
								successfully_transaction: true,
								count_modificados: result.modifiedCount,
								matched: result.matchedCount,
							});
						}
					},
				);
		});
	}
	/**
	 * @description: Este metodo actualizara el password del usuario.
	 * @param user_id: Es el usuario del sistema.
	 * @param new_password: Es el nuevo password del usuario del systema.
	 * @returns: Promise<any>.
	 */
	public async updatePasswordOfUserMongoDB(
		user_id: string,
		new_password: string,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("users")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(user_id) },
					{ $set: { password: new_password } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar el password del usuario en la Mongo_DB: " +
									error,
							});
						} else {
							resolve({
								successfully_transaction: true,
								count_modificados: result.modifiedCount,
								matched: result.matchedCount,
							});
						}
					},
				);
		});
	}
	/**
	 * @description: Este metodo actualizara la descripcion del usuario.
	 * @param user_id: Es el usuario del systema.
	 * @param new_little_description: Es la nueva descripcion del usuario del systema.
	 * @returns: Promise<any>.
	 */
	public async updateLittleDescriptionOfUserMongoDB(
		user_id: string,
		new_little_description: string,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("users")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(user_id) },
					{ $set: { little_description: new_little_description } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar la descripcion del usuario en la Mongo_DB: " +
									error,
							});
						} else {
							resolve({
								successfully_transaction: true,
								count_modificados: result.modifiedCount,
								matched: result.matchedCount,
							});
						}
					},
				);
		});
	}
	/**
	 * @description: Este metodo buscara el usuario por el id especificado.
	 * @param user_id: Es el usuario del systema.
	 * @returns: Promise<any>.
	 */
	public async searchUserByIdMongoDB(user_id: string): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("users")
				.findOne(
					{ _id: Types.ObjectId.createFromHexString(user_id) },
					{ projection: { __v: 0 } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason: `Ha ocurrido un error a la hora de buscar el usuario por su id en la Mongo_DB: ${error}`,
							});
						} else {
							resolve(result);
						}
					},
				);
		});
	}
	/**
	 * @description: Este metodo buscara el usuario por el email especificado.
	 * @param email_search: Es el email del usuario.
	 * @returns: Promise<any>.
	 */
	public async searchUserByEmailMongoDB(email_search: string): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("users")
				.findOne(
					{ email: email_search },
					{ projection: { __v: 0 } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason: `Ha ocurrido un error a la hora de buscar el usuario por su email en la Mongo_DB: ${error}`,
							});
						} else {
							resolve(result);
						}
					},
				);
		});
	}
}
//--
export default UserSystemStorage;
