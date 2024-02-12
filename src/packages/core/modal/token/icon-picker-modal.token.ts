import { UmbModalToken } from './modal-token.js';

export type UmbIconPickerModalData = never;

export interface UmbIconPickerModalValue {
	color: string | undefined;
	icon: string | undefined;
}

export const UMB_ICON_PICKER_MODAL = new UmbModalToken<UmbIconPickerModalData, UmbIconPickerModalValue>(
	'Umb.Modal.IconPicker',
	{
		modal: {
			type: 'sidebar',
			size: 'medium',
		},
	},
);
