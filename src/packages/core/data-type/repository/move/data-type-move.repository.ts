import { UMB_DATA_TYPE_TREE_STORE_CONTEXT, UmbDataTypeTreeStore } from '../../tree/data-type.tree.store.js';
import { UmbDataTypeMoveServerDataSource } from './data-type-move.server.data-source.js';
import { UMB_NOTIFICATION_CONTEXT_TOKEN, UmbNotificationContext } from '@umbraco-cms/backoffice/notification';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbMoveDataSource, UmbMoveRepository, UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';

export class UmbMoveDataTypeRepository extends UmbRepositoryBase implements UmbMoveRepository {
	#init: Promise<unknown>;
	#moveSource: UmbMoveDataSource;
	#treeStore?: UmbDataTypeTreeStore;
	#notificationContext?: UmbNotificationContext;

	constructor(host: UmbControllerHost) {
		super(host);
		this.#moveSource = new UmbDataTypeMoveServerDataSource(this);

		this.#init = Promise.all([
			this.consumeContext(UMB_DATA_TYPE_TREE_STORE_CONTEXT, (instance) => {
				this.#treeStore = instance;
			}).asPromise(),

			this.consumeContext(UMB_NOTIFICATION_CONTEXT_TOKEN, (instance) => {
				this.#notificationContext = instance;
			}).asPromise(),
		]);
	}

	async move(unique: string, targetUnique: string | null) {
		await this.#init;
		const { error } = await this.#moveSource.move(unique, targetUnique);

		if (!error) {
			// TODO: Be aware about this responsibility.
			this.#treeStore!.updateItem(unique, { parentUnique: targetUnique });

			const notification = { data: { message: `Data type moved` } };
			this.#notificationContext!.peek('positive', notification);
		}

		return { error };
	}
}
