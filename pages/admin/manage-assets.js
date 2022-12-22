import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function ManageAssets() {
	const router = useRouter();
	return (
		<div>
			<Link href={"/admin/manage-buildings"}>Buildings</Link>
			<Link href={"/admin/manage-departments"}>Departments</Link>
			<Link href={"/admin/manage-doctors"}>Doctors</Link>
			<Link href={"/admin/manage-users"}>Users</Link>
		</div>
	);
}

export default ManageAssets;
