import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();
		const deleteResponse = await db.collection("eco").deleteMany({});
		const insertResponse = await db.collection("eco").insertMany(req.body);
		res.status(200).json({ message: "Everything updated" });
		await client.close();
	}
}
