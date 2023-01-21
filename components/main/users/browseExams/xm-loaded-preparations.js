import React, { useContext, useEffect, useState } from "react";

import LanguageContext from "../../../../helper/store/contexts/language-context";

import FoldUnfold from "../../../UI/fold-unfold";
import LoadingSpinner from "../../../UI/LoadingSpinner";

import styles from "./xm-loaded-preparations.module.css";

function ExamLoadedPreparations({ xm }) {
	const { lng } = useContext(LanguageContext);

	const [genPrepRetrieved, setGenPrepRetrieved] = useState(null);

	useEffect(() => {
		async function getPrepText() {
			const res = await fetch("/api/admin/fetch-prep", {
				method: "POST",
				headers: { "Content-Type": "application-json" },
				body: JSON.stringify({ prep: xm.generalPreparation }),
			});
			const data = await res.json();
			setGenPrepRetrieved(data.prepRetrieved);
		}
		getPrepText();
	}, []);

	return (
		<FoldUnfold headerText={lng("Preparations")}>
			{xm.generalPreparation && (
				<div>
					<h6>{lng("General")}</h6>
					{genPrepRetrieved ? (
						<div className={styles.prepText}>{genPrepRetrieved.details}</div>
					) : (
						<LoadingSpinner />
					)}
				</div>
			)}
			{xm.uniquePreparation && (
				<div>
					<h6>{lng("Unique")}</h6>
					<div className={styles.prepText}>{xm.uniquePreparation}</div>
				</div>
			)}
		</FoldUnfold>
	);
}

export default ExamLoadedPreparations;
