//-->...
import { Model, Connection, Types, Document } from "mongoose";
import ModelFactory from "../../utils/models/model_factory.js";
import StorageInit from "../../library/mongodbconnection.js";
//--
class BoyStorage {
	//--
	private storage: StorageInit;
	private model_factory: ModelFactory;
	//--
	constructor() {
		this.storage = new StorageInit();
		this.model_factory = new ModelFactory();
	}
	//& Metodos...!
	/**
	 * @description: Este metodo añadira un niño a la Mongo_DB.
	 * @param boy: Es el niño(Object) que se añadira a la base de datos de Mongo.
	 * @returns: Promise<any>.
	 */
	public async addBoyToMongoDB(boy: Object): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		const model: Model<any> = await this.model_factory.getModel(
			"boys",
			connection,
		);
		const document: Document = new model(boy);
		return new Promise<any>((resolve: Function, reject: Function) => {
			document.save(
				{ validateBeforeSave: true },
				function (error: any, document: Document<any>) {
					if (error) {
						reject({
							reason:
								"Ha ocurrido un error a la hora de guardar el niño en el sistema...!" +
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
	 * @description: Este metodo eliminara un niño de la Mongo_DB.
	 * @param boy_id: Es el niño del systema.
	 * @returns: Promise<any>.
	 */
	public async deleteBoyOfMongoDB(boy_id: string): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("boys")
				.deleteOne(
					{ _id: Types.ObjectId.createFromHexString(boy_id) },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de eliminar el niño correspondiente en la Mongo_DB: " +
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
	 * @description: Este metodo actualizara el nombre del niño.
	 * @param boy_id: Es el niño del sistema.
	 * @param new_fullname: Es el nuevo nombre del niño del systema.
	 * @returns:Promise<any>.
	 */
	public async updateFullNameOfBoyMongoDB(
		boy_id: string,
		new_fullname: string,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("boys")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(boy_id) },
					{ $set: { full_name: new_fullname } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar el nombre del niño en la Mongo_DB: " +
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
	 * @description: Este metodo actualizara la descripcion del niño.
	 * @param boy_id: Es el niño del systema.
	 * @param new_little_description: Es la nueva descripcion del niño del systema.
	 * @returns: Promise<any>.
	 */
	public async updateLittleDescriptionOfBoyMongoDB(
		boy_id: string,
		new_little_description: string,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("boys")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(boy_id) },
					{ $set: { little_description: new_little_description } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar la descripcion del niño en la Mongo_DB: " +
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
	 * @description: Este metodo actualizara la edad del niño.
	 * @param boy_id: Es el niño del systema.
	 * @param new_age: Es la nueva edad del niño del systema.
	 * @returns: Promise<any>.
	 */
	public async updateAgeOfBoyMongoDB(
		boy_id: string,
		new_age: number,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			if (!Number.isFinite(new_age)) {
				reject({
					reason: "El tipo de dato en la edad del menor no es correcto.",
				});
			}
			connection.db
				.collection("boys")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(boy_id) },
					{ $set: { edad: new_age } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar la edad del niño en la Mongo_DB: " +
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
	 * @description: Este metodo actualizara el sexo del niño.
	 * @param boy_id: Es el niño del systema.
	 * @param new_sex: Es el nuevo sexo del niño del systema.
	 * @returns: Promise<any>.
	 */
	public async updateSexOfBoyMongoDB(
		boy_id: string,
		new_sex: string,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			if (!new_sex.length) {
				reject({
					reason: "El tipo de dato en el sexo del menor no es correcto.",
				});
			}
			connection.db
				.collection("boys")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(boy_id) },
					{ $set: { sexo: new_sex } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar el sexo del niño en la Mongo_DB: " +
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
	 * @description: Este metodo actualizara la direccion del niño.
	 * @param boy_id: Es el niño del systema.
	 * @param new_address: Es la nueva direccion del niño del sistema.
	 * @returns: Promise<any>.
	 */
	public async updateAddressOfBoyMongoDB(
		boy_id: string,
		new_address: string,
	): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("boys")
				.updateOne(
					{ _id: Types.ObjectId.createFromHexString(boy_id) },
					{ $set: { residencia: new_address } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason:
									"Ha ocurrido un error a la hora de actualizar la direccion del niño en la Mongo_DB: " +
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
	 * @description: Este metodo obtendra los detalles del niño especificado.
	 * @param boy_id: Es el niño del systema.
	 * @returns: Promise<any>
	 */
	public async searchBoyByIdMongoDB(boy_id: string): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("boys")
				.findOne(
					{ _id: Types.ObjectId.createFromHexString(boy_id) },
					{ projection: { __v: 0 } },
					function (error: any, result: any) {
						if (error) {
							reject({
								reason: `Ha ocurrido un error a la hora de buscar el niño por su id en la Mongo_DB: ${error}`,
							});
						} else {
							resolve(result);
						}
					},
				);
		});
	}
	/**
	 * @description: Este metodo obtendra todos los hijos de un padre.
	 * @param user_id: Es el niño del systema.
	 * @returns: Promise<any>
	 */
	public async getAllBoyOfParentMongoDB(user_id: string): Promise<any> {
		const connection: Connection = await this.storage.getConnection();
		return new Promise<any>(function (resolve: Function, reject: Function) {
			connection.db
				.collection("boys")
				.find(
					{ user_id: Types.ObjectId.createFromHexString(user_id) },
					{ projection: { __v: 0 } },
				)
				.toArray(function (error: any, result: any) {
					if (error) {
						reject({
							reason:
								"Ha ocurrido un error a la hora de obtener todos los niños dado un tutor en la Mongo_DB: " +
								error,
						});
					} else {
						resolve(result);
					}
				});
		});
	}
}
//--
export default BoyStorage;
