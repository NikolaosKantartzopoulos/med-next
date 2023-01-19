import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();
		let { prep } = JSON.parse(req.body);

		const resDB = await db.collection("preparations").findOne({ title: prep });
		res.status(200).json({ prepRetrieved: resDB });
		client.close();
	}
}
