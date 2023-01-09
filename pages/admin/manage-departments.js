import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { connectDatabase } from "../../helper/database/db";
import { DepartmentContextProvider } from "../../helper/store/department-context";

import ManageDepartments from "../../components/main/admin/manageAssets/manageDepartments/ManageDepartments";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

function ManageDepartmentsRoute({ allDepartments }) {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<DepartmentContextProvider allDepartments={allDepartments}>
			{!allDepartments ? (
				<LoadingSpinner />
			) : (
				<div>
					<AdminNavbar />
					<ManageDepartments allDepartments={allDepartments} />
				</div>
			)}
		</DepartmentContextProvider>
	);
}

export default ManageDepartmentsRoute;

export async function getServerSideProps() {
	const [client, db] = await connectDatabase();
	const dataID = await db.collection("departments").find().toArray();

	const data = dataID.map((a) => ({ ...a, _id: a._id.toString() }));
	client.close();
	return { props: { allDepartments: data } };
}
