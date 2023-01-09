import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import ManageExam from "../../../components/main/admin/manageAssets/manageExams/ManageExam";
import AdminNavbar from "../../../components/main/admin/AdminNavbar";
import { connectDatabase } from "../../../helper/database/db";
import { ExamContextProvider } from "../../../helper/store/contexts/exam-context";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

function ManageExamsRoute({
	allActiveDepartments,
	allActiveDoctors,
	allActiveBuildings,
	allActivePreparations,
	allActiveEco,
}) {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

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

	const allActiveDepartmentsArray = await db
		.collection("departments")
		.find({})
		.toArray();
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
		.collection("buildings")
		.find({})
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
