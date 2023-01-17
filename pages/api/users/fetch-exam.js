import { connectDatabase } from "../../../helper/database/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();

	try {
		const postRes = await db
			.collection("exams")
			.findOne({ _id: new ObjectId(req.body._id) });
		if (postRes) {
			res.status(200).json({ examReturned: postRes });
		} else {
			res.status(404);
		}
	} finally {
		client.close();
	}
}
