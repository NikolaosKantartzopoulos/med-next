import { useReducer } from "react";

function assetsReducer(state, action) {
	switch (action.type) {
		case "ADD":

		case "REMOVE":
	}
}
export default function useAssetsReducer(staringAssets) {
	const [asset, dispatchAssetAction] = useReducer(assetsReducer, staringAssets);

	return [asset, dispatchAssetAction];
}
