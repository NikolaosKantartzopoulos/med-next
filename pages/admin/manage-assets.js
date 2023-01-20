import React from "react";
import Button from "../../components/UI/Button";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import AdminLayout from "../../components/helper/adminLayout";

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

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (status === "unauthenticated") {
		router.replace("/users/browse-exams");
	}

	return (
		<AdminLayout>
			<Button onClick={handleClick}>asdf</Button>
		</AdminLayout>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	return {
		redirect: {
			destination: "/admin/exams-table",
			permanent: false,
		},
	};
}

export default ManageAssets;
