import React, { useContext } from "react";
import Image from "next/image";

import starIcon from "../../../../public/images/star.svg";
import editIcon from "../../../../public/images/edit.svg";
import deleteIcon from "../../../../public/images/delete.svg";

import styles from "./NewsTab.module.css";
import NewsContext from "../../../../helper/store/contexts/news-context";

import { useSession } from "next-auth/react";

function NewsTab({ item }) {
	const { data: session } = useSession();
	const newsCtx = useContext(NewsContext);
	const date = new Date(item.dateCreated);

	return (
		<div className={styles.newsFrame}>
			<h4 className={styles.newsh4}>
				{item.title}

				<div className={styles.controlIcons}>
					{item.featured && <Image src={starIcon} alt="featured news" />}{" "}
					{session && (
						<>
							<Image
								src={editIcon}
								alt="Edit news"
								className={styles.controlIcon}
								onClick={(e) => newsCtx.setEditNews(e, item, session.user)}
							/>
							<Image
								src={deleteIcon}
								alt="Edit news"
								className={styles.controlIcon}
								onClick={(e) => newsCtx.deleteNews(e, item)}
							/>
						</>
					)}
				</div>
			</h4>
			<div className={styles.idAndDate}>
				<span>
					{newsCtx.allUsers.find((usr) => usr._id == item.userID)
						? newsCtx.allUsers.find((usr) => usr._id == item.userID).username
						: "---"}
				</span>
				<span className={styles.timez}>
					<span>
						{date.getDate() +
							" / " +
							(date.getMonth() + 1) +
							" / " +
							date.getFullYear().toString().substring(2, 4)}
					</span>
					<span>{date.getHours() + ":" + date.getMinutes()}</span>
				</span>
			</div>
			<div className={styles.newsTags}>
				{item.tags.map((t) => (
					<div className={styles.newsTag} key={t}>
						{t}
					</div>
				))}
			</div>
			<div className={styles.textNews}>{item.text}</div>
		</div>
	);
}

export default NewsTab;
