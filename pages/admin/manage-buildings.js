import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AdminLayout from "../../components/helper/adminLayout";

import ManageBuildings from "../../components/main/admin/manageAssets/manageBuildings/ManageBuildings";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { connectDatabase } from "../../helper/database/db";

function ManageBuildingsRoute({ allBuildings }) {
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
			<ManageBuildings allBuildings={allBuildings} />
		</AdminLayout>
	);
}

export default ManageBuildingsRoute;

export async function getServerSideProps() {
	const [client, db] = await connectDatabase();
	const data = await db.collection("buildings").find({}).toArray();

	const docs = data.map((d) => ({ ...d, _id: d._id.toString() }));
	return { props: { allBuildings: docs } };
}
