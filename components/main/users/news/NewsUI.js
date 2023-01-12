import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";
import NewsContext from "../../../../helper/store/contexts/news-context";

import NewsForm from "./NewsForm";

import ButtonAdd from "../../../UI/ButtonAdd";

function NewsUI() {
	const newsCtx = useContext(NewsContext);
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		newsCtx.setActionLoaded(null);
		if (!session) {
			router.replace("/users/browse-exams");
		}
	}, [session]);

	return (
		<div>
			{session && <div>{session.user._id}</div>}
			<ButtonAdd onClick={(e) => newsCtx.setAddNews(e, session.user)} />
			{newsCtx.actionLoaded === "addNews" && <NewsForm />}
		</div>
	);
}

export default NewsUI;
