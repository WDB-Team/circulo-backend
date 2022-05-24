//-->...
import dotenv from "dotenv";
dotenv.config();
//--
const settings = {
	dev: process.env.NODE_ENV !== "production",
	MONGO_ATLAS_CIRCULO_SERVICE: {
		dbUser: process.env.CIRCULO_USER || "",
		dbPassword: process.env.CIRCULO_PASSWORD || "",
		dbHost: process.env.CIRCULO_DB_HOST || "",
		dbPort: process.env.CIRCULO_DB_PORT || "",
		dbName: process.env.CIRCULO_DB_NAME || "",
	},
	MONGO_LOCAL_CIRCULO_SERVICE: {
		localdbUser: process.env.LOCAL_CIRCULO_USER || "",
		localdbPassword: process.env.LOCAL_CIRCULO_PASSWORD || "",
		localdbHost: process.env.LOCAL_CIRCULO_DB_HOST || "",
		localdbPort: process.env.LOCAL_CIRCULO_DB_PORT || "",
		localdbName: process.env.LOCAL_CIRCULO_DB_NAME || "",
	},
	JWT_SECRET: {
		authJwtSecret: process.env.AUTH_JWT_SECRET || "",
	},
};
//--
export default settings;
