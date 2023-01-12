import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import {
	connectDatabase,
	getDocumentsWithValue,
} from "../../helper/database/db";

import { UsersContextProvider } from "../../helper/store/contexts/users-context";

import AdminLayout from "../../components/helper/adminLayout";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ManageUsers from "../../components/main/admin/manageAssets/manageUsers/ManageUsers";
import ToolsContext from "../../helper/store/contexts/tools-context";

function ManageUsersRoute({ allUsers }) {
	const { info, setInfo } = useContext(ToolsContext);

	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<AdminLayout>
			<UsersContextProvider allUsers={allUsers} info={info} setInfo={setInfo}>
				<ManageUsers />
			</UsersContextProvider>
		</AdminLayout>
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
