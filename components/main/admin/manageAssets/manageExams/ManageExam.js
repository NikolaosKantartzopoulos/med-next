import React, { useReducer, useEffect } from "react";

import Button from "../../../../UI/Button";
import Input from "../../../../UI/Input";
import RadioButton from "../../../../UI/RadioButton";
import Textarea from "../../../../UI/Textarea";
import TinyTabs from "./TinyTabs";

import {
	initialObject,
	examInputReducer,
} from "../../../../../helper/store/reducers/manage-exam-input-reducer";

import styles from "./ManageExam.module.css";
import ScheduleTable from "./ScheduleTable";
import PaymentOptions from "./PaymentOptions";

function ManageExam({ allActiveDepartments, allActiveDoctors }) {
	const [examInputState, dispatchExamInputStateAction] = useReducer(
		examInputReducer,
		initialObject
	);

	return (
		<div>
			<div className={styles.titleAndDepartments}>
				<div>
					<Input
						id="examName"
						label="Name"
						value={examInputState.name}
						onChange={(e) =>
							dispatchExamInputStateAction({
								type: "setName",
								newName: e.target.value,
							})
						}
					/>
					<Input
						id="nhsTitle"
						label="NHS Title"
						value={examInputState.nhsDescription}
						onChange={(e) =>
							dispatchExamInputStateAction({
								type: "setNhsDescription",
								newNhsDescription: e.target.value,
							})
						}
					/>
				</div>
				<div className={styles.radioButtonsSection}>
					<div>
						<h4>Department</h4>
						<div
							onChange={(e) =>
								dispatchExamInputStateAction({
									type: "setDepartment",
									newDepartment: e.target.value,
								})
							}
							className={styles.radioButtonsDiv}
						>
							{allActiveDepartments.map((dep) => (
								<RadioButton
									key={dep.department}
									id={dep.department}
									label={dep.department}
									name={"departments"}
									disabled={false}
									value={dep.department}
									checked={dep.department === examInputState.department}
								/>
							))}
						</div>
					</div>
					<div>
						<h4>Subdepartment</h4>
						<div
							onChange={(e) =>
								dispatchExamInputStateAction({
									type: "setSubepartment",
									newSubdepartment: e.target.value,
								})
							}
							className={styles.radioButtonsDiv}
						>
							{allActiveDepartments
								.find((d) => d.department === examInputState.department)
								.sub.map((sub) => (
									<RadioButton
										key={sub}
										id={sub}
										label={sub}
										name={"sub"}
										disabled={false}
										value={sub}
										checked={sub === examInputState.subdepartment}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
			<div id="doctorsSection" className={styles.doctorsSection}>
				{/* Todo dynamically create this list from available doctors*/}
				<TinyTabs
					allActiveDoctors={allActiveDoctors}
					examDoctors={examInputState.doctors}
					dispatchExamInputStateAction={dispatchExamInputStateAction}
				/>
			</div>
			<div className={styles.scheduleTables}>
				{[...examInputState.buildingsSchedule]
					.sort((a, b) => (a.buildingName > b.buildingName ? 1 : -1))
					.map((building) => (
						<ScheduleTable
							key={building.buildingName}
							building={building}
							dispatchExamInputStateAction={dispatchExamInputStateAction}
						/>
					))}
			</div>

			<fieldset id="preparationsSection" className={styles.preparationsSection}>
				<legend>Preparations</legend>
				<Textarea
					id="generalPreparation"
					label="General"
					value={examInputState.generalPreparation}
					onChange={(e) =>
						dispatchExamInputStateAction({
							type: "setGeneralPreparation",
							newGeneralPreparation: e.target.value,
						})
					}
					rows={5}
					cols={200}
				/>
				<Textarea
					id="uniquePreparation"
					label="Unique"
					value={examInputState.uniquePreparation}
					onChange={(e) =>
						dispatchExamInputStateAction({
							type: "setUniquePreparation",
							newUniquePreparation: e.target.value,
						})
					}
					rows={5}
					cols={200}
				/>
			</fieldset>
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
			<Button onClick={() => console.log(examInputState)}>Submit</Button>
		</div>
	);
}

export default ManageExam;
