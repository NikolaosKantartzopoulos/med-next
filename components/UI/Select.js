import React from "react";

function Select({ setFn, optionsArray, optionsArraySelect }) {
	console.log(optionsArray);
	return (
		//   <select onChange={(e) => setActiveGeneralPrep(e.target.value)}>
		//   {allActivePreparations.map((a) => (
		//     <option key={a.title} value={a.title}>
		//       {a.title}
		//     </option>
		//   ))}
		// </select>
		<select onChange={(e) => setFn(e.target.value)}>
			{optionsArray.map((a) => (
				<option key={a[optionsArraySelect]} value={optionsArraySelect}>
					{a[optionsArraySelect]}
				</option>
			))}
		</select>
	);
}

export default Select;
