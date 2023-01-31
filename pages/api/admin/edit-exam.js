import { connectDatabase } from "../../../helper/database/db";
import { ObjectId } from "mongodb";

export default async function (req, res) {
	if (req.method === "PUT") {
		const [client, db] = await connectDatabase();
		const dbRes = await db
			.collection("exams")
			.replaceOne(
				{ _id: new ObjectId(req.body._id) },
				{ ...req.body, _id: new ObjectId(req.body._id) }
			);
		if (dbRes.modifiedCount == 1) {
			res.status(200).json({ type: "ok", text: "Exam edited successfully" });
		} else {
			res.status(500);
		}
		client.close();
	}

	if (req.method === "DELETE") {
		const [client, db] = await connectDatabase();
		const resDB = await db
			.collection("exams")
			.deleteOne({ _id: new ObjectId(req.body._id) });
		if (resDB.acknowledged == true) {
			res.status(200).json({ deleted: true });
		}

		client.close();
	}
}
