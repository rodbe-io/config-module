import * as fs from 'fs';
import * as yaml_config from 'node-yaml-config';
import * as path from 'path';

interface IConfig {
  env?: string;
  filePath?: string;
}

const SingletonConfig = () => {
  let instance;
  const Singleton = (config: IConfig) => {
    const configFile = getFilePath(config);
    if (!fs.existsSync(configFile)) {
      throw new Error(`File ${configFile} doesn't exist.`);
    }
    const configuration = yaml_config.load(configFile);
    instance = configuration;

    return instance;
  };

  return {
    get: () => instance,
    init: (config: IConfig) => (instance ? instance : Singleton(config)),
  };
};

const getFilePath = ({ env, filePath }: IConfig) => {
  const environment = env || 'local';
  const pathFile = filePath || `config/config.${environment}.yml`;

  return path.resolve(process.cwd(), pathFile);
};

export default SingletonConfig();
