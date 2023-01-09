import { useRouter, useContext } from "next/router";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import ManageExamForm from "../../../components/main/admin/manageAssets/manageExams/ManageExamForm";
import AdminNavbar from "../../../components/main/admin/AdminNavbar";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { ExamContextProvider } from "../../../helper/store/exam-context";
import { connectDatabase } from "../../../helper/database/db";

function ManageLoadedExam({
	allActiveDepartments,
	allActiveDoctors,
	allActiveBuildings,
	allActivePreparations,
	allActiveEco,
}) {
	const [loading, setLoading] = useState(false);
	const [examData, setExamData] = useState(null);

	const { data: session, status } = useSession();
	const router = useRouter();
	const item = router.query;
	useEffect(() => {
		setLoading(true);
		fetch("/api/admin/fetch-exam", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(item),
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				setExamData(data);
			});
	}, []);

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
			{!loading ? (
				<>
					<ManageExamForm insertExamToForm={examData} />
				</>
			) : (
				<LoadingSpinner />
			)}
		</ExamContextProvider>
	);
}

export default ManageLoadedExam;

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
