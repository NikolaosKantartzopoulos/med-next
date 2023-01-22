import React, { useContext } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import { useSession } from "next-auth/react";
import { connectDatabase } from "../../helper/database/db";

import ToolsContext from "../../helper/store/contexts/tools-context.js";
import { PreparationsContextProvider } from "../../helper/store/contexts/preparations-context";

import ManagePreparation from "../../components/main/admin/manageAssets/managePreparations/ManagePreparations.js";
import AdminLayout from "../../components/helper/adminLayout";
import LoadingSpinner from "../../components/UI/LoadingSpinner.js";

function ManagePreparationsRoute({ allPreparations }) {
	const { data: session, status } = useSession();

	const { info, setInfo, infoMessage } = useContext(ToolsContext);

	const router = useRouter();

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<AdminLayout>
			<Head>
				<title>Admin</title>
			</Head>
			<PreparationsContextProvider
				allPreparations={allPreparations}
				info={info}
				setInfo={setInfo}
				infoMessage={infoMessage}
			>
				<ManagePreparation />
			</PreparationsContextProvider>
		</AdminLayout>
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
