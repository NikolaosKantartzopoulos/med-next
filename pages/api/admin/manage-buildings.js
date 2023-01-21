import { connectDatabase } from "../../../helper/database/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();

		try {
			const allBuildings = await db.collection("assets").distinct("address");

			const newBuilding = req.body;

			if (
				newBuilding.address.trim() === "" ||
				allBuildings.includes(newBuilding)
			) {
				res.status(406).json({ message: "Invalid Input" });
				return;
			}
			const result = await db.collection("buildings").insertOne(newBuilding);

			res.status(200).json({ message: "message", added: newBuilding });
		} finally {
			await client.close();
		}
	}

	if (req.method === "DELETE") {
		const [client, db] = await connectDatabase();
		const { _id, address } = req.body.item;

		try {
			let result = await db
				.collection("buildings")
				.deleteOne({ _id: new ObjectId(_id) });
			//todo update nested array mongo db
			//buildingsSchedule.buildingName find and delete object in array
			// let informExams = db
			// 	.collection("exams")
			// 	.updateMany(
			// 		{},
			// 		{ $pull: { "buildingsSchedule.buildingName": address } }
			// 	);
			res.status(200).json({ message: "Entry deleted", entry: result });
		} finally {
			await client.close();
		}
	}
}
