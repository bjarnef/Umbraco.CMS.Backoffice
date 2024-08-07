import { UMB_USER_MANAGEMENT_SECTION_ALIAS } from '../../user-section/index.js';
import type { ManifestSectionView, ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

const sectionsViews: Array<ManifestSectionView> = [
	{
		type: 'sectionView',
		alias: 'Umb.SectionView.Users',
		name: 'Users Section View',
		js: () => import('./users-section-view.element.js'),
		weight: 200,
		meta: {
			label: '#general_users',
			pathname: 'users',
			icon: 'icon-user',
		},
		conditions: [
			{
				alias: 'Umb.Condition.SectionAlias',
				match: UMB_USER_MANAGEMENT_SECTION_ALIAS,
			},
		],
	},
];

export const manifests: Array<ManifestTypes> = [...sectionsViews];
