import React, { useContext } from "react";
import NewsContext from "../../../../helper/store/contexts/news-context";
import LoadingSpinner from "../../../UI/LoadingSpinner";

import styles from "./FeaturedNews.module.css";
import NewsTab from "./NewsTab";

function FeaturedNews() {
	const { allNews, allUsers, activeNews } = useContext(NewsContext);
	return (
		<>
			{activeNews
				.sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : -1))
				.map((n) => {
					if (n._id) {
						return <NewsTab item={n} key={n._id} />;
					} else {
						return <LoadingSpinner />;
					}
				})}
		</>
	);
}

export default FeaturedNews;
