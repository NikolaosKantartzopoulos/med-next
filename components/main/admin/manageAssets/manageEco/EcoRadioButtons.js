import React, { useContext } from "react";
import LanguageContext from "../../../../../helper/store/language-context.js";
import EcoContext from "../../../../../helper/store/eco-context.js";
import RadioButton from "../../../../UI/RadioButton.js";
import ToolsContext from "../../../../../helper/store/tools-context.js";
import styles from "./EcoRadioButtons.module.css";

function EcoRadioButtons() {
	const { lng } = useContext(LanguageContext);
	const {
		dispatchEcoReducerAction,
		setInfo,
		distinctDepartments,
		inputsState,
		actionLoaded,
		allDepartments,
	} = useContext(EcoContext);

	const { theme } = useContext(ToolsContext);

	return (
		<div style={{ color: theme == "dark" ? "white" : null }}>
			{actionLoaded && (
				<div className={styles.asdf}>
					{actionLoaded == "addEco" && (
						<div>
							<h4>{lng("Departments")}</h4>
							<div
								className={styles.EcoRadioButtonsSection}
								onChange={(e) => {
									setInfo(null);
									dispatchEcoReducerAction({
										type: "setDepartment",
										newDepartment: e.target.value,
									});
								}}
							>
								{distinctDepartments.map((dep) => (
									<RadioButton
										value={dep}
										key={dep}
										label={dep}
										name="departmentSelect"
										checked={inputsState.department === dep}
									/>
								))}
							</div>
						</div>
					)}
					{actionLoaded == "addEco" && (
						<div className={styles.ecoSubCheck}>
							{inputsState.department != "" && actionLoaded == "addEco" && (
								<>
									<h4>{lng("Subdepartments")}</h4>
									<div
										className={styles.EcoRadioButtonsSection}
										onChange={(e) => {
											setInfo(null);
											dispatchEcoReducerAction({
												type: "setSubdepartment",
												newSubdepartment: e.target.value,
											});
										}}
									>
										{allDepartments
											.find((a) => inputsState.department == a.department)
											.sub.map((selSub) => (
												<RadioButton
													value={selSub}
													key={selSub}
													label={selSub}
													name="subdepartmentSelect"
													checked={inputsState.subdepartment === selSub}
												/>
											))}
									</div>
								</>
							)}
						</div>
					)}
				</div>
			)}
			{actionLoaded == "editEco" && (
				<div className={styles.editDivisions}>
					<div></div>
					<div className={styles.editDivisionsFlex}>
						<h4 className={styles.editDiv}>{inputsState.department}</h4>
						<h4 className={styles.editDiv}>{inputsState.subdepartment}</h4>
					</div>
				</div>
			)}
		</div>
	);
}

export default EcoRadioButtons;
