//-->...
import { Types } from "mongoose";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import boom from "@hapi/boom";
import config from "../configs/settings.js";
import UserSystemController from "../services/users/user_controller.js";
//--
passport.use(
	new Strategy(
		{
			secretOrKey: config.JWT_SECRET.authJwtSecret,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		},
		async function (
			jwt_payload: {
				user_id: string;
				email: string;
				full_name: string;
			},
			callback: Function,
		) {
			const user_system_controller = new UserSystemController();
			try {
				const user: {
					_id: Types.ObjectId;
					full_name: string;
					email: string;
					password?: string;
					little_description?: string;
				} = await user_system_controller.searchUserByEmail(jwt_payload.email);
				if (!user._id) {
					return callback(boom.unauthorized().message, false);
				}
				delete user.password;
				delete user.little_description;
				return callback(null, { ...user });
			} catch (error: any) {
				callback(error);
			}
		},
	),
);
