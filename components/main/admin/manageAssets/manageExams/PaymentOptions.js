import React, { useContext, useState } from "react";
import LanguageContext from "../../../../../helper/store/contexts/language-context";

import Input from "../../../../UI/Input";
import Textarea from "../../../../UI/Textarea";

import styles from "./PaymentOptions.module.css";
function PaymentOptions({
	insurance,
	dispatchExamInputStateAction,
	allActiveEco,
	examInputState,
	insurancesOfThisDepartment,
}) {
	const { lng } = useContext(LanguageContext);
	const [commonPayment, setCommonPayment] = useState(
		examInputState.eco.find((a) => a.title === insurance.title).common
	);

	function setPaymentType() {
		setCommonPayment(!commonPayment);
		if (!commonPayment) {
			dispatchExamInputStateAction({
				type: "resetPaymentToCommon",
				insToReset: insurance,
			});
		} else {
			dispatchExamInputStateAction({
				type: "setEmptyUniquePayment",
				emptyIns: insurance,
			});
			return;
		}
	}

	return (
		<>
			<div className={styles.sameLine}>
				<h1>{insurance.title}</h1>
				<label
					htmlFor={`commonPay-${insurance.title}`}
					style={{ height: "1rem" }}
				>
					{lng("CommonPaymentAndDetails")}
					<input
						type="checkbox"
						id={`commonPay-${insurance.title}`}
						checked={commonPayment}
						onChange={setPaymentType}
					/>
				</label>

				{commonPayment ? (
					<div className={styles.commonPayment}>
						<div>€</div>
						<div>{insurance.cost}</div>
					</div>
				) : (
					<Input
						id={`${insurance.title}-price`}
						label="€"
						value={
							examInputState.eco.find((a) => a.title === insurance.title).cost
						}
						onChange={(e) => {
							dispatchExamInputStateAction({
								type: "setEcoPrice",
								insuranceLogged: insurance,
								newEcoPriceValue: e.target.value,
							});
						}}
					/>
				)}
			</div>

			{commonPayment ? (
				<div className={styles.commonDetails}>
					{/* {allActiveEco
						.filter((i) => i.department === insurance.department)
						.filter((i) => i.title === insurance.title)[0].details === ""
						? "---No details---"
						: allActiveEco
								.filter((i) => i.department === insurance.department)
								.filter((i) => i.title === insurance.title)[0].details} */}
					{insurance.details.trim() === ""
						? "---No details---"
						: insurance.details}
				</div>
			) : (
				<Textarea
					id={insurance.details}
					value={
						examInputState.eco.find((a) => a.title === insurance.title).details
					}
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
			)}
		</>
	);
}

export default PaymentOptions;
