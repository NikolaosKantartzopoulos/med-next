import React from "react";

import PaymentOptions from "./PaymentOptions";

import styles from "./ManageExam.module.css";

function ManageExamsEco({ examInputState, dispatchExamInputStateAction }) {
	return (
		<section id="ecoSection" className={styles.ecoSection}>
			{examInputState.eco
				.sort((a, b) => (a.order > b.order ? 1 : -1))
				.map((insurance) => (
					<PaymentOptions
						key={insurance.ecoTitle}
						insurance={insurance}
						dispatchExamInputStateAction={dispatchExamInputStateAction}
					/>
				))}
		</section>
	);
}

export default ManageExamsEco;
