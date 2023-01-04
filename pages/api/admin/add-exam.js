import { connectDatabase } from "../../../helper/database/db";

connectDatabase;
export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = await connectDatabase();
		console.log(req.body);
		const dbResponse = await db.collection("exams").insertOne(req.body);
		res
			.status(200)
			.json({ message: "Controlled response", dbResponse: dbResponse });
	}
}
