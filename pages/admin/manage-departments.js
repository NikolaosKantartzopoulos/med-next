import React from "react";
import { connectDatabase } from "../../helper/database/db";

import ManageDepartments from "../../components/main/admin/manageAssets/manageDepartments/ManageDepartments";
import AdminNavbar from "../../components/main/admin/AdminNavbar";

function ManageDepartmentsRoute({ allDepartments }) {
	return (
		<div>
			<AdminNavbar />
			<ManageDepartments allDepartments={allDepartments} />
		</div>
	);
}

export default ManageDepartmentsRoute;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();
	const data = await db
		.collection("assets")
		.find({ department: { $exists: true } })
		.project({ _id: 0 })
		.toArray();
	client.close();
	return { props: { allDepartments: data } };
}
