import React from "react";
import ManagePreparation from "../../components/main/admin/manageAssets/managePreparations/ManagePreparations.js";
import AdminNavbar from "../../components/main/admin/AdminNavbar.js";
import { PreparationsContextProvider } from "../../helper/store/preparations-context";

import { connectDatabase } from "../../helper/database/db";

function ManagePreparationsRoute({ allPreparations }) {
	return (
		<>
			{!allPreparations ? (
				<LoadingSpinner />
			) : (
				<PreparationsContextProvider allPreparations={allPreparations}>
					<AdminNavbar />
					<ManagePreparation />
				</PreparationsContextProvider>
			)}
		</>
	);
}

export default ManagePreparationsRoute;

export async function getServerSideProps() {
	const [client, db] = await connectDatabase();

	const preparations = await db.collection("preparations").find().toArray();
	const allPreparations = preparations.map((prep) => ({
		...prep,
		_id: `${prep._id}`,
	}));
	client.close();
	return { props: { allPreparations: allPreparations } };
}