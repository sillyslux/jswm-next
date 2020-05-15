import { REGISTER_PLUGIN, DISABLE_PLUGIN } from '../constants';

export const registerPlugin = (...payload) => ({
	type: REGISTER_PLUGIN,
	payload: Object.assign(...payload),
});

export const disablePlugin = (plugin) => ({
	type: DISABLE_PLUGIN,
	plugin,
});
