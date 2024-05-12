import { Model } from "sequelize";
import TeamsSequelizeModel from "../../database/models/TeamsSequelizeModel";

export const teamsArray = [
	{
		id: 1,
		teamName: "Avaí/Kindermann"
	},
	{
		id: 2,
		teamName: "Bahia"
	},
	{
		id: 3,
		teamName: "Botafogo"
	},
];

export const teamsArrayFromModel: Model<TeamsSequelizeModel>[] = [
	{
		dataValues: {
			id: 1,
			teamName: "Avaí/Kindermann"
		} 
	} as Model<TeamsSequelizeModel>,
	{
		dataValues: {
			id: 2,
			teamName: "Bahia"
		}
	} as Model<TeamsSequelizeModel>,
	{
		dataValues: {
			id: 3,
			teamName: "Botafogo"
		}
	} as Model<TeamsSequelizeModel>
];

export const oneTeamFromModel: Model<TeamsSequelizeModel> = 
	{
		dataValues: {
			id: 5,
			teamName: "Cruzeiro"
		} 
	} as Model<TeamsSequelizeModel>;


export const teams = {
	status: 200,
	data: teamsArray,
};
