import { connectDatabase } from "../../../helper/database/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "GET":
				console.log(req.body);
				const documents = await db.collection("news").find().toArray();
				const docs = documents.map((doc) => ({
					...doc,
					_id: doc._id.toString(),
				}));

				newsCtx.setActiveNews(docs);

				break;

			case "POST":
				const dbRes = await db.collection("news").insertOne(req.body);
				if (dbRes.acknowledged) {
					res.status(200).json({
						type: "ok",
						text: "Item added",
						item: { ...req.body, _id: dbRes.insertedId },
					});
				} else {
					res.status(500);
				}

				break;
			case "PUT":
				const toPutItem = req.body.toPut;
				const dbPutRes = await db
					.collection("news")
					.findOneAndUpdate(
						{ _id: new ObjectId(toPutItem._id) },
						{ $set: { ...toPutItem, _id: new ObjectId(toPutItem._id) } },
						{ returnDocument: "after" }
					);
				if (dbPutRes.lastErrorObject.updatedExisting) {
					res.status(200).json({
						type: "ok",
						text: "Item Updated",
						editedItem: {
							...dbPutRes.value,
							_id: dbPutRes.value._id.toString(),
						},
					});
				} else {
					res.status(500);
				}
				break;
			case "DELETE":
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
