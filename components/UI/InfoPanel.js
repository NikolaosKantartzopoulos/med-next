import React from "react";

import styles from "./InfoPanel.module.css";

function InfoPanel({ info }) {
	return (
		<div className={styles.infoPanel}>
			{info && (
				<div
					style={{
						backgroundColor: info.type == "error" ? "darkred" : "lime",
					}}
					className={styles.info}
				>
					{info.text}
				</div>
			)}
		</div>
	);
}

export default InfoPanel;
