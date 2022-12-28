import React from "react";

import styles from "./PaymentOptions.module.css";
import Input from "../../../../UI/Input";
import Textarea from "../../../../UI/Textarea";

import { debounce } from "lodash";

function PaymentOptions({ insurance, dispatchExamInputStateAction }) {
	return (
		<>
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

			<Textarea
				id={insurance.details}
				label="Details"
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
