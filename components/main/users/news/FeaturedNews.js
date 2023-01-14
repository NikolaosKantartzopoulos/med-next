import React, { useContext } from "react";
import NewsContext from "../../../../helper/store/contexts/news-context";
import LoadingSpinner from "../../../UI/LoadingSpinner";

import styles from "./FeaturedNews.module.css";
import NewsTab from "./NewsTab";

const snew = {
	_id: "63c07d590445258e474712d2",
	dateCreated: "12/1/2023",
	featured: true,
	tags: ["a", "as"],
	text: "asdf",
	title: "qwerooo",
	userID: "63a8a6f0af08ca6c5153f010",
};

function FeaturedNews() {
	const { allNews, allUsers, activeNews } = useContext(NewsContext);

	return (
		<>
			{activeNews.map((n) => {
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
