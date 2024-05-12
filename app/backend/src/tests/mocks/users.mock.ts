import { Model } from "sequelize";
import UsersSequelizeModel from "../../database/models/UserSequelizeModel";

export const oneUserFromModel: UsersSequelizeModel = {
	dataValues: {
		id: 5,
  		username: "Admin",
		role: "admin",
		email: "admin@admin.com",
		password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
	}
} as UsersSequelizeModel;

export const validToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzNDAxNjY0fQ.TIqcNI1uIhSO7ALh3a-ECeX6ZW9sR21KpdLugBMY2ss';
