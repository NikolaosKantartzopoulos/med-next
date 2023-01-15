import { connectDatabase } from "../../../helper/database/db";
import { ObjectId, ISODate } from "mongodb";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				const getSince = new Date();
				getSince.setMonth(getSince.getMonth() - req.body.num);
				const asdf = getSince.toISOString();
				const documents = await db
					.collection("news")
					.find({ dateCreated: { $gte: asdf } })
					.toArray();
				const docs = documents.map((doc) => ({
					...doc,
					_id: doc._id.toString(),
				}));
				res.status(200).json({ newActiveNews: docs });
				break;
		}
	} finally {
		await client.close();
	}
}
