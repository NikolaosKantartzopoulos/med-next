import React from "react";
import AdminNavbar from "../../components/main/admin/AdminNavbar";
import Button from "../../components/UI/Button";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

function ManageAssets() {
	const { data: session, status } = useSession();
	const router = useRouter();

	async function handleClick() {
		const response = await fetch("/api/files/file");
		const blob = await response.blob();

		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
		link.setAttribute("download", `FileName.pdf`);
		link.click();
		link.remove();
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<div>
			<AdminNavbar />
			<Button onClick={handleClick}>asdf</Button>
		</div>
	);
}

export default ManageAssets;
