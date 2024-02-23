export * from './get-processed-image-url.function.js';
export * from './math/math.js';
export * from './pagination-manager/pagination.manager.js';
export * from './path/ensure-path-ends-with-slash.function.js';
export * from './path/path-decode.function.js';
export * from './path/path-encode.function.js';
export * from './path/path-folder-name.function.js';
export * from './path/umbraco-path.function.js';
export * from './selection-manager/selection.manager.js';
export * from './string/generate-umbraco-alias.function.js';
export * from './string/increment-string.function.js';
export * from './string/split-string-to-array.js';
export * from './type/diff.type.js';

declare global {
	interface Window {
		Umbraco: any;
	}
}