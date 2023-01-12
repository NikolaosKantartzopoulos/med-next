import React, { useState } from "react";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import { connectDatabase } from "../../helper/database/db";
import ExamsTable from "../../components/main/admin/manageAssets/manageExams/ExamsTable";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import FilterUI from "../../components/UI/ExamFilterUI";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AdminLayout from "../../components/helper/adminLayout";

function ManageExamsTableRoute({ allActiveExams, allDepartments }) {
	const [visibleExams, setVisibleExams] = useState(allActiveExams);
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<AdminLayout>
			<FilterUI
				allDepartments={allDepartments}
				allExams={allActiveExams}
				visibleExams={visibleExams}
				setVisibleExams={setVisibleExams}
			/>
			<ExamsTable allActiveExams={visibleExams} />
		</AdminLayout>
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
		.collection("departments")
		.find({})
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
