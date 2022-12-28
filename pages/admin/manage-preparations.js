import React from "react";
import ManagePreparation from "../../components/main/admin/manageAssets/managePreparations/ManagePreparations.js";
import AdminNavbar from "../../components/main/admin/AdminNavbar.js";

import { connectDatabase } from "../../helper/database/db";

function ManagePreparationsRoute() {
	return (
		<div>
			<AdminNavbar />
			<ManagePreparation />
		</div>
	);
}

export default ManagePreparationsRoute;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();

	const allPreparations = await db
		.collection("preparations")
		.find({ common: { $exists: true } });
	console.log(allPreparations);
	client.close();
	return { props: {} };
}
