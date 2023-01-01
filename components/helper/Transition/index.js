import {
	TransitionGroup,
	Transition as ReactTransition,
} from "react-transition-group";
const TIMEOUT = 300;
const getTransitionStyles = {
	entering: {
		position: `absolute`,
		opacity: 0,
		transform: `scale(0.8)`,
	},
	entered: {
		transition: `all ${TIMEOUT}ms`,
		opacity: 1,
		transform: `scale(1)`,
	},
	exiting: {
		transition: `all ${TIMEOUT}ms`,
		opacity: 0,
		transform: `scale(0.8)`,
	},
};
const Transition = ({ children, location }) => {
	return (
		<TransitionGroup style={{ position: "relative" }}>
			<ReactTransition
				key={location}
				timeout={{
					enter: TIMEOUT,
					exit: TIMEOUT,
				}}
			>
				{(status) => (
					<div
						style={{
							...getTransitionStyles[status],
						}}
					>
						{children}
					</div>
				)}
			</ReactTransition>
		</TransitionGroup>
	);
};
export default Transition;
