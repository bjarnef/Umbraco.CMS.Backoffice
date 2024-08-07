import type { UmbBlockListLayoutModel, UmbBlockListTypeModel } from '../types.js';
import type { UmbBlockListWorkspaceData } from '../index.js';
import type { UmbBlockDataType } from '../../block/types.js';
import { UmbBooleanState } from '@umbraco-cms/backoffice/observable-api';
import { UmbBlockManagerContext } from '@umbraco-cms/backoffice/block';

/**
 * A implementation of the Block Manager specifically for the Block List Editor.
 */
export class UmbBlockListManagerContext<
	BlockLayoutType extends UmbBlockListLayoutModel = UmbBlockListLayoutModel,
> extends UmbBlockManagerContext<UmbBlockListTypeModel, BlockLayoutType> {
	//
	#inlineEditingMode = new UmbBooleanState(undefined);
	readonly inlineEditingMode = this.#inlineEditingMode.asObservable();

	setInlineEditingMode(inlineEditingMode: boolean | undefined) {
		this.#inlineEditingMode.setValue(inlineEditingMode ?? false);
	}

	create(
		contentElementTypeKey: string,
		partialLayoutEntry?: Omit<BlockLayoutType, 'contentUdi'>,
		// TODO: [v15] ignoring unused modalData parameter to avoid breaking changes
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		modalData?: UmbBlockListWorkspaceData,
	) {
		return super.createBlockData(contentElementTypeKey, partialLayoutEntry);
	}

	insert(
		layoutEntry: BlockLayoutType,
		content: UmbBlockDataType,
		settings: UmbBlockDataType | undefined,
		modalData: UmbBlockListWorkspaceData,
	) {
		this._layouts.appendOneAt(layoutEntry, modalData.originData.index ?? -1);

		this.insertBlockData(layoutEntry, content, settings, modalData);

		return true;
	}
}
