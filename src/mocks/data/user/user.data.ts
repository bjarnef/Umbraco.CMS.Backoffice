import { UserResponseModel, UserStateModel } from '@umbraco-cms/backoffice/backend-api';

export const data: Array<UserResponseModel & { type: string }> = [
	{
		id: 'bca6c733-a63d-4353-a271-9a8b6bcca8bd',
		type: 'user',
		contentStartNodeIds: [],
		mediaStartNodeIds: [],
		name: 'Umbraco User',
		email: 'noreply@umbraco.com',
		languageIsoCode: 'en-US',
		state: UserStateModel.ACTIVE,
		lastLoginDate: '9/10/2022',
		lastLockoutDate: '11/23/2021',
		lastPasswordChangeDate: '1/10/2022',
		updateDate: '2/10/2022',
		createDate: '3/13/2022',
		failedLoginAttempts: 946,
		userGroupIds: ['user-group-administrators-id', 'user-group-editors-id'],
	},
	{
		id: '82e11d3d-b91d-43c9-9071-34d28e62e81d',
		type: 'user',
		contentStartNodeIds: ['simple-document-id'],
		mediaStartNodeIds: ['f2f81a40-c989-4b6b-84e2-057cecd3adc1'],
		name: 'Amelie Walker',
		email: 'awalker1@domain.com',
		languageIsoCode: 'Japanese',
		state: UserStateModel.INACTIVE,
		lastLoginDate: '2023-10-12T18:30:32.879Z',
		lastLockoutDate: null,
		lastPasswordChangeDate: '2023-10-12T18:30:32.879Z',
		updateDate: '2023-10-12T18:30:32.879Z',
		createDate: '2023-10-12T18:30:32.879Z',
		failedLoginAttempts: 0,
		userGroupIds: ['user-group-administrators-id'],
	},
	{
		id: 'aa1d83a9-bc7f-47d2-b288-58d8a31f5017',
		type: 'user',
		contentStartNodeIds: [],
		mediaStartNodeIds: [],
		name: 'Oliver Kim',
		email: 'okim1@domain.com',
		languageIsoCode: 'Russian',
		state: UserStateModel.ACTIVE,
		lastLoginDate: '2023-10-12T18:30:32.879Z',
		lastLockoutDate: null,
		lastPasswordChangeDate: '2023-10-12T18:30:32.879Z',
		updateDate: '2023-10-12T18:30:32.879Z',
		createDate: '2023-10-12T18:30:32.879Z',
		failedLoginAttempts: 0,
		userGroupIds: ['user-group-administrators-id'],
	},
	{
		id: 'ff2f4a50-d3d4-4bc4-869d-c7948c160e54',
		type: 'user',
		contentStartNodeIds: [],
		mediaStartNodeIds: [],
		name: 'Eliana Nieves',
		email: 'enieves1@domain.com',
		languageIsoCode: 'Spanish',
		state: UserStateModel.INVITED,
		lastLoginDate: '2023-10-12T18:30:32.879Z',
		lastLockoutDate: null,
		lastPasswordChangeDate: null,
		updateDate: '2023-10-12T18:30:32.879Z',
		createDate: '2023-10-12T18:30:32.879Z',
		failedLoginAttempts: 0,
		userGroupIds: ['user-group-administrators-id'],
	},
	{
		id: 'c290c6d9-9f12-4838-8567-621b52a178de',
		type: 'user',
		contentStartNodeIds: [],
		mediaStartNodeIds: [],
		name: 'Jasmine Patel',
		email: 'jpatel1@domain.com',
		languageIsoCode: 'Hindi',
		state: UserStateModel.LOCKED_OUT,
		lastLoginDate: '2023-10-12T18:30:32.879Z',
		lastLockoutDate: '2023-10-12T18:30:32.879Z',
		lastPasswordChangeDate: null,
		updateDate: '2023-10-12T18:30:32.879Z',
		createDate: '2023-10-12T18:30:32.879Z',
		failedLoginAttempts: 25,
		userGroupIds: ['user-group-administrators-id'],
	},
];