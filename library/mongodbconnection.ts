//-->...
import mongoose from "mongoose";
import config from "../configs/settings.js";
import ModelFactory from "../utils/models/model_factory.js";
//--
class Storage_Init {
	//--
	private readonly mongo_connection_start: string = "mongodb+srv://";
	private readonly complemento_url: string = "?retryWrites=true&w=majority";
	private model_factory: ModelFactory;
	//--
	constructor() {
		this.model_factory = new ModelFactory();
	}
	//& Getters and Setters...!
	/**
	 * @description: Establecera la conexcion por default con la Mongo_DB.
	 * @returns: Promise<void> .
	 */
	public async circuloServiceConnection(): Promise<void> {
		const mongo_host_name: string = encodeURIComponent(config.MONGO_ATLAS_CIRCULO_SERVICE.dbHost);
		const mongo_port: string = encodeURIComponent(config.MONGO_ATLAS_CIRCULO_SERVICE.dbPort);
		const mongo_db_name: string = encodeURIComponent(config.MONGO_ATLAS_CIRCULO_SERVICE.dbName);
		const mongo_db_user: string = encodeURIComponent(config.MONGO_ATLAS_CIRCULO_SERVICE.dbUser);
		const mongo_db_password: string = encodeURIComponent(
			config.MONGO_ATLAS_CIRCULO_SERVICE.dbPassword,
		);
		const URL: string = `${this.mongo_connection_start}${mongo_db_user}:${mongo_db_password}@${mongo_host_name}/${mongo_db_name}${this.complemento_url}`;
		if (mongoose.connection.readyState === 1) {
			return;
		}
		try {
			await mongoose.connect(URL, {
				keepAlive: true,
				maxPoolSize: 15,
				connectTimeoutMS: 30000,
				socketTimeoutMS: 30000,
				autoIndex: true,
				dbName: mongo_db_name,
			});
			await this.model_factory.createModelsToSpecifiedConnection(mongoose.connection);
			console.log(`The ${mongo_db_name} connection state is:`, mongoose.connection.readyState);
		} catch (error: any) {
			console.error(
				`Ha ocurrido un error:${error.message} a la hora de establecer la conexcion por defecto con la base de datos de Mongo_DB...!`,
			);
			process.exit(1);
		}
	}
	/**
	 * @description: Proporciona la conneccion a CirculoService.
	 * @returns: Promise<mongoose.Connection>.
	 */
	public async getConnection(): Promise<mongoose.Connection> {
		let object_connection: mongoose.Connection | null = mongoose.connection;
		if (object_connection) {
			return object_connection;
		} else {
			await this.circuloServiceConnection();
			return mongoose.connection;
		}
	}
}
//-
export default Storage_Init;
