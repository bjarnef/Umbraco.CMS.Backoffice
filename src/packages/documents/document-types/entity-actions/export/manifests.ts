import { UMB_DOCUMENT_TYPE_ENTITY_TYPE } from '../../entity.js';
import { manifests as repositoryManifests } from './repository/manifests.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

const entityActions: Array<ManifestTypes> = [
	{
		type: 'entityAction',
		kind: 'default',
		alias: 'Umb.EntityAction.DocumentType.Export',
		name: 'Export Document Type Entity Action',
		forEntityTypes: [UMB_DOCUMENT_TYPE_ENTITY_TYPE],
		api: () => import('./document-type-export.action.js'),
		meta: {
			icon: 'icon-download-alt',
			label: '#actions_export',
		},
	},
];

export const manifests: Array<ManifestTypes> = [...entityActions, ...repositoryManifests];
