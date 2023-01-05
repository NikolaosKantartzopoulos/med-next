import { connectDatabase } from "../../../helper/database/db";

import React from "react";
import BrowseExams from "../../../components/main/users/browseExams/BrowseExams";

function BrowseExamsRoute({ allExams, allDepartments }) {
	return (
		<div>
			<BrowseExams allExams={allExams} allDepartments={allDepartments} />
		</div>
	);
}

export default BrowseExamsRoute;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();

	const allExamsArray = await db.collection("exams").find({}).toArray();
	const allExams = allExamsArray.map((a) => ({ ...a, _id: `${a._id}` }));

	const allDepartmentsArray = await db
		.collection("assets")
		.find({ sub: { $exists: true } })
		.toArray();
	const allDepartments = allDepartmentsArray.map((a) => ({
		...a,
		_id: `${a._id}`,
	}));

	client.close();
	return { props: { allExams, allDepartments } };
}
