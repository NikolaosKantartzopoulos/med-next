function RadioButton({ id, label, name, disabled }) {
	return (
		<div>
			<label htmlFor={id} disabled={disabled}>
				<input type="radio" id={id} disabled={disabled} name={name} />
				{label}
			</label>
		</div>
	);
}
export default RadioButton;
