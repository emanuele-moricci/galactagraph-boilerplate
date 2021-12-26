interface IResolverPathConfig {
  recursive: boolean;
  extensions: string[];
  ignoreIndex: boolean;
}

const configPath = (extensions: string[]): IResolverPathConfig => ({
  extensions,
  recursive: true,
  ignoreIndex: true,
});

export default configPath;
