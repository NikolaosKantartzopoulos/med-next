import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();
		const allExams = await db.collection("exams").find({}).toArray();
		let checkfields = {
			examName: req.body.name,
			examDep: req.body.department,
			examSub: req.body.subdepartment,
		};
		let problem = false;
		allExams.forEach((xm) => {
			if (
				xm.name === checkfields.examName &&
				xm.department === checkfields.examDep &&
				xm.subdepartment === checkfields.examSub
			) {
				problem = true;
			}
		});
		if (problem) {
			res.status(406).json({ message: "Exams Exists" });
			return;
		}
		const dbResponse = await db.collection("exams").insertOne(req.body);
		res.status(200).json({ type: "ok", text: "Exam successfully added!" });
		await client.close();
	}
}
