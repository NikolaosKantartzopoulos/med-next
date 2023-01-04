import React, { useState } from "react";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import { connectDatabase } from "../../helper/database/db";
import ExamsTable from "../../components/main/admin/manageAssets/manageExams/ExamsTable";

function ManageExamsTableRoute({ allActiveExams }) {
	return (
		<>
			<AdminNavbar />
			<ExamsTable allActiveExams={allActiveExams} />
		</>
	);
}

export default ManageExamsTableRoute;

export async function getServerSideProps() {
	const [client, db] = await connectDatabase();

	const documents = await db.collection("exams").find().toArray();

	const allActiveExams = documents.map((exam) => ({
		...exam,
		_id: `${exam._id}`,
	}));

	client.close();

	return {
		props: {
			allActiveExams: allActiveExams,
		},
	};
}
