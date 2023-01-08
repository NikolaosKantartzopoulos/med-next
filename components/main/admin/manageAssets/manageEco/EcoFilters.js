import React, { useContext, useState } from "react";
import EcoContext from "../../../../../helper/store/eco-context";
import styles from "./EcoFilters.module.css";
import _ from "lodash";
import LanguageContext from "../../../../../helper/store/language-context";
function EcoFilters() {
	const {
		allActiveInsurances,
		checkedInsurances,
		setCheckedInsurances,
		checkedDepartments,
		allDepartments,
		setCheckedDepartments,
	} = useContext(EcoContext);
	const { lng } = useContext(LanguageContext);
	const uniqueDeps = _.uniq(allActiveInsurances.map((ins) => ins.department));
	const uniqueInsurances = _.uniq(allActiveInsurances.map((ins) => ins.title));
	const [depShown, setDepShown] = useState(uniqueDeps);
	const [insShown, setInsShown] = useState(uniqueInsurances);

	function handleTitleCheckboxClick(e, item) {
		if (checkedInsurances.includes(item)) {
			setCheckedInsurances(checkedInsurances.filter((a) => item !== a));
		} else {
			setInsShown([...insShown, e.target.value]);
			setCheckedInsurances([...checkedInsurances, e.target.value]);
		}
	}
	function handleDepartmentCheckboxClick(e, item) {
		if (checkedDepartments.includes(item)) {
			setCheckedDepartments(checkedDepartments.filter((a) => item !== a));
		} else {
			setDepShown([...depShown, e.target.value]);
			setCheckedDepartments([...checkedDepartments, e.target.value]);
		}
	}

	return (
		<section className={styles.EcoFiltersSection}>
			<div className={styles.EcoFilter}>
				<h4>{lng("Insurance")}</h4>
				<div className={styles.checkLine}>
					{uniqueInsurances.map((ins) => (
						<div className={styles.setInputLabel} key={ins}>
							<input
								type="checkbox"
								value={ins}
								id={ins}
								name={ins}
								onChange={(e) => handleTitleCheckboxClick(e, ins)}
								checked={checkedInsurances.includes(ins)}
							/>
							<label htmlFor={ins}>{ins}</label>
						</div>
					))}
				</div>
			</div>
			<div className={styles.EcoFilter}>
				<h4>{lng("Departments")}</h4>
				<div className={styles.checkLine}>
					{uniqueDeps.map((ins) => (
						<div className={styles.setInputLabel} key={ins}>
							<input
								type="checkbox"
								value={ins}
								id={ins}
								name={ins}
								onChange={(e) => handleDepartmentCheckboxClick(e, ins)}
								checked={checkedDepartments.includes(ins)}
							/>
							<label htmlFor={ins}>{ins}</label>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default EcoFilters;
