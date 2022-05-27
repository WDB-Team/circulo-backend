//-->...
import { Document } from "mongoose";
import BoyStorage from "./boy_storage";
//--
class BoyController {
	//--
	private boy_storage: BoyStorage;
	//--
	constructor() {
		this.boy_storage = new BoyStorage();
	}
	//& Metodos...
	/**
	 * @description: Este metodo controlador llamara al metodo boy_storage.addBoyToMongoDB.
	 * @param boy: Objeto niño.
	 * @returns: Promise<any>.
	 */
	public async addBoy(boy: {
		user_id: string;
		full_name: string;
		edad: number;
		sexo: string;
		alimentos_dañinos: string[];
		little_description: string;
	}): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			user_id: any;
		};
		try {
			transaction = await this.boy_storage.addBoyToMongoDB(boy);
			if (transaction.successfully_transaction) {
				return transaction;
			}
		} catch (err) {
			return { error: err };
		}
	}
	/**
	 * @description: Este metodo controlador llamara al metodo boy_storage.deleteBoyOfMongoDB.
	 * @param boy_id: Es el niño del sistema.
	 * @returns: Promise<any>.
	 */
	public async deleteBoyOf(boy_id: string): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_deleted: any;
		};
		try {
			transaction = await this.boy_storage.deleteBoyOfMongoDB(boy_id);
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
	 * @description: Este metodo controlador llamara al metodo boy_storage.updateFullNameOfBoyMongoDB.
	 * @param boy_id: Es el niño del sistema.
	 * @param new_fullname: Es el nuevo nombre del niño.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async updateFullNameOfBoy(
		boy_id: string,
		new_fullname: string,
	): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			transaction = await this.boy_storage.updateFullNameOfBoyMongoDB(
				boy_id,
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
	 * @description: Este metodo controlador llamara al metodo boy_storage.updateLittleDescriptionOfBoyMongoDB.
	 * @param boy_id: Es el niño del sistema.
	 * @param new_little_description: Es la nueva descripcion del niño.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async updateLittleDescriptionOfBoy(
		boy_id: string,
		new_little_description: string,
	): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			transaction = await this.boy_storage.updateLittleDescriptionOfBoyMongoDB(
				boy_id,
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
	 * @description: Este metodo controlador llamara al metodo boy_storage.updateAgeOfBoyMongoDB.
	 * @param boy_id: Es el niño del sistema.
	 * @param new_age: Es la nueva edad del niño.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async updateAgeOfBoy(boy_id: string, new_age: number): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			transaction = await this.boy_storage.updateAgeOfBoyMongoDB(
				boy_id,
				new_age,
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
	 * @description: Este metodo controlador llamara al metodo boy_storage.updateSexOfBoyMongoDB.
	 * @param boy_id: Es el niño del sistema.
	 * @param new_sex: Es el nuevo sexo del niño.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async updateSexOfBoy(boy_id: string, new_sex: string): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched?: any;
		};
		try {
			transaction = await this.boy_storage.updateSexOfBoyMongoDB(
				boy_id,
				new_sex,
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
	 * @description: Este metodo controlador llamara al metodo boy_storage.addHarmfulFoodMongoDB.
	 * @param boy_id: Es el niño del systema.
	 * @param dangerous_food: Son los nuevos alimentos dañinos del niño.
	 * @returns: Promise<any>. Caso:1- en caso de una actualizacion satisfactoria retorna: 1.
	 *                         Caso:2- en caso de no actualizacion por ya existencia del dato retorna: 2.
	 *                         Caso:3- en caso de que el user_id no coincida con ninguno en la mongoDB retorna 0.
	 *                         Caso:4- en caso de un error retorna un objeto con el error.
	 */
	public async addHarmfulFood(
		boy_id: string,
		dangerous_food: string[],
	): Promise<any> {
		let transaction: {
			successfully_transaction: boolean;
			count_modificados: any;
			matched: any;
		};
		try {
			transaction = await this.boy_storage.addHarmfulFoodMongoDB(
				boy_id,
				dangerous_food,
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
	 * @description: Este metodo controlador llamara al metodo boy_storage.searchBoyByIdMongoDB.
	 * @param boy_id: Es el niño del sistema.
	 * @returns: Promise<any>. Caso:1- en caso de una busqueda satisfactoria retorna: document.
	 *                         Caso:2- en caso de no encontrar el id del proyecto retorna: 0.
	 *                         Caso:3- en caso de un error retorna un objeto con el error.
	 */
	public async searchBoyById(boy_id: string): Promise<any> {
		let document: Document;
		try {
			document = await this.boy_storage.searchBoyByIdMongoDB(boy_id);
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
	 * @description: Este metodo controlador llamara al metodo boy_storage.getAllBoyOfParentMongoDB.
	 * @param user_id: Hace referencia a un usuario especificado.
	 * @returns: Promise<any>
	 */
	public async getAllBoyOfParent(user_id: string): Promise<any> {
		let array_documents: Document<any>[];
		try {
			array_documents = await this.boy_storage.getAllBoyOfParentMongoDB(
				user_id,
			);
			return array_documents;
		} catch (err: any) {
			return { error: err };
		}
	}
}
//--
export default BoyController;
