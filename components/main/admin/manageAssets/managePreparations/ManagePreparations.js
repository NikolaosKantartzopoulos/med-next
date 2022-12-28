import React from "react";

import AdminNavbar from "../../AdminNavbar";
import PreparationEditor from "./PreparationEditor.js";
import CommonPreparationsList from "./CommonPreparationsList.js";

function ManagePreparations() {
	return (
		<div>
			<AdminNavbar />
			<PreparationEditor />
			<CommonPreparationsList />
		</div>
	);
}

export default ManagePreparations;
