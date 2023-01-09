import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import {
	connectDatabase,
	getDocumentsWithValue,
} from "../../helper/database/db";

import { UsersContextProvider } from "../../helper/store/users-context";

import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ManageUsers from "../../components/main/admin/manageAssets/manageUsers/ManageUsers";
import AdminNavbar from "../../components/main/admin/AdminNavbar";

function ManageUsersRoute({ allUsers }) {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<>
			{!allUsers ? (
				<LoadingSpinner />
			) : (
				<UsersContextProvider allUsers={allUsers}>
					<AdminNavbar />
					<ManageUsers />
				</UsersContextProvider>
			)}
		</>
	);
}

export default ManageUsersRoute;

export async function getServerSideProps() {
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
