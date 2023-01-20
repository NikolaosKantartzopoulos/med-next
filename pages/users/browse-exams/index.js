import React, { useContext } from "react";

import Head from "next/head";

import LanguageContext from "../../../helper/store/contexts/language-context";
import { connectDatabase } from "../../../helper/database/db";

import BrowseExams from "../../../components/main/users/browseExams/BrowseExams";

function BrowseExamsRoute({ allExams, allDepartments }) {
	const { lng } = useContext(LanguageContext);
	return (
		<>
			<Head>
				<title>{lng("Exams")}</title>
			</Head>
			<BrowseExams allExams={allExams} allDepartments={allDepartments} />
		</>
	);
}

export default BrowseExamsRoute;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();

	const allExamsArray = await db
		.collection("exams")
		.find({})
		.project({ name: 1, department: 1, subdepartment: 1 })
		.toArray();
	const allExams = allExamsArray.map((a) => ({ ...a, _id: `${a._id}` }));

	const allDepartmentsArray = await db
		.collection("departments")
		.find({})
		.toArray();
	const allDepartments = allDepartmentsArray.map((a) => ({
		...a,
		_id: `${a._id}`,
	}));

	client.close();
	return { props: { allExams, allDepartments }, revalidate: 600 };
}
