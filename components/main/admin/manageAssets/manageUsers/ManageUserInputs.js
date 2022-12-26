import React from "react";
import Input from "../../../../UI/Input";
import RadioButton from "../../../../UI/RadioButton";

import styles from "./ManageUserInputs.module.css";

function manageUserInputs({
	userEmail,
	userEmaiBuffer,
	userName,
	userPassword,
	userPasswordBuffer,
	userPosition,
	userPosition2,
	dispatchManageUsersAction,
	setInfo,
}) {
	return (
		<div className={styles.manageUserInputs}>
			<div className={styles.textInputSection}>
				<Input
					id="userNameInput"
					label="Username"
					value={userName}
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
					value={userEmail}
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
					value={userPassword}
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
						checked={userPosition === "doctor"}
						id="doctor"
						label="Doctor"
						name="selectPosition"
					/>
					<RadioButton
						value="secretary"
						checked={userPosition === "secretary"}
						id="secretary"
						label="Secretary"
						name="selectPosition"
					/>
				</div>
				{userPosition === "secretary" ? (
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
							checked={userPosition2 === "frontDesk"}
							id="secrFront"
							label="Front Desk"
							name="selectPosition2"
						/>
						<RadioButton
							value="typist"
							checked={userPosition2 === "typist"}
							id="secrTypist"
							label="Typist"
							name="selectPosition2"
						/>
						<RadioButton
							value="phoneCenter"
							checked={userPosition2 === "phoneCenter"}
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
