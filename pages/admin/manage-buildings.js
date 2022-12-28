import AdminNavbar from "../../components/main/admin/AdminNavbar";
import ManageBuildings from "../../components/main/admin/manageAssets/manageBuildings/ManageBuildings";
import { connectDatabase } from "../../helper/database/db";

function ManageBuildingsRoute({ allBuildings }) {
	return (
		<div>
			<AdminNavbar />
			<ManageBuildings allBuildings={allBuildings} />
		</div>
	);
}

export default ManageBuildingsRoute;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();
	const data = await db
		.collection("assets")
		.find({ building: { $exists: true } })
		.project({ _id: 0 })
		.toArray();
	return { props: { allBuildings: data } };
}
