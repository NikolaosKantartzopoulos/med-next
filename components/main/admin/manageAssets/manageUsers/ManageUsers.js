import React, { useReducer, useState } from "react";
import manageUsersReducer from "../../../../../helper/store/reducers/manage-users-reducer";

import Input from "../../../../UI/Input";
import RadioButton from "../../../../UI/RadioButton";

function ManageUsers() {
	const [tableFilter, setTableFilter] = useState("All");
	const [manageUsersState, dispatchManageUsersAction] = useReducer(
		manageUsersReducer,
		{
			userEmail: "",
			userEmaiBuffer: "",
			userName: "",
			userPassword: "",
			userPasswordBuffer: "",
			userPosition: "",
			userPosition2: "",
		}
	);
	return (
		<div>
			<Input
				id="userNameInput"
				label="Username"
				value={manageUsersState.userName}
				onChange={(e) =>
					dispatchManageUsersAction({
						type: "setUsername",
						newUsernameValue: e.target.value,
					})
				}
			/>
			<Input
				id="userEmailInput"
				label="Email"
				value={manageUsersState.userEmail}
				onChange={(e) =>
					dispatchManageUsersAction({
						type: "setEmail",
						newEmailValue: e.target.value,
					})
				}
			/>
			<Input
				id="userPasswordInput"
				label="Password"
				value={manageUsersState.userPassword}
				onChange={(e) =>
					dispatchManageUsersAction({
						type: "setPassword",
						newPasswordValue: e.target.value,
					})
				}
			/>
			<div
				onChange={(e) =>
					dispatchManageUsersAction({
						type: "setUserPosition",
						newUserPositionValue: e.target.value,
					})
				}
			>
				<RadioButton id="doctor" label="Doctor" name="selectPosition" />
				<RadioButton id="secretary" label="Secretary" name="selectPosition" />
			</div>
			<div id="secretarySelectPosition2">
				<RadioButton id="secrFront" label="Front Desk" name="selectPosition2" />
				<RadioButton id="secrTypeing" label="Type" name="selectPosition2" />
				<RadioButton
					id="secrPhone"
					label="Phone Center"
					name="selectPosition2"
				/>
			</div>
		</div>
	);
}

export default ManageUsers;
