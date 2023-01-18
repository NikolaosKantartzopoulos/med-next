import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../UI/LoadingSpinner";

import styles from "./eco-showcase.module.css";

function EcoShowcase({ eco, department, subdepartment }) {
	const [commonEco, setCommonEco] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const item = {
			eco: eco,
			department: department,
			subdepartment: subdepartment,
		};
		if (eco.common) {
			console.log("eco.common exists");
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
		<div>
			<h5 className={styles.titleHeader}>
				<span>{commonEco ? commonEco.title : eco.title}</span>
				<span>{commonEco ? commonEco.cost : eco.cost} </span>
			</h5>
			<div>
				<p className={styles.detailsHeader}>Details</p>
				{commonEco ? (
					commonEco.details ? (
						<p>{commonEco.details}</p>
					) : (
						<p className={styles.noDetails}>-----</p>
					)
				) : (
					eco.details
				)}
			</div>
		</div>
	);
}

export default EcoShowcase;
