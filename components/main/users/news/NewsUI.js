import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router.js";
import { useSession } from "next-auth/react";
import NewsContext from "../../../../helper/store/contexts/news-context";

import NewsForm from "./NewsForm";

import ButtonAdd from "../../../UI/ButtonAdd";
import ButtonSave from "../../../UI/ButtonSave";
import ButtonClose from "../../../UI/ButtonClose";

import styles from "./NewsUI.module.css";

function NewsUI() {
	const newsCtx = useContext(NewsContext);
	const router = useRouter();
	const { data: session, status } = useSession();

	// useEffect(() => {
	// 	newsCtx.setActionLoaded(null);
	// 	if (!session) {
	// 		router.replace("/users/browse-exams");
	// 	}
	// }, [session]);

	return (
		<div className={styles.newsUI}>
			<div className={styles.controlButtons}>
				{!newsCtx.actionLoaded && (
					<ButtonAdd
						onClick={(e) => newsCtx.setAddNews(e, session.user)}
						disabled={!session}
					/>
				)}
				{newsCtx.actionLoaded === "addNews" && (
					<ButtonSave onClick={newsCtx.saveAddedNews} />
				)}
				{newsCtx.actionLoaded === "editItem" && (
					<ButtonSave onClick={newsCtx.saveEditedNews} />
				)}

				{newsCtx.actionLoaded && <ButtonClose onClick={newsCtx.resetUI} />}
			</div>
			{newsCtx.actionLoaded && <NewsForm />}
		</div>
	);
}

export default NewsUI;
