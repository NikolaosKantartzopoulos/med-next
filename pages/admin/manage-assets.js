import { cloneWith } from "lodash";
import React from "react";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import Button from "../../components/UI/Button";
function ManageAssets() {
	async function handleClick() {
		const response = await fetch("/api/files/file");
		const blob = await response.blob();

		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
		link.setAttribute("download", `FileName.pdf`);
		link.click();
		link.remove();
	}

	return (
		<div>
			<AdminNavbar />
			<Button onClick={handleClick}>asdf</Button>
		</div>
	);
}

export default ManageAssets;
