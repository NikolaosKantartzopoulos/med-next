import { createContext, useReducer, useState } from "react";
import manageUsersReducer from "../../store/reducers/manage-users-reducer";
import { useRouter } from "next/router";

const UsersContext = createContext({});

export function UsersContextProvider({ allUsers, children }) {
	const router = useRouter();
	const [actionLoaded, setActionLoaded] = useState(null);
	const [activeUsers, setActiveUsers] = useState(allUsers);
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showThis, setShowThis] = useState(null);
	const [manageUsersState, dispatchManageUsersAction] = useReducer(
		manageUsersReducer,
		{
			userEmaiBuffer: "",
			userEmail: "",
			userId: "",
			userName: "",
			userNameBuffer: "",
			userPassword: "",
			userPasswordBuffer: "",
			userPosition: "",
			userPosition2: "",
		}
	);

	function addNewUserSetupHandler() {
		setShowThis("showManageUserInputs");
		setActionLoaded("addUser");
	}

	async function submitNewUserHandler() {
		if (
			allUsers.map((a) => a.username).includes(manageUsersState.userName) ||
			activeUsers.map((a) => a.username).includes(manageUsersState.userName)
		) {
			setInfo({
				type: "error",
				text: "Username exists",
			});
			return;
		}
		if (
			allUsers.map((a) => a.email).includes(manageUsersState.userEmail) ||
			activeUsers.map((a) => a.email).includes(manageUsersState.userEmail)
		) {
			setInfo({
				type: "error",
				text: "Email exists",
			});
			return;
		}
		if (
			manageUsersState.userPosition === "secretary" &&
			(manageUsersState.userPosition2 === "" ||
				manageUsersState.userPosition2 === null)
		) {
			setInfo({
				type: "error",
				text: "Position 2 is empty for Secretary",
			});
			return;
		}
		if (
			manageUsersState.userName === "" ||
			manageUsersState.userEmail === "" ||
			manageUsersState.userPassword === "" ||
			manageUsersState.userPosition === ""
		) {
			setInfo({
				type: "error",
				text: "Some fields are empty",
			});
			return;
		}
		setShowThis(null);
		const newUserInfo = {
			username: manageUsersState.userName,
			email: manageUsersState.userEmail,
			password: manageUsersState.userPassword,
			position: manageUsersState.userPosition,
			position2: manageUsersState.userPosition2,
		};
		handlePostRequest([...activeUsers, newUserInfo]);
		setActiveUsers([...activeUsers, newUserInfo]);
		dispatchManageUsersAction({ type: "resetAll" });
		setActionLoaded(null);
		setInfo({ type: "success", text: "User submited" });
		setTimeout(() => {
			setInfo(null);
		}, 3000);
	}

	function editThisUser(e, user) {
		setActionLoaded("editUser");
		setShowThis("showManageUserInputs");
		dispatchManageUsersAction({
			type: "setThisUserForEdit",
			_id: user._id,
			username: user.username,
			userNameBuffer: user.username,
			email: user.email,
			password: user.password,
			position: user.position,
			position2: user.position2,
		});
	}

	function submitEditedUser() {
		const userToEdit = activeUsers.find(
			(user) => user.username === manageUsersState.userNameBuffer
		);
		const filteredUsers = activeUsers.filter(
			(user) => user.username !== manageUsersState.userNameBuffer
		);
		let userToAdd = {
			...userToEdit,
			username: manageUsersState.userName,
			password: manageUsersState.userPassword,
			email: manageUsersState.userEmail,
			position: manageUsersState.userPosition,
			position2: manageUsersState.userPosition2,
		};
		setActiveUsers([...filteredUsers, userToAdd]);
		handlePostRequest([...filteredUsers, userToAdd]);
		dispatchManageUsersAction({ type: "resetAll" });
		setActionLoaded(null);
		setInfo({ type: "success", text: "Edit submited" });
		setTimeout(() => {
			setInfo(null);
		}, 3000);
	}

	function deleteThisUser(e, user) {
		const filteredUsers = activeUsers.filter((entry) => user._id !== entry._id);
		handlePostRequest(filteredUsers);
		setActiveUsers(filteredUsers);
	}

	async function handlePostRequest(these) {
		let toPost = { activeUsers: these };
		setIsLoading(true);
		const result = await fetch("/api/admin/manage-users", {
			method: "POST",
			body: JSON.stringify(toPost),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await result.json();
		setIsLoading(false);
		setInfo({ type: "ok", text: "Changes submited" });
		setTimeout(() => setInfo(null));
	}

	const usersContext = {
		actionLoaded,
		activeUsers,
		addNewUserSetupHandler,
		deleteThisUser,
		dispatchManageUsersAction,
		editThisUser,
		handlePostRequest,
		info,
		isLoading,
		manageUsersState,
		setActionLoaded,
		setActiveUsers,
		setInfo,
		setIsLoading,
		setShowThis,
		showThis,
		submitEditedUser,
		submitNewUserHandler,
	};
	return (
		<UsersContext.Provider value={usersContext}>
			{children}
		</UsersContext.Provider>
	);
}

export default UsersContext;
