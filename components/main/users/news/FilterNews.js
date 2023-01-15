import React, { useContext, useEffect, useState } from "react";

import NewsContext from "../../../../helper/store/contexts/news-context";
import Button from "../../../UI/Button";

import Checkbox from "../../../UI/Checkbox";

import styles from "./FilterNews.module.css";
import SeachField from "../../../UI/SeachField";
import LanguageContext from "../../../../helper/store/contexts/language-context";

function FilterNews({ activeNews, setVisibleNews }) {
	const newsCtx = useContext(NewsContext);
	const { lng } = useContext(LanguageContext);

	const [showFeatured, setShowFeatured] = useState(true);
	const [showRest, setShowRest] = useState(true);
	const [searchFieldValue, setSearchFieldValue] = useState("");

	async function fetchNews(num) {
		newsCtx.setLoading(true);
		const getRes = await fetch("/api/users/fetch-news", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ num: num }),
		});
		const data = await getRes.json();
		console.log(data);
		newsCtx.setActiveNews(data.newActiveNews);
		newsCtx.setLoading(false);
	}
	function searchNews() {
		const str = `.*${searchFieldValue}.*`;
		const regex = new RegExp(str, "gi");

		const filteredNews = activeNews.filter(
			(xm) => !xm.title.search(regex) || xm.tags.some((a) => !a.search(regex))
		);

		const checkFiltered = filteredNews.filter((a) => {
			if ((showFeatured && a.featured) || (showRest && !a.featured)) {
				return a;
			} else {
				return false;
			}
		});

		setVisibleNews(checkFiltered);
	}

	useEffect(() => {
		searchNews();
	}, [showFeatured, showRest, newsCtx.activeNews]);

	return (
		<div className={styles.filterNewsSection}>
			<div className={styles.buttonDiv}>
				<Button onClick={() => fetchNews(1)}>1 {lng("Month")}</Button>
				<Button onClick={() => fetchNews(3)}>3 {lng("Months")}</Button>
				<Button onClick={() => fetchNews(12)}>12 {lng("Months")}</Button>
			</div>

			<div className={styles.filtersss}>
				<div className={styles.checkboxDiv}>
					<Checkbox
						value={showFeatured}
						label={lng("Featured")}
						checkedIf={showFeatured}
						onChange={() => {
							setShowFeatured(!showFeatured);
						}}
					/>
					<Checkbox
						value={showRest}
						label={lng("Rest")}
						checkedIf={showRest}
						onChange={() => {
							setShowRest(!showRest);
						}}
					/>
				</div>

				<SeachField
					searchFn={searchNews}
					searchFieldValue={searchFieldValue}
					setSearchFieldValue={setSearchFieldValue}
					ctrlElementsFunction={setVisibleNews}
					allItems={activeNews}
				/>
			</div>
		</div>
	);
}

export default FilterNews;
