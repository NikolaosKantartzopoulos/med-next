import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();
		const downloaded = req.body.entry;

		const a1 = await db.collection("preparations").deleteMany();
		const a2 = await db.collection("preparations").insertMany(downloaded);

		await client.close();
		res.status(200).json({ message: "message" });
	}
}
