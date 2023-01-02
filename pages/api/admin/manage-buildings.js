import { connectDatabase } from "../../../helper/database/db";

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
			const result = await db.collection("assets").insertOne(newBuilding);

			res.status(200).json({ message: "message", added: newBuilding });
		} finally {
			await client.close();
		}
	}

	if (req.method === "DELETE") {
		const [client, db] = await connectDatabase();
		const { deleteAddress } = req.body;

		try {
			let result = await db
				.collection("assets")
				.deleteOne({ address: deleteAddress });
			res.status(200).json({ message: "Entry deleted", entry: deleteAddress });
		} finally {
			await client.close();
		}
	}
}
