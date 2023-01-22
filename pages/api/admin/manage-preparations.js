import { ObjectId } from "mongodb";
import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				const dbPostRes = await db
					.collection("preparations")
					.insertOne(JSON.parse(req.body));
				if (dbPostRes.acknowledged) {
					res.status(200).json({
						type: "ok",
						text: "New preparation added",
						item: {
							...JSON.parse(req.body),
							_id: dbPostRes.insertedId.toString(),
						},
					});
				} else {
					res.status(500);
				}
				break;

			case "PUT":
				const { item, previousTitle } = JSON.parse(req.body);
				console.log(JSON.parse(req.body));
				console.log(item, previousTitle);
				const dbPutRes = await db.collection("preparations").replaceOne(
					{ _id: new ObjectId(item._id) },
					{
						...item,
						_id: new ObjectId(item._id),
					}
				);

				const updatePrepFromExams = await db
					.collection("exams")
					.updateMany(
						{ generalPreparation: previousTitle },
						{ $set: { generalPreparation: item.title } }
					);

				if (dbPutRes.acknowledged) {
					res.status(200).json({
						type: "ok",
						text: "Preparation updated",
					});
				} else {
					res.status(500);
				}
				break;

			case "DELETE":
				const delId = JSON.parse(req.body)._id;

				const findTitle = await db
					.collection("preparations")
					.findOne({ _id: new ObjectId(delId) });

				const deleteResult = await db
					.collection("preparations")
					.deleteOne({ _id: ObjectId(delId) });
				const removePrepFromExams = await db
					.collection("exams")
					.updateMany(
						{ generalPreparation: findTitle.title },
						{ $unset: { generalPreparation: null } }
					);
				if (deleteResult.acknowledged) {
					res.status(200).json({
						type: "ok",
						text: `Preparation deleted`,
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
