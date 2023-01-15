import React, { useContext } from "react";

import { connectDatabase } from "../../../helper/database/db";

import { NewsContextProvider } from "../../../helper/store/contexts/news-context";
import ToolsContext from "../../../helper/store/contexts/tools-context";

import NewsUI from "../../../components/main/users/news/NewsUI";
import FeaturedNews from "../../../components/main/users/news/FeaturedNews";

import Button from "../../../components/UI/Button";

function NewsIndexRoute({ allNews, allUsers }) {
	const { theme, info, setInfo, infoMessage } = useContext(ToolsContext);
	return (
		<NewsContextProvider
			allNews={allNews}
			allUsers={allUsers}
			info={info}
			setInfo={setInfo}
			infoMessage={infoMessage}
		>
			<NewsUI />
			<FeaturedNews />
		</NewsContextProvider>
	);
}

export default NewsIndexRoute;

export async function getServerSideProps() {
	const [client, db] = await connectDatabase();

	const documents = await db.collection("news").find().toArray();
	const docs = documents.map((doc) => ({ ...doc, _id: doc._id.toString() }));

	const usersDocs = await db
		.collection("assets")
		.find()
		.project({ username: 1 })
		.toArray();
	const allUsers = usersDocs.map((doc) => ({
		...doc,
		_id: doc._id.toString(),
	}));

	await client.close();

	return {
		props: {
			allNews: docs,
			allUsers: allUsers,
		},
	};
}
