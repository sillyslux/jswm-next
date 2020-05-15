import { REGISTER_PLUGIN } from '../constants';

const plugins = {
	installed: [],
	running: [],
};

export default (
	{ installed: i, running: r } = plugins,
	// { type, payload: [plugin, defaultOptions] = [] },
	{ type, payload: plugin },
) => {
	if (type === REGISTER_PLUGIN) {
		const updated = i.findIndex((p) => p.xoId === plugin.xoId);
		if (~updated) {
			return {
				installed: [...i.slice(0, updated), plugin, ...i.slice(updated+1)],
				running: [...r.slice(0, updated), plugin, ...r.slice(updated+1)] };
		}

		const installed = [...i, plugin];
		const running = plugin.autostart ? [...r, plugin] : [...r];
		return { installed, running };
	}
	// if (action.type === IS_EDITABLE) {
	// const editEnabled = action.bool ? state.editEnabled : false;
	// return { ...state, editEnabled, isEditable: action.bool };
	// }
	return { installed: i, running: r };
};
