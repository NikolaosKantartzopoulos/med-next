import { connectDatabase } from "../../../helper/database/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
	const [client, db] = await connectDatabase();
	try {
		switch (req.method) {
			case "POST":
				const { newUserInfo } = req.body;

				const existingUsernames = await db
					.collection("assets")
					.distinct("username");
				const existingEmails = await db.collection("assets").distinct("email");

				if (existingUsernames.includes(newUserInfo.username)) {
					res.status(406).json({ message: "Username exists" });
				}
				if (existingEmails.includes(newUserInfo.email)) {
					res.status(406).json({ message: "Email exists" });
				}

				const response = await db.collection("assets").insertOne(newUserInfo);
				if (response.acknowledged) {
					res.status(206).json({ insertedId: response.insertedId.toString() });
				} else {
					res.status(400).json({ message: "There was a problem" });
				}
				break;

			case "PUT":
				const editedUser = req.body.editedUser;
				const result = await db.collection("assets").updateOne(
					{ _id: new ObjectId(editedUser.userId) },
					{
						$set: {
							username: editedUser.userName,
							email: editedUser.userEmail,
							password: editedUser.userPassword,
							position: editedUser.userPosition,
							position2: editedUser.userPosition2,
						},
					}
				);

				const newState = await db
					.collection("assets")
					.findOne({ _id: new ObjectId(editedUser.userId) });

				if (result.acknowledged) {
					res.status(200).json({
						type: "ok",
						text: "User updated",
						editedUserNewState: { ...newState, _id: newState._id.toString() },
					});
				} else {
					res.status(500);
				}
				break;

			case "DELETE":
				const toDelete = req.body.toDelete;
				const deleteResult = await db
					.collection("assets")
					.deleteOne({ _id: new ObjectId(toDelete._id) });

				if (deleteResult.acknowledged) {
					res.status(200).json({
						type: "ok",
						text: `User ${toDelete.username} deleted`,
					});
				} else {
					res.status(500);
				}

				break;
		}
	} finally {
		await client.close();
	}
}
