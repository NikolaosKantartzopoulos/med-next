import React, { useState } from "react";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import { connectDatabase } from "../../helper/database/db";
import ExamsTable from "../../components/main/admin/manageAssets/manageExams/ExamsTable";

import FilterUI from "../../components/main/admin/manageAssets/manageExams/ExamFilterUI";

function ManageExamsTableRoute({ allActiveExams, allDepartments }) {
	const [visibleExams, setVisibleExams] = useState(allActiveExams);
	return (
		<>
			<AdminNavbar />
			<FilterUI
				allDepartments={allDepartments}
				allExams={allActiveExams}
				visibleExams={visibleExams}
				setVisibleExams={setVisibleExams}
			/>
			<ExamsTable allActiveExams={visibleExams} />
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
	const data = await db
		.collection("assets")
		.find({ department: { $exists: true } })
		.project({ _id: 0 })
		.toArray();
	client.close();

	return {
		props: {
			allActiveExams: allActiveExams,
			allDepartments: data,
		},
	};
}
