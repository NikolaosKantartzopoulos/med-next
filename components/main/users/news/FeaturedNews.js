import React, { useContext, useState } from "react";
import NewsContext from "../../../../helper/store/contexts/news-context";
import LoadingSpinner from "../../../UI/LoadingSpinner";

import FilterNews from "./FilterNews.js";
import NewsTab from "./NewsTab";

import styles from "./FeaturedNews.module.css";

function FeaturedNews() {
	const { allNews, allUsers, activeNews, loading } = useContext(NewsContext);

	const [visibleNews, setVisibleNews] = useState(activeNews);

	return (
		<section className={styles.newsSection}>
			<FilterNews
				visibleNews={visibleNews}
				setVisibleNews={setVisibleNews}
				activeNews={activeNews}
			/>
			{loading && <LoadingSpinner />}
			{!loading &&
				visibleNews
					.sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : -1))
					.map((n) => {
						if (n._id) {
							return <NewsTab item={n} key={n._id} />;
						} else {
							return <LoadingSpinner />;
						}
					})}
		</section>
	);
}

export default FeaturedNews;
