import type { UmbPartialViewDetailModel } from '../types.js';
import { UMB_PARTIAL_VIEW_ENTITY_TYPE } from '../entity.js';
import {
	UmbServerFilePathUniqueSerializer,
	appendFileExtensionIfNeeded,
} from '@umbraco-cms/backoffice/server-file-system';
import type {
	CreatePartialViewRequestModel,
	UpdatePartialViewRequestModel} from '@umbraco-cms/backoffice/backend-api';
import {
	PartialViewResource
} from '@umbraco-cms/backoffice/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbDetailDataSource } from '@umbraco-cms/backoffice/repository';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

export class UmbPartialViewDetailServerDataSource implements UmbDetailDataSource<UmbPartialViewDetailModel> {
	#host: UmbControllerHost;
	#serverFilePathUniqueSerializer = new UmbServerFilePathUniqueSerializer();

	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	async createScaffold(parentUnique: string | null, preset?: Partial<UmbPartialViewDetailModel>) {
		const data: UmbPartialViewDetailModel = {
			entityType: UMB_PARTIAL_VIEW_ENTITY_TYPE,
			parentUnique,
			unique: '',
			path: '',
			name: '',
			content: '',
			...preset,
		};

		return { data };
	}

	async create(model: UmbPartialViewDetailModel) {
		if (!model) throw new Error('Data is missing');
		if (!model.parentUnique === undefined) throw new Error('Parent Unique is missing');
		if (!model.name) throw new Error('Name is missing');

		const parentPath = this.#serverFilePathUniqueSerializer.toServerPath(model.parentUnique);

		// TODO: make data mapper to prevent errors
		const requestBody: CreatePartialViewRequestModel = {
			parent: parentPath ? { path: parentPath } : null,
			name: appendFileExtensionIfNeeded(model.name, '.cshtml'),
			content: model.content,
		};

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			PartialViewResource.postPartialView({
				requestBody,
			}),
		);

		if (data) {
			const newPath = decodeURIComponent(data);
			const newPathUnique = this.#serverFilePathUniqueSerializer.toUnique(newPath);
			return this.read(newPathUnique);
		}

		return { error };
	}

	async read(unique: string) {
		if (!unique) throw new Error('Unique is missing');

		const path = this.#serverFilePathUniqueSerializer.toServerPath(unique);
		if (!path) throw new Error('Path is missing');

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			PartialViewResource.getPartialViewByPath({ path: encodeURIComponent(path) }),
		);

		if (error || !data) {
			return { error };
		}

		const partialView: UmbPartialViewDetailModel = {
			entityType: UMB_PARTIAL_VIEW_ENTITY_TYPE,
			unique: this.#serverFilePathUniqueSerializer.toUnique(data.path),
			parentUnique: data.parent ? this.#serverFilePathUniqueSerializer.toUnique(data.parent.path) : null,
			path: data.path,
			name: data.name,
			content: data.content,
		};

		return { data: partialView };
	}

	async update(model: UmbPartialViewDetailModel) {
		if (!model.unique) throw new Error('Unique is missing');

		const path = this.#serverFilePathUniqueSerializer.toServerPath(model.unique);
		if (!path) throw new Error('Path is missing');

		const requestBody: UpdatePartialViewRequestModel = {
			content: model.content,
		};

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			PartialViewResource.putPartialViewByPath({
				path: encodeURIComponent(path),
				requestBody,
			}),
		);

		if (data) {
			return this.read(data);
		}

		return { error };
	}

	async delete(unique: string) {
		if (!unique) throw new Error('Unique is missing');

		const path = this.#serverFilePathUniqueSerializer.toServerPath(unique);
		if (!path) throw new Error('Path is missing');

		return tryExecuteAndNotify(
			this.#host,
			PartialViewResource.deletePartialViewByPath({
				path: encodeURIComponent(path),
			}),
		);
	}
}
