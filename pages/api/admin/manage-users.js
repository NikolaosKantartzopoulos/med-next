import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();

		try {
			const newUsers = req.body.activeUsers;
			// if (
			// 	newBuilding.building.address.trim() === "" ||
			// 	allBuildings.includes(newBuilding)
			// ) {
			// 	res.status(406).json({ message: "Invalid Input" });
			// 	return;
			// }
			let query = { username: { $exists: true } };
			const result = await db.collection("assets").deleteMany(query);

			const sent = await db.collection("assets").insertMany(newUsers);

			res.status(200).json({ message: "message", added: newUsers });
		} finally {
			await client.close();
		}
	}
}
