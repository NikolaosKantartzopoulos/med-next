import React, { useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { connectDatabase } from "../../helper/database/db";
import { DepartmentContextProvider } from "../../helper/store/contexts/department-context";

import ManageDepartments from "../../components/main/admin/manageAssets/manageDepartments/ManageDepartments";
import AdminLayout from "../../components/helper/adminLayout";

import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ToolsContext from "../../helper/store/contexts/tools-context";

function ManageDepartmentsRoute({ allDepartments }) {
	const { info, setInfo, infoMessage } = useContext(ToolsContext);
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<DepartmentContextProvider
			allDepartments={allDepartments}
			info={info}
			setInfo={setInfo}
			infoMessage={infoMessage}
		>
			<Head>
				<title>Admin</title>
			</Head>
			<AdminLayout>
				<ManageDepartments allDepartments={allDepartments} />
			</AdminLayout>
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
