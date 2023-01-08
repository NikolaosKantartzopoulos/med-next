import React, { useContext, useState } from "react";
import ExamContext from "../../../../../helper/store/exam-context";
import _ from "lodash";

import PaymentOptions from "./PaymentOptions";

import styles from "./ManageExam.module.css";
import checkStyles from "./ManageExamsEco.module.css";
import LanguageContext from "../../../../../helper/store/language-context";
import ToolsContext from "../../../../../helper/store/tools-context";

function ManageExamsEco() {
	const { examInputState, dispatchExamInputStateAction, allActiveEco } =
		useContext(ExamContext);
	const { theme } = useContext(ToolsContext);
	const { lng } = useContext(LanguageContext);
	const insurancesOfThisDepartment = allActiveEco
		.filter((i) => i.department === examInputState.department)
		.filter((i) => i.subdepartment === examInputState.subdepartment);
	const uniqueInsurances = _.uniq(
		insurancesOfThisDepartment.map((ins) => ins.title)
	);
	const [checkedInsurances, setCheckedInsurances] = useState(
		insurancesOfThisDepartment
	);
	const [insShown, setInsShown] = useState(insurancesOfThisDepartment);

	function handleTitleCheckboxClick(e, item) {
		if (checkedInsurances.includes(item)) {
			setCheckedInsurances(checkedInsurances.filter((a) => item !== a));
			dispatchExamInputStateAction({
				type: "removePayment",
				commonInsTitle: item,
			});
		} else {
			setInsShown([...insShown, e.target.value]);
			setCheckedInsurances([...checkedInsurances, e.target.value]);
			dispatchExamInputStateAction({
				type: "addCommonPayment",
				commonInsTitle: item,
				subdepartmentInsTitle: examInputState.subdepartment,
			});
		}
	}

	return (
		<section
			id="ecoSection"
			className={styles.ecoSection}
			style={{ color: theme == "dark" ? "white" : null }}
		>
			<div className={checkStyles.EcoFilter}>
				<h4>{lng("Insurance")}</h4>
				<div className={checkStyles.checkLine}>
					{uniqueInsurances.map((ins) => (
						<div className={checkStyles.setInputLabel} key={ins}>
							<input
								type="checkbox"
								value={ins}
								id={ins}
								name={ins}
								onChange={(e) => handleTitleCheckboxClick(e, ins)}
								checked={examInputState.eco.map((a) => a.title).includes(ins)}
							/>
							<label htmlFor={ins}>{ins}</label>
						</div>
					))}
				</div>
			</div>
			{insurancesOfThisDepartment
				.filter((i) => examInputState.eco.map((a) => a.title).includes(i.title))
				.sort((a, b) => (a.order > b.order ? 1 : -1))
				.map((insurance) => (
					<PaymentOptions
						key={insurance.title}
						insurance={insurance}
						dispatchExamInputStateAction={dispatchExamInputStateAction}
						allActiveEco={allActiveEco}
						examInputState={examInputState}
						insurancesOfThisDepartment={insurancesOfThisDepartment}
					/>
				))}
		</section>
	);
}

export default ManageExamsEco;
