import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import ManageBuildings from "../../components/main/admin/manageAssets/manageBuildings/ManageBuildings";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { connectDatabase } from "../../helper/database/db";

function ManageBuildingsRoute({ allBuildings }) {
	const [inProp, setInProp] = useState(false);

	useEffect(() => {
		setInProp(true);
		return () => setInProp(false);
	}, [inProp]);

	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<>
			{!allBuildings ? (
				<LoadingSpinner />
			) : (
				<div>
					<AdminNavbar />
					<ManageBuildings allBuildings={allBuildings} />
				</div>
			)}
		</>
	);
}

export default ManageBuildingsRoute;

export async function getServerSideProps() {
	const [client, db] = await connectDatabase();
	const data = await db
		.collection("buildings")
		.find({})
		.project({ _id: 0 })
		.toArray();
	return { props: { allBuildings: data } };
}
