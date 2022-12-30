import React from "react";
import {
	connectDatabase,
	getDocumentsWithValue,
} from "../../helper/database/db";

import { UsersContextProvider } from "../../helper/store/users-context";

import ManageUsers from "../../components/main/admin/manageAssets/manageUsers/ManageUsers";
import AdminNavbar from "../../components/main/admin/AdminNavbar";

function ManageUsersRoute({ allUsers }) {
	return (
		<UsersContextProvider allUsers={allUsers}>
			<AdminNavbar />
			<ManageUsers />
		</UsersContextProvider>
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
