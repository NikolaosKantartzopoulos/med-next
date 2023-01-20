import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();
		const dbRes = await db
			.collection("exams")
			.updateMany(
				{ department: req.body.departmentNameBeforeEdit },
				{ $set: { department: req.body.departmentName } }
			);
		console.log(dbRes);
		client.close();
		res.status(200);
	}
}
