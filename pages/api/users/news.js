import { connectDatabase } from "../../../helper/database/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				const dbRes = await db.collection("news").insertOne(req.body);
				break;
			case "DELETE":
				console.log("test");
				const toDelete = req.body.toDelete;
				const delResponse = await db
					.collection("news")
					.deleteOne({ _id: new ObjectId(toDelete._id) });
				if (delResponse.acknowledged) {
					res.status(200).json({
						type: "ok",
						text: "Item deleted",
						deletedId: toDelete._id,
					});
				} else {
					res.status(500);
				}
				break;
		}
	} finally {
		await client.close();
	}
}
