//-->...
import { Types } from "mongoose";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import bcrypt from "bcrypt";
import boom from "@hapi/boom";
import UserSystemController from "../services/users/user_controller.js";
//--
passport.use(
	new BasicStrategy(async function (username: string, password: string, callback: Function) {
		const user_system_controller = new UserSystemController();
		try {
			const user: {
				_id: Types.ObjectId;
				full_name: string;
				email: string;
				password: string | any;
				little_description?: string;
			} = await user_system_controller.searchUserByEmail(username);
			if (!user) {
				return callback(boom.unauthorized().message, false);
			}
			if (!(await bcrypt.compare(password, user.password))) {
				return callback(boom.unauthorized().message, false);
			}
			delete user.password;
			return callback(null, user);
		} catch (error: any) {
			return callback(error);
		}
	}),
);
//--
