import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();

		const prepToPost = req.body;
		console.log(prepToPost);

		const order = prepToPost.map((item) => ({
			replaceOne: {
				filter: { title: item.title },
				replacement: item,
				upsert: true,
			},
		}));

		try {
			const sent = await db.collection("preparations").bulkWrite(order);

			res.status(200).json({ message: "message", added: req.body });
		} finally {
			await client.close();
		}
	}
}
