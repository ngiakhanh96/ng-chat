import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:app-ng-chat',
              onlyDependOnLibsWithTags: [
                'scope:*-feature',
                'scope:shared-data-access',
                'scope:shared-ui',
              ],
            },
            {
              sourceTag: 'scope:shared-data-access',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'scope:shared-ui',
              onlyDependOnLibsWithTags: ['scope:shared-data-access'],
            },
            {
              sourceTag: 'scope:chat-data-access',
              onlyDependOnLibsWithTags: ['scope:shared-data-access'],
            },
            {
              sourceTag: 'scope:shell-feature',
              onlyDependOnLibsWithTags: [
                'scope:shared-data-access',
                'scope:shared-ui',
                'scope:*-feature',
              ],
            },
            {
              sourceTag: 'scope:chat-feature',
              onlyDependOnLibsWithTags: [
                'scope:chat-data-access',
                'scope:chat-ui',
                'scope:shared-data-access',
                'scope:shared-ui',
                'scope:*-feature',
              ],
            },
            {
              sourceTag: 'scope:chat-ui',
              onlyDependOnLibsWithTags: [
                'scope:chat-data-access',
                'scope:shared-data-access',
                'scope:shared-ui',
              ],
            },
            {
              sourceTag: 'scope:sidebar-feature',
              onlyDependOnLibsWithTags: [
                'scope:sidebar-data-access',
                'scope:sidebar-ui',
                'scope:shared-data-access',
                'scope:shared-ui',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
