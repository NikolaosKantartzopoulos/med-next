import { connectDatabase } from "../../../helper/database/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				const { dep, newSubdepartment } = JSON.parse(req.body);
				console.log(dep, newSubdepartment);

				const dbPostRes = await db
					.collection("departments")
					.updateOne(
						{ department: dep.department },
						{ $push: { sub: newSubdepartment } }
					);
				if (dbPostRes.acknowledged) {
					res.status(200).json({
						type: "ok",
						text: "Subepartment added",
					});
				} else {
					res.status(500);
				}

				break;
			case "PUT":
				console.log(req.body);
				const { selectedDepartment, subdepartmentName } = req.body;

				console.log(selectedDepartment, subdepartmentName);

				const dbPutRes = await db.collection("departments").updateOne(
					{ _id: new ObjectId(selectedDepartment._id) },
					{
						$push: { sub: subdepartmentName },
					}
				);

				if (dbPutRes.acknowledged) {
					res.status(200).json({ type: "ok", text: "Subepartment edited" });
				} else {
					res.status(500);
				}
				break;
			case "DELETE":
				console.log(req.body);
				const dbDelRes = await db
					.collection("departments")
					.updateOne(
						{ _id: new ObjectId(req.body.department._id) },
						{ $pull: { sub: req.body.subdepartment } }
					);

				const delFromExams = await db
					.collection("exams")
					.deleteMany({ subdepartment: req.body.subdepartment });

				const delFromEco = await db
					.collection("eco")
					.deleteMany({ subdepartment: req.body.subdepartment });

				if (dbDelRes.acknowledged) {
					res.status(200).json({ type: "ok", text: "Subdepartment deleted" });
				} else {
					res.status(500);
				}

				break;
		}
	} finally {
		await client.close();
	}
}
