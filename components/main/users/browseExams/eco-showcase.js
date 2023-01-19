import React, { useContext, useEffect, useState } from "react";

import LanguageContext from "../../../../helper/store/contexts/language-context";

import LoadingSpinner from "../../../UI/LoadingSpinner";

import styles from "./eco-showcase.module.css";

function EcoShowcase({ eco, department, subdepartment }) {
	const [commonEco, setCommonEco] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { lng } = useContext(LanguageContext);

	useEffect(() => {
		setIsLoading(true);
		const item = {
			eco: eco,
			department: department,
			subdepartment: subdepartment,
		};
		if (eco.common) {
			async function getCommonEco() {
				const res = await fetch("/api/users/get-common-eco", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(item),
				});
				const data = await res.json();
				setCommonEco(data.commonEco);
			}
			getCommonEco();
		}
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className={styles.ecoDiv}>
			<h5 className={styles.titleHeader}>
				<span>{commonEco ? commonEco.title : eco.title}</span>
				<span>{commonEco ? commonEco.cost : eco.cost} €</span>
			</h5>
			<div className={styles.detDiv}>
				<p className={styles.detailsHeader}>{lng("Details")}</p>
				{commonEco ? (
					<p>{commonEco.details.trim() ? commonEco.details : "-----"}</p>
				) : (
					<p>eco.details</p>
				)}
			</div>
		</div>
	);
}

export default EcoShowcase;
