import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "PUT") {
		const [client, db] = await connectDatabase();

		try {
			const newDepartments = req.body.activeDepartments;
			// if (
			// 	newBuilding.building.address.trim() === "" ||
			// 	allBuildings.includes(newBuilding)
			// ) {
			// 	res.status(406).json({ message: "Invalid Input" });
			// 	return;
			// }
			const result = await db.collection("departments").deleteMany({});

			const sent = await db
				.collection("departments")
				.insertMany(newDepartments);

			res.status(200).json({ message: "message", added: newDepartments });
		} finally {
			await client.close();
		}
	}
}
