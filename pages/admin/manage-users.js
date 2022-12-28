import React from "react";
import {
	connectDatabase,
	getDocumentsWithValue,
} from "../../helper/database/db";

import ManageUsers from "../../components/main/admin/manageAssets/manageUsers/ManageUsers";
import AdminNavbar from "../../components/main/admin/AdminNavbar";

function ManageUsersRoute({ allUsers }) {
	return (
		<div>
			<AdminNavbar />
			<ManageUsers allUsers={allUsers} />
		</div>
	);
}

export default ManageUsersRoute;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();
	let allUsers = {};
	try {
		const documents = await getDocumentsWithValue(db, "assets", "username", {
			username: 1,
		});
		allUsers = documents.map((doc) => ({ ...doc, _id: `${doc._id}` }));
	} finally {
		client.close();
	}

	return { props: { allUsers } };
}
