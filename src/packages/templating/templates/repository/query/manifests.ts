import { UmbTemplateQueryRepository } from './template-query.repository.js';
import type { ManifestRepository } from '@umbraco-cms/backoffice/extension-registry';

export const UMB_TEMPLATE_QUERY_REPOSITORY_ALIAS = 'Umb.Repository.TemplateQuery';

const queryRepository: ManifestRepository = {
	type: 'repository',
	alias: UMB_TEMPLATE_QUERY_REPOSITORY_ALIAS,
	name: 'Template Query Repository',
	api: UmbTemplateQueryRepository,
};

export const manifests = [queryRepository];
