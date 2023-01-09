import React, { useContext } from "react";
import UsersContext from "../../../../../helper/store/users-context";
import Image from "next/image";

import Button from "../../../../UI/Button";
import ButtonClose from "../../../../UI/ButtonClose";

import addIcon from "../../../../../public/images/plus.svg";
import saveIcon from "../../../../../public/images/save.svg";

import styles from "./ManageUsersUI.module.css";
import LanguageContext from "../../../../../helper/store/language-context";

function ManageUsersUI() {
	const {
		actionLoaded,
		setActionLoaded,
		setInfo,
		setShowThis,
		addNewUserSetupHandler,
		submitNewUserHandler,
		submitEditedUser,
	} = useContext(UsersContext);
	const { lng } = useContext(LanguageContext);
	return (
		<div className={styles.ManageUsersUI}>
			{actionLoaded === null && (
				<>
					<Button
						onClick={addNewUserSetupHandler}
						customStyle={{ width: "8rem" }}
					>
						<Image src={addIcon} alt="add new user" />
						{lng("Add")}
					</Button>
				</>
			)}
			{actionLoaded === "addUser" && (
				<Button onClick={submitNewUserHandler} customStyle={{ width: "6rem" }}>
					<Image src={saveIcon} alt="save new user" />
					{lng("Add")}
				</Button>
			)}

			{actionLoaded == "editUser" && (
				<Button onClick={submitEditedUser} customStyle={{ width: "8rem" }}>
					<Image src={addIcon} alt="submit edited user" />
					{lng("Update")}
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
				/>
			)}
		</div>
	);
}

export default ManageUsersUI;
