import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();

		const prepToPost = req.body;

		const order = prepToPost.map((item) => ({
			replaceOne: {
				filter: { title: item.title },
				replacement: item,
				upsert: true,
			},
		}));

		const existingTitles = await db
			.collection("preparations")
			.distinct("title", {});

		const titlesToSend = prepToPost.map((a) => a.title);
		const titlesToDelete = existingTitles.filter(
			(title) => !titlesToSend.includes(title)
		);
		console.log(titlesToDelete);
		const deleteOrder = titlesToDelete.map((item) => ({
			deleteOne: { filter: { title: item } },
		}));

		try {
			const sent = await db
				.collection("preparations")
				.bulkWrite([...order, ...deleteOrder]);

			res.status(200).json({ message: "message", added: req.body });
		} finally {
			await client.close();
		}
	}
}
