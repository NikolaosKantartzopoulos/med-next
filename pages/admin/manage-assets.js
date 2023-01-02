import React from "react";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import Button from "../../components/UI/Button";
function ManageAssets() {
	async function handleClick() {
		const response = fetch("/api/files/file");
		const data = await response.blob();
		var link = document.createElement("a"); // once we have the file buffer BLOB from the post request we simply need to send a GET request to retrieve the file data
		link.href = window.URL.createObjectURL(fileBlob);
		link.download = objFileState.strFileName;
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
