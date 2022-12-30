import React from "react";
import ManageEco from "../../components/main/admin/manageAssets/manageEco/ManageEco";
import AdminNavbar from "../../components/main/admin/AdminNavbar.js";
import { connectDatabase } from "../../helper/database/db";
import { EcoContextProvider } from "../../helper/store/eco-context";

function ManageEcoRoute({ distinctDepartments, allInsuranceDocuments }) {
	return (
		<EcoContextProvider
			distinctDepartments={distinctDepartments}
			allInsuranceDocuments={allInsuranceDocuments}
		>
			<div>
				<AdminNavbar />
				<ManageEco />
			</div>
		</EcoContextProvider>
	);
}

export default ManageEcoRoute;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();

	const documents = await db.collection("eco").find().toArray();

	const allInsuranceDocuments = documents.map((doc) => ({
		...doc,
		_id: `${doc._id}`,
	}));
	const distinctDepartments = await db
		.collection("assets")
		.distinct("department", { sub: { $exists: true } });

	console.log(distinctDepartments);
	client.close();

	return { props: { distinctDepartments, allInsuranceDocuments } };
}
