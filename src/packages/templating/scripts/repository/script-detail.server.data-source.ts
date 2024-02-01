import type { UmbScriptDetailModel } from '../types.js';
import { UMB_SCRIPT_ENTITY_TYPE } from '../entity.js';
import {
	UmbServerFilePathUniqueSerializer,
	appendFileExtensionIfNeeded,
} from '@umbraco-cms/backoffice/server-file-system';
import type {
	CreateScriptRequestModel,
	UpdateScriptRequestModel} from '@umbraco-cms/backoffice/backend-api';
import {
	ScriptResource
} from '@umbraco-cms/backoffice/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbDetailDataSource } from '@umbraco-cms/backoffice/repository';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

export class UmbScriptDetailServerDataSource implements UmbDetailDataSource<UmbScriptDetailModel> {
	#host: UmbControllerHost;
	#serverFilePathUniqueSerializer = new UmbServerFilePathUniqueSerializer();

	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	async createScaffold(parentUnique: string | null) {
		const data: UmbScriptDetailModel = {
			entityType: UMB_SCRIPT_ENTITY_TYPE,
			parentUnique,
			unique: '',
			path: '',
			name: '',
			content: '',
		};

		return { data };
	}

	async create(model: UmbScriptDetailModel) {
		if (!model) throw new Error('Data is missing');
		if (!model.parentUnique === undefined) throw new Error('Parent Unique is missing');
		if (!model.name) throw new Error('Name is missing');

		const parentPath = this.#serverFilePathUniqueSerializer.toServerPath(model.parentUnique);

		// TODO: make data mapper to prevent errors
		const requestBody: CreateScriptRequestModel = {
			parent: parentPath ? { path: parentPath } : null,
			name: appendFileExtensionIfNeeded(model.name, '.js'),
			content: model.content,
		};

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			ScriptResource.postScript({
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
			ScriptResource.getScriptByPath({ path: encodeURIComponent(path) }),
		);

		if (error || !data) {
			return { error };
		}

		const script: UmbScriptDetailModel = {
			entityType: UMB_SCRIPT_ENTITY_TYPE,
			unique: this.#serverFilePathUniqueSerializer.toUnique(data.path),
			parentUnique: data.parent ? this.#serverFilePathUniqueSerializer.toUnique(data.parent.path) : null,
			path: data.path,
			name: data.name,
			content: data.content,
		};

		return { data: script };
	}

	async update(model: UmbScriptDetailModel) {
		if (!model.unique) throw new Error('Unique is missing');

		const path = this.#serverFilePathUniqueSerializer.toServerPath(model.unique);
		if (!path) throw new Error('Path is missing');

		const requestBody: UpdateScriptRequestModel = {
			content: model.content,
		};

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			ScriptResource.putScriptByPath({
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
			ScriptResource.deleteScriptByPath({
				path: encodeURIComponent(path),
			}),
		);
	}
}