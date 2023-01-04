import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "PUT") {
		const [client, db] = await connectDatabase();
		let [name, department, subdepartment] = req.body.slug;
		let query = {
			name,
			department,
			subdepartment,
		};
		const dbExams = await db.collection("exams").findOne(query);
		res.status(200).json({ exam: dbExams });
		client.close();
	}
}
