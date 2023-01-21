import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();
		const dbRes = await db
			.collection("eco")
			.updateMany(
				{ department: req.body.departmentNameBeforeEdit },
				{ $set: { department: req.body.departmentName } }
			);

		client.close();
		res.status(200);
	}

	if (req.method === "DELETE") {
		const [client, db] = await connectDatabase();
		const dbRes = await db
			.collection("eco")
			.deleteMany({ department: req.body });

		client.close();
		res.status(200);
	}
}
