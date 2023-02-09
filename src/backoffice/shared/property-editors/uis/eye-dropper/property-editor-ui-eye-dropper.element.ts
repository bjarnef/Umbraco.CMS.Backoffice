import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { UUIColorPickerChangeEvent } from '@umbraco-ui/uui';
import { UmbLitElement } from '@umbraco-cms/element';
import '../../../components/eye-dropper/eye-dropper.element';
import type { DataTypePropertyData } from '@umbraco-cms/models';

/**
 * @element umb-property-editor-ui-eye-dropper
 */
@customElement('umb-property-editor-ui-eye-dropper')
export class UmbPropertyEditorUIEyeDropperElement extends UmbLitElement {
	static styles = [UUITextStyles];

	@property()
	value = '';

	@state()
	private _opacity = false;

	@state()
	private _swatches: string[] = [];

	@property({ type: Array, attribute: false })
	public set config(config: Array<DataTypePropertyData>) {
		const showAlpha = config.find((x) => x.alias === 'showAlpha');
		if (showAlpha) this._opacity = showAlpha.value;

		const colorSwatches = config.find((x) => x.alias === 'palette');
		if (colorSwatches) this._swatches = colorSwatches.value;
	}

	private _onChange(event: UUIColorPickerChangeEvent) {
		this.value = event.target.value;
		this.dispatchEvent(new CustomEvent('property-value-change'));
	}

	render() {
		return html`<umb-eye-dropper
			@change="${this._onChange}"
			.swatches=${this._swatches}
			.opacity="${this._opacity}"></umb-eye-dropper>`;
	}
}

export default UmbPropertyEditorUIEyeDropperElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-eye-dropper': UmbPropertyEditorUIEyeDropperElement;
	}
}
