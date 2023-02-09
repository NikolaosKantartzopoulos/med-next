import styles from "./Home.module.css";

export default function Index(props) {
	return <div className={styles.Home}></div>;
}

export const getServerSideProps = async () => {
	return {
		redirect: {
			destination: "/users/browse-exams",
			permanent: true,
		},
		props: {
			data: null,
		},
	};
};
