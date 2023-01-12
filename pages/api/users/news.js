import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	switch (req.method) {
		case "POST":
			const [client, db] = await connectDatabase();
			const dbRes = await db.collection("news").insertOne(req.body);
			console.log(dbRes);
			client.close();
			return;
	}
}
