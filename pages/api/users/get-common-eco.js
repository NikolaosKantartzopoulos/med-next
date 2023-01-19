import { connectDatabase } from "../../../helper/database/db";
import { ObjectId, ISODate } from "mongodb";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				const { eco, department, subdepartment } = req.body;
				const doc = await db.collection("eco").findOne({
					title: eco.title,
					department: department,
					subdepartment: subdepartment,
				});
				res.status(200).json({ commonEco: doc });
				break;
		}
	} finally {
		await client.close();
	}
}
