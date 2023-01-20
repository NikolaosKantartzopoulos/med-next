import { getSession } from "next-auth/react";

function UsersRoute() {
	return <div></div>;
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: "/users/browse-exams",
				permanent: true,
			},
		};
	}

	return {
		props: { session },
	};
}

export default UsersRoute;
