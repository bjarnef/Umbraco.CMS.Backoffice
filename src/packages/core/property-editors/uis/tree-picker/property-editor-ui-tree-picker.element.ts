import { html } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';
import { UmbPropertyEditorExtensionElement } from '@umbraco-cms/backoffice/extension-registry';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UmbDataTypePropertyCollection } from '@umbraco-cms/backoffice/data-type';

/**
 * @element umb-property-editor-ui-tree-picker
 */
@customElement('umb-property-editor-ui-tree-picker')
export class UmbPropertyEditorUITreePickerElement extends UmbLitElement implements UmbPropertyEditorExtensionElement {
	@property()
	value = '';

	@property({ type: Array, attribute: false })
	public config = new UmbDataTypePropertyCollection();

	render() {
		return html`<div>umb-property-editor-ui-tree-picker</div>`;
	}

	static styles = [UUITextStyles];
}

export default UmbPropertyEditorUITreePickerElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-tree-picker': UmbPropertyEditorUITreePickerElement;
	}
}