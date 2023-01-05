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
		client.close();
	}
}
