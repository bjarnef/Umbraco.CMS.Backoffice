import type { UmbCreateFolderModel, UmbFolderDataSource, UmbUpdateFolderModel } from '@umbraco-cms/backoffice/tree';
import { DocumentTypeService } from '@umbraco-cms/backoffice/external/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

/**
 * A data source for a Document Type folder that fetches data from the server
 * @class UmbDocumentTypeFolderServerDataSource
 * @implements {RepositoryDetailDataSource}
 */
export class UmbDocumentTypeFolderServerDataSource implements UmbFolderDataSource {
	#host: UmbControllerHost;

	/**
	 * Creates an instance of UmbDocumentTypeFolderServerDataSource.
	 * @param {UmbControllerHost} host - The controller host for this controller to be appended to
	 * @memberof UmbDocumentTypeFolderServerDataSource
	 */
	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	/**
	 * Fetches a Document Type folder from the server
	 * @param {string} unique
	 * @returns {*}
	 * @memberof UmbDocumentTypeFolderServerDataSource
	 */
	async read(unique: string) {
		if (!unique) throw new Error('Unique is missing');

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			DocumentTypeService.getDocumentTypeFolderById({
				id: unique,
			}),
		);

		if (data) {
			const mappedData = {
				unique: data.id,
				name: data.name,
			};

			return { data: mappedData };
		}

		return { error };
	}

	/**
	 * Creates a Document Type folder on the server
	 * @param {UmbCreateFolderModel} args
	 * @returns {*}
	 * @memberof UmbDocumentTypeFolderServerDataSource
	 */
	async create(args: UmbCreateFolderModel) {
		if (args.parentUnique === undefined) throw new Error('Parent unique is missing');
		if (!args.name) throw new Error('Name is missing');

		const requestBody = {
			id: args.unique,
			parent: args.parentUnique ? { id: args.parentUnique } : null,
			name: args.name,
		};

		const { error } = await tryExecuteAndNotify(
			this.#host,
			DocumentTypeService.postDocumentTypeFolder({
				requestBody,
			}),
		);

		if (!error) {
			return this.read(args.unique);
		}

		return { error };
	}

	/**
	 * Updates a Document Type folder on the server
	 * @param {UmbUpdateFolderModel} args
	 * @returns {*}
	 * @memberof UmbDocumentTypeFolderServerDataSource
	 */
	async update(args: UmbUpdateFolderModel) {
		if (!args.unique) throw new Error('Unique is missing');
		if (!args.name) throw new Error('Folder name is missing');

		const { error } = await tryExecuteAndNotify(
			this.#host,
			DocumentTypeService.putDocumentTypeFolderById({
				id: args.unique,
				requestBody: { name: args.name },
			}),
		);

		if (!error) {
			return this.read(args.unique);
		}

		return { error };
	}

	/**
	 * Deletes a Document Type folder on the server
	 * @param {string} unique
	 * @returns {*}
	 * @memberof UmbDocumentTypeServerDataSource
	 */
	async delete(unique: string) {
		if (!unique) throw new Error('Unique is missing');
		return tryExecuteAndNotify(
			this.#host,
			DocumentTypeService.deleteDocumentTypeFolderById({
				id: unique,
			}),
		);
	}
}
