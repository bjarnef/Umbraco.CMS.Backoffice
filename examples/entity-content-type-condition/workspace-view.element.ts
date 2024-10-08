import { html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

@customElement('umb-example-entity-content-type-condition')
export class UmbWorkspaceViewElement extends UmbLitElement {
	override render() {
		return html`<p>
			This is a conditional element that is only shown in workspaces based on it's entities content type.
		</p>`;
	}
}

export default UmbWorkspaceViewElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-example-entity-content-type-condition': UmbWorkspaceViewElement;
	}
}
