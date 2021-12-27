interface IResolverPathConfig {
  recursive: boolean;
  extensions: string[];
  ignoreIndex: boolean;
}

/**
 * Helper function that returns a configuration for the `loadFilesSync` function
 * to get all the Model, Operation and Extension classes present in the whole Micro-Service.
 *
 * @param {string[]} extensions The list of the file extensions to be included in the resolver list.
 * @returns {IResolverPathConfig} The resolver path config.
 */
const configPath = (extensions: string[]): IResolverPathConfig => ({
  extensions,
  recursive: true,
  ignoreIndex: true,
});

export default configPath;
