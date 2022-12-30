import React, { useContext } from "react";
import Input from "../../../../UI/Input";
import RadioButton from "../../../../UI/RadioButton";
import UsersContext from "../../../../../helper/store/users-context";

import styles from "./ManageUserInputs.module.css";

function manageUserInputs() {
	const {
		setInfo,

		manageUsersState,
		dispatchManageUsersAction,
	} = useContext(UsersContext);
	return (
		<div className={styles.manageUserInputs}>
			<div className={styles.textInputSection}>
				<Input
					id="userNameInput"
					label="Username"
					value={manageUsersState.userName}
					onChange={(e) => {
						setInfo(null);
						dispatchManageUsersAction({
							type: "setUsername",
							newUsernameValue: e.target.value,
						});
					}}
					onBlur={() =>
						dispatchManageUsersAction({
							type: "setUsername",
							newUsernameValue: userName.trim(),
						})
					}
				/>
				<Input
					id="userEmailInput"
					label="Email"
					value={manageUsersState.userEmail}
					onChange={(e) => {
						setInfo(null);
						dispatchManageUsersAction({
							type: "setEmail",
							newEmailValue: e.target.value,
						});
					}}
					onBlur={() =>
						dispatchManageUsersAction({
							type: "setEmail",
							newEmailValue: userEmail.trim(),
						})
					}
				/>
				<Input
					id="userPasswordInput"
					label="Password"
					value={manageUsersState.userPassword}
					onChange={(e) => {
						setInfo(null);
						dispatchManageUsersAction({
							type: "setPassword",
							newPasswordValue: e.target.value,
						});
					}}
					onBlur={() =>
						dispatchManageUsersAction({
							type: "setPassword",
							newPasswordValue: userPassword.trim(),
						})
					}
				/>
			</div>
			<div className={styles.radioButtonSection}>
				<div
					onChange={(e) =>
						dispatchManageUsersAction({
							type: "setUserPosition",
							newUserPositionValue: e.target.value,
						})
					}
					className={styles.position1RadioButtons}
				>
					<RadioButton
						value="doctor"
						checked={manageUsersState.userPosition === "doctor"}
						id="doctor"
						label="Doctor"
						name="selectPosition"
					/>
					<RadioButton
						value="secretary"
						checked={manageUsersState.userPosition === "secretary"}
						id="secretary"
						label="Secretary"
						name="selectPosition"
					/>
				</div>
				{manageUsersState.userPosition === "secretary" ? (
					<div
						id="secretarySelectPosition2"
						onChange={(e) =>
							dispatchManageUsersAction({
								type: "setUserPosition2",
								newUserPosition2Value: e.target.value,
							})
						}
						className={styles.position2RadioButtons}
					>
						<RadioButton
							value="frontDesk"
							checked={manageUsersState.userPosition2 === "frontDesk"}
							id="secrFront"
							label="Front Desk"
							name="selectPosition2"
						/>
						<RadioButton
							value="typist"
							checked={manageUsersState.userPosition2 === "typist"}
							id="secrTypist"
							label="Typist"
							name="selectPosition2"
						/>
						<RadioButton
							value="phoneCenter"
							checked={manageUsersState.userPosition2 === "phoneCenter"}
							id="secrPhone"
							label="Phone Center"
							name="selectPosition2"
						/>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}

export default manageUserInputs;
