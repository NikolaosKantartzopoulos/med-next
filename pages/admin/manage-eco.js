import React from "react";
import ManageEco from "../../components/main/admin/manageAssets/manageEco/ManageEco";
import AdminNavbar from "../../components/main/admin/AdminNavbar.js";
import { connectDatabase } from "../../helper/database/db";
import { EcoContextProvider } from "../../helper/store/eco-context";

function ManageEcoRoute({
	distinctDepartments,
	allDepartments,
	allInsuranceDocuments,
}) {
	return (
		<>
			{!allInsuranceDocuments ? (
				<LoadingSpinner />
			) : (
				<EcoContextProvider
					distinctDepartments={distinctDepartments}
					allInsuranceDocuments={allInsuranceDocuments}
					allDepartments={allDepartments}
				>
					<div>
						<AdminNavbar />
						<ManageEco />
					</div>
				</EcoContextProvider>
			)}
		</>
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
