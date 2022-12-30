import React from "react";
import Image from "next/image";

import Button from "../../../../UI/Button";
import ButtonClose from "../../../../UI/ButtonClose";

import addIcon from "../../../../../public/images/plus.svg";
import saveIcon from "../../../../../public/images/save.svg";

import styles from "./ManageUsersUI.module.css";

function ManageUsersUI({
	actionLoaded,
	addNewUserSetupHandler,
	submitNewUserHandler,
	submitEditedUser,
	setActionLoaded,
	setShowThis,
	setInfo,
}) {
	return (
		<div className={styles.ManageUsersUI}>
			{actionLoaded === null && (
				<>
					<Button
						onClick={addNewUserSetupHandler}
						customStyle={{ width: "8rem" }}
					>
						<Image src={addIcon} alt="add new user" />
						Add User
					</Button>
				</>
			)}
			{actionLoaded === "addUser" && (
				<Button onClick={submitNewUserHandler} customStyle={{ width: "8rem" }}>
					<Image src={saveIcon} alt="save new user" />
					Add User
				</Button>
			)}

			{actionLoaded == "editUser" && (
				<Button onClick={submitEditedUser} customStyle={{ width: "10rem" }}>
					<Image src={addIcon} alt="submit edited user" />
					Update User
				</Button>
			)}
			{(actionLoaded === "addUser" || actionLoaded === "editUser") && (
				<ButtonClose
					onClick={() => {
						setActionLoaded(null);
						setShowThis(null);
						setInfo(null);
					}}
					customStyle={{
						backgroundColor: "darkred",
						color: "white",
						"backgroundColor:hover": "white",
					}}
				>
					Close
				</ButtonClose>
			)}
		</div>
	);
}

export default ManageUsersUI;
