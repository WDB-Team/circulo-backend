//-->...
import { Document } from "mongoose";
import bcrypt from "bcrypt";
import UserSystemStorage from "./user_storage.js";
import BoyController from "../boys/boy_controller.js";
//--
class UserSystemController {
	//--
	private user_system_storage: UserSystemStorage;
	private boy_storage: BoyController;
	//--
	constructor() {
		this.user_system_storage = new UserSystemStorage();
		this.boy_storage = new BoyController();
	}
	//& Metodos...
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.addUserSystemMongoDB.
	 * @param user: Objeto usuario.
	 * @returns: Promise<any>.
	 */
	public async addUserSystem(user: {
		full_name: string;
		email: string;
		password: string;
		little_description: string;
	}): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			user_id: any;
		};
		try {
			user.password = await this.encryptPassword(user.password);
			transaction = await this.user_system_storage.addUserSystemMongoDB(user);
			if (transaction.successfully_transaction) {
				return transaction;
			}
		} catch (err) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.deleteUserSystemMongoDB.
	 * @param user_id: Es el usuario del systema.
	 * @returns: Promise<any>.
	 */
	public async deleteUserSystem(user_id: string): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_deleted: any;
		};
		try {
			transaction = await this.user_system_storage.deleteUserSystemMongoDB(
				user_id,
			);
			if (
				transaction.successfully_transaction &&
				transaction.count_deleted !== 0
			) {
				return 1;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_deleted === 0
			) {
				return 2;
			}
		} catch (err) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.updateFullNameOfUserMongoDB.
	 * @param user_id: Es el usuario del systema.
	 * @param new_fullname: Es el nuevo nombre del usuario.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async updateFullNameOfUser(
		user_id: string,
		new_fullname: string,
	): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			transaction = await this.user_system_storage.updateFullNameOfUserMongoDB(
				user_id,
				new_fullname,
			);
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados !== 0
			) {
				return 1;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched !== 0
			) {
				return 2;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched === 0
			) {
				return 0;
			}
		} catch (err: any) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.updateEmailOfUserMongoDB.
	 * @param user_id: Es el usuario del systema.
	 * @param new_email: Es el nuevo nombre del usuario.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async updateEmailOfUser(
		user_id: string,
		new_email: string,
	): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			transaction = await this.user_system_storage.updateEmailOfUserMongoDB(
				user_id,
				new_email,
			);
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados !== 0
			) {
				return 1;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched !== 0
			) {
				return 2;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched === 0
			) {
				return 0;
			}
		} catch (err: any) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.updatePasswordOfUserMongoDB.
	 * @param user_id: Es el usuario del systema.
	 * @param new_password: Es la nueva contraseña del usuario.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async updatePasswordOfUser(
		user_id: string,
		new_password: string,
	): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			new_password = await this.encryptPassword(new_password);
			transaction = await this.user_system_storage.updatePasswordOfUserMongoDB(
				user_id,
				new_password,
			);
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados !== 0
			) {
				return 1;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched !== 0
			) {
				return 2;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched === 0
			) {
				return 0;
			}
		} catch (err: any) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.updateLittleDescriptionOfUserMongoDB.
	 * @param user_id: Es el usuario del systema.
	 * @param new_little_description: Es la nueva descripcion del usuario.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async updateLittleDescriptionOfUser(
		user_id: string,
		new_little_description: string,
	): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			transaction =
				await this.user_system_storage.updateLittleDescriptionOfUserMongoDB(
					user_id,
					new_little_description,
				);
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados !== 0
			) {
				return 1;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched !== 0
			) {
				return 2;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched === 0
			) {
				return 0;
			}
		} catch (err: any) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.updateAddressOfUserMongoDB.
	 * @param user_id: Es el usuario del sistema.
	 * @param new_address: Es la nueva direccion del usuario.
	 * @returns: Promise<any>.
	 */
	public async updateAddressOfUser(
		user_id: string,
		new_address: string,
	): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			transaction = await this.user_system_storage.updateAddressOfUserMongoDB(
				user_id,
				new_address,
			);
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados !== 0
			) {
				return 1;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched !== 0
			) {
				return 2;
			}
			if (
				transaction.successfully_transaction &&
				transaction.count_modificados === 0 &&
				transaction.matched === 0
			) {
				return 0;
			}
		} catch (err: any) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.searchUserByIdMongoDB.
	 * @param user_id: Es el usuario del systema.
	 * @returns: Promise<any>. Caso:1- en caso de una busqueda satisfactoria retorna: document.
	 *                         Caso:2- en caso de no encontrar el id del proyecto retorna: 0.
	 *                         Caso:3- en caso de un error retorna un objeto con el error.
	 */
	public async searchUserById(user_id: string): Promise<any> {
		let document: Document;
		try {
			document = await this.user_system_storage.searchUserByIdMongoDB(user_id);
			if (document) {
				return document;
			}
			if (!document) {
				return 0;
			}
		} catch (err) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo user_system_storage.searchUserByEmailMongoDB.
	 * @param email_search: Es el usuario del systema.
	 * @returns: Promise<any>. Caso:1- en caso de una busqueda satisfactoria retorna: document.
	 *                         Caso:2- en caso de no encontrar el id del proyecto retorna: 0.
	 *                         Caso:3- en caso de un error retorna un objeto con el error.
	 */
	public async searchUserByEmail(email_search: string): Promise<any> {
		let document: Document;
		try {
			document = await this.user_system_storage.searchUserByEmailMongoDB(
				email_search,
			);
			if (document) {
				return document;
			}
			if (!document) {
				return 0;
			}
		} catch (err) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo boy_storage.getAllBoyOfParent.
	 * @param user_id: Es el usuario del sistema.
	 * @returns: Promise<any>. Caso:1- en caso de una busqueda satisfactoria retorna: document.
	 *                         Caso:2- en caso de no encontrar el id del proyecto retorna: 0.
	 *                         Caso:3- en caso de un error retorna un objeto con el error.
	 */
	public async getAllBoyOfUser(user_id: string): Promise<any> {
		let array_documents: Document<any>[];
		try {
			array_documents = await this.boy_storage.getAllBoyOfParent(user_id);
			if (array_documents.length) {
				return array_documents;
			} else {
				return 0;
			}
		} catch (err: any) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo privado encriptara una cadena de caracteres(password).
	 * @param password: Es la cadena a encriptar.
	 * @returns: Promise<string>.
	 */
	private async encryptPassword(password: string): Promise<string> {
		const salt: number = 10;
		return await bcrypt.hash(password, salt);
	}
}
//--
export default UserSystemController;
