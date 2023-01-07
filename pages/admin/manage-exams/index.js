import React, { useState } from "react";
import ManageExam from "../../../components/main/admin/manageAssets/manageExams/ManageExam";
import AdminNavbar from "../../../components/main/admin/AdminNavbar";
import {
	connectDatabase,
	getDocumentsWithValue,
} from "../../../helper/database/db";
import { ExamContextProvider } from "../../../helper/store/exam-context";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

function ManageExamsRoute({
	allActiveDepartments,
	allActiveDoctors,
	allActiveBuildings,
	allActivePreparations,
	allActiveEco,
}) {
	return (
		<ExamContextProvider
			allActiveDepartments={allActiveDepartments}
			allActiveDoctors={allActiveDoctors}
			allActiveBuildings={allActiveBuildings}
			allActivePreparations={allActivePreparations}
			allActiveEco={allActiveEco}
		>
			<AdminNavbar />

			<ManageExam />
		</ExamContextProvider>
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

	const allActiveBuildingsArray = await db
		.collection("assets")
		.find({ address: { $exists: true } })
		.toArray();
	const allActiveBuildings = allActiveBuildingsArray.map((a) => ({
		...a,
		_id: `${a._id}`,
	}));

	const allActivePreparationsArray = await db
		.collection("preparations")
		.find({ common: true })
		.toArray();
	const allActivePreparations = allActivePreparationsArray.map((a) => ({
		...a,
		_id: `${a._id}`,
	}));

	const documents = await db.collection("eco").find().toArray();

	const allActiveEco = documents.map((doc) => ({
		...doc,
		_id: `${doc._id}`,
	}));

	client.close();

	return {
		props: {
			allActiveDepartments: allActiveDepartments,
			allActiveDoctors: allActiveDoctors,
			allActiveBuildings: allActiveBuildings,
			allActivePreparations: allActivePreparations,
			allActiveEco: allActiveEco,
		},
	};
}
