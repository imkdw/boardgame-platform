import type { WebpackConfiguration } from '@electron-forge/plugin-webpack/dist/Config';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const mainConfig: WebpackConfiguration = {
  entry: './src/index.ts',
  module: {
    rules,
  },
  plugins: plugins as unknown as { apply: (compiler: unknown) => void }[],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
