import mongoose from "mongoose";

export const dbConnection = () => {
	mongoose
		.connect(
			"mongodb+srv://ayesha19765:Mdb1201@cluster0.arq1aqv.mongodb.net/AshFoodMERN?retryWrites=true&w=majority",
			{
				dbName: "HIRE_LAND",
			}
		)
		.then(() => console.log("Database connected"))
		.catch((err) => console.log(err));
};