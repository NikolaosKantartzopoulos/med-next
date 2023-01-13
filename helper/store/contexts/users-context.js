import { createContext, useReducer, useState } from "react";
import manageUsersReducer from "../../store/reducers/manage-users-reducer";
import { useRouter } from "next/router";

const UsersContext = createContext({});

export function UsersContextProvider({ allUsers, info, setInfo, children }) {
	const router = useRouter();
	const [actionLoaded, setActionLoaded] = useState(null);
	const [activeUsers, setActiveUsers] = useState(allUsers);
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

		setIsLoading(true);
		const response = await fetch("/api/admin/manage-users", {
			method: "POST",
			body: JSON.stringify({ newUserInfo }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			console.log(data.insertedId);
			setActiveUsers([
				...activeUsers.filter((usr) => usr._id != data.insertedId),
				{ ...newUserInfo, _id: data.insertedId },
			]);
			setInfo({ type: "ok", text: "New user submited successfully" });
			setTimeout(() => setInfo(null), 3000);
		} else {
			setInfo({ type: "error", text: "Something went wrong" });
			setTimeout(() => setInfo(null), 3000);
			router.reload();
		}
		setIsLoading(false);

		dispatchManageUsersAction({ type: "resetAll" });
		setActionLoaded(null);
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

	async function submitEditedUser() {
		setIsLoading(true);
		const response = await fetch("/api/admin/manage-users", {
			method: "PUT",
			body: JSON.stringify({ editedUser: manageUsersState }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			const filteredUsers = activeUsers.filter(
				(usr) => usr._id != manageUsersState.userId
			);
			setActiveUsers([...filteredUsers, { ...data.editedUserNewState }]);
			setInfo(data);
			setTimeout(() => setInfo(null), 3000);
		}
		setIsLoading(false);
		dispatchManageUsersAction({ type: "resetAll" });
		setActionLoaded(null);
	}

	async function deleteThisUser(e, user) {
		setIsLoading(true);
		const res = await fetch("/api/admin/manage-users", {
			method: "DELETE",
			body: JSON.stringify({ toDelete: user }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			const data = await res.json();
			setInfo(data);
			setTimeout(() => setInfo(null), 3000);
		}
		setActiveUsers([...activeUsers.filter((usr) => usr._id != user._id)]);
		setIsLoading(false);
	}

	const usersContext = {
		actionLoaded,
		activeUsers,
		addNewUserSetupHandler,
		deleteThisUser,
		dispatchManageUsersAction,
		editThisUser,
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
