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
				const { editedDepartmentNewData } = JSON.parse(req.body);

				const dbPutRes = await db.collection("departments").replaceOne(
					{ _id: new ObjectId(editedDepartmentNewData._id) },
					{
						...editedDepartmentNewData,
						_id: new ObjectId(editedDepartmentNewData._id),
					}
				);

				if (dbPutRes.acknowledged) {
					res.status(200).json({ type: "ok", text: "Department edited" });
				} else {
					res.status(500);
				}
				break;
			case "DELETE":
				const dbDelRes = await db
					.collection("departments")
					.deleteOne({ _id: new ObjectId(req.body) });
				if (dbDelRes.acknowledged) {
					res.status(200).json({ type: "ok", text: "Department deleted" });
				} else {
					res.status(500);
				}

				break;
		}
	} finally {
		await client.close();
	}
}
