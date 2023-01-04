import { useRouter, useContext } from "next/router";
import React, { useEffect, useState } from "react";
import ManageExamForm from "../../../components/main/admin/manageAssets/manageExams/ManageExamForm";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { ExamContextProvider } from "../../../helper/store/exam-context";
import {
	connectDatabase,
	getDocumentsWithValue,
} from "../../../helper/database/db";
import Button from "../../../components/UI/Button";
function ManageLoadedExam({
	allActiveDepartments,
	allActiveDoctors,
	allActiveBuildings,
	allActivePreparations,
	allActiveEco,
}) {
	const [loading, setLoading] = useState(false);
	const [examData, setExamData] = useState(null);

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

	return (
		<ExamContextProvider
			allActiveDepartments={allActiveDepartments}
			allActiveDoctors={allActiveDoctors}
			allActiveBuildings={allActiveBuildings}
			allActivePreparations={allActivePreparations}
			allActiveEco={allActiveEco}
		>
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