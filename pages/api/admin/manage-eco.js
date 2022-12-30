import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db] = connectDatabase();

		const allActiveEco = req.body;
		console.log(req.body);
		client.close();
	}
}
