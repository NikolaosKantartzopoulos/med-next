import React from "react";
import ManageExam from "../../components/main/admin/manageAssets/manageExams/ManageExam";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import {
	connectDatabase,
	getDocumentsWithValue,
} from "../../helper/database/db";

function ManageExamsRoute({ allActiveDepartments, allActiveDoctors }) {
	return (
		<>
			{!allActiveDepartments ? (
				<LoadingSpinner />
			) : (
				<div>
					<AdminNavbar />
					<ManageExam
						allActiveDepartments={allActiveDepartments}
						allActiveDoctors={allActiveDoctors}
					/>
				</div>
			)}
		</>
	);
}

export default ManageExamsRoute;

export async function getServerSideProps() {
	const [client, db] = await connectDatabase();

	const allActiveDepartmentsArray = await getDocumentsWithValue(
		db,
		"assets",
		"department"
	);
	const allActiveDepartments = allActiveDepartmentsArray.map((a) => ({
		...a,
		_id: `${a._id}`,
	}));
	const allActiveDoctorsArray = await db
		.collection("assets")
		.find({ position: "doctor" })
		.toArray();
	const allActiveDoctors = allActiveDoctorsArray.map((a) => ({
		...a,
		_id: `${a._id}`,
	}));

	client.close();

	return {
		props: {
			allActiveDepartments: allActiveDepartments,
			allActiveDoctors: allActiveDoctors,
		},
	};
}
