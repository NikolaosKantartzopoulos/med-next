import { connectDatabase } from "../../../helper/database/db";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const [client, db, selectedCollection] = await connectDatabase();
		try {
			const { type, addressesToAdd } = req.body;
			if (addressesToAdd.length > 0) {
				const result = await db.collection("assets").insertMany(addressesToAdd);
			}
			res.status(200).json({ message: "message", added: addressesToAdd });
		} finally {
			await client.close();
		}
	}

	if (req.method === "DELETE") {
		//fetch all existing assets

		console.log(req.body);
		const [client, db, selectedCollection] = await connectDatabase();
		const { type, toDel } = req.body;
		let result = await db.collection("assets").deleteOne(toDel);
		await client.close();
	}
}
