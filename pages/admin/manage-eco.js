import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import ManageEco from "../../components/main/admin/manageAssets/manageEco/ManageEco";
import AdminLayout from "../../components/helper/adminLayout";

import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { connectDatabase } from "../../helper/database/db";
import { EcoContextProvider } from "../../helper/store/contexts/eco-context";
import ToolsContext from "../../helper/store/contexts/tools-context";

function ManageEcoRoute({
	distinctDepartments,
	allDepartments,
	allInsuranceDocuments,
}) {
	const { data: session, status } = useSession();
	const router = useRouter();

	const { info, setInfo } = useContext(ToolsContext);

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<AdminLayout>
			<EcoContextProvider
				distinctDepartments={distinctDepartments}
				allInsuranceDocuments={allInsuranceDocuments}
				allDepartments={allDepartments}
				info={info}
				setInfo={setInfo}
			>
				<ManageEco />
			</EcoContextProvider>
		</AdminLayout>
	);
}

export default ManageEcoRoute;

export async function getServerSideProps() {
	const [client, db] = await connectDatabase();

	const documents = await db.collection("eco").find().toArray();

	const allInsuranceDocuments = documents.map((doc) => ({
		...doc,
		_id: `${doc._id}`,
	}));
	const distinctDepartments = await db
		.collection("departments")
		.distinct("department", { sub: { $exists: true } });

	const allDepartmentsArray = await db
		.collection("departments")
		.find({})
		.toArray();

	const allDepartments = allDepartmentsArray.map((dep) => ({
		...dep,
		_id: `${dep._id}`,
	}));

	client.close();

	return {
		props: { allDepartments, distinctDepartments, allInsuranceDocuments },
	};
}
