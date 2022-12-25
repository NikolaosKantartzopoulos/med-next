import React, { useState } from "react";

import ListExistingDepartments from "./ListExistingDepartments";

function ManageDepartments({ allDepartments }) {
	const [newDepartmentName, setNewDepartmentName] = useState("");
	const [arrayOfNewDepartmentsSubs, setarrayOfNewDepartmentsSubs] = useState(
		[]
	);

	return (
		<div>
			<ListExistingDepartments allDepartments={allDepartments} />
		</div>
	);
}

export default ManageDepartments;
