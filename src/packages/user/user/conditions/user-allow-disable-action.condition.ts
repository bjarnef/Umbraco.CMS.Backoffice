import { UmbUserDetail } from '../types.js';
import { UmbUserWorkspaceContext } from '../workspace/user-workspace.context.js';
import { UserStateModel } from '@umbraco-cms/backoffice/backend-api';
import { UmbBaseController } from '@umbraco-cms/backoffice/controller-api';
import {
	ManifestCondition,
	UmbConditionConfigBase,
	UmbConditionControllerArguments,
	UmbExtensionCondition,
} from '@umbraco-cms/backoffice/extension-api';
import { UMB_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import { isCurrentUser } from '@umbraco-cms/backoffice/current-user';

export class UmbUserAllowDisableActionCondition extends UmbBaseController implements UmbExtensionCondition {
	config: UmbConditionConfigBase;
	permitted = false;
	#onChange: () => void;

	constructor(args: UmbConditionControllerArguments<UmbConditionConfigBase>) {
		super(args.host);
		this.config = args.config;
		this.#onChange = args.onChange;

		this.consumeContext(UMB_WORKSPACE_CONTEXT, (context) => {
			const userContext = context as UmbUserWorkspaceContext;
			this.observe(userContext.data, (data) => this.onUserDataChange(data));
		});
	}

	async onUserDataChange(user: UmbUserDetail | undefined) {
		// don't allow the current user to disable themselves
		if (!user || !user.id || (await isCurrentUser(this._host, user.id))) {
			this.permitted = false;
			this.#onChange();
			return;
		}

		this.permitted = user?.state !== UserStateModel.DISABLED;
		this.#onChange();
	}
}

export const manifest: ManifestCondition = {
	type: 'condition',
	name: 'User Allow Disable Action Condition',
	alias: 'Umb.Condition.User.AllowDisableAction',
	api: UmbUserAllowDisableActionCondition,
};
