import React from "react";

import Input from "../../../../UI/Input";
import Textarea from "../../../../UI/Textarea";

import styles from "./PaymentOptions.module.css";
function PaymentOptions({ insurance, dispatchExamInputStateAction }) {
	return (
		<>
			<div className={styles.sameLine}>
				<h1>{insurance.ecoTitle}</h1>
				<Input
					id={`${insurance.ecoTitle}-price`}
					label="€"
					value={insurance.price}
					onChange={(e) => {
						dispatchExamInputStateAction({
							type: "setEcoPrice",
							insuranceLogged: insurance,
							newEcoPriceValue: e.target.value,
						});
					}}
				/>
			</div>

			<Textarea
				id={insurance.details}
				value={insurance.details}
				onChange={(e) =>
					dispatchExamInputStateAction({
						type: "setEcoDetails",
						insuranceLogged: insurance,
						newEcoDetailsValue: e.target.value,
					})
				}
				rows={5}
				cols={200}
			/>
		</>
	);
}

export default PaymentOptions;
