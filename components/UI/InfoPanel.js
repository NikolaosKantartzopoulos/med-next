import React from "react";

import styles from "./InfoPanel.module.css";

function InfoPanel({ info }) {
	return (
		<>
			{info && (
				<div
					style={{
						backgroundColor: info.type == "error" ? "darkred" : "green",
					}}
					className={styles.infoPanel}
				>
					{info.text}
				</div>
			)}
		</>
	);
}

export default InfoPanel;
