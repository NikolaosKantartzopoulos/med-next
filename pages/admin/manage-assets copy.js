import React from "react";
import ManageAssetsComponent from "../../components/main/admin/manageAssets/ManageAssetsComponent";

import { connectDatabase } from "../../helper/database/db";

function ManageAssets(props) {
	return (
		<section>
			<ManageAssetsComponent props={props} />
		</section>
	);
}

export default ManageAssets;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();
	const data = await db
		.collection("assets")
		.find()
		.project({ _id: 0 })
		.toArray();

	const allUsers = data
		.filter((item) => "users" in item)
		.map((item) => item.users);
	const allBuildings = data
		.filter((item) => "building" in item)
		.map((item) => item.building);
	const allDepartments = data.filter((item) => "department" in item);
	client.close();
	return {
		props: { allUsers, allBuildings, allDepartments },
	};
}
