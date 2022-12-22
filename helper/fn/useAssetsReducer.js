import { useReducer } from "react";

function assetsReducer(state, action) {
	switch (action.type) {
		case "ADD":
			console.log("add");
		case "REMOVE":
			console.log("remove");
	}
}
export default function useAssetsReducer(staringAssets) {
	const [asset, dispatchAssetAction] = useReducer(assetsReducer, staringAssets);

	return [asset, dispatchAssetAction];
}
