module.exports = {
	root: true,
	env: {
		node: true,
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'plugin:react/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'indent': ['error', 'tab'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-types': 'off',
		'no-console': 'warn',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 0}],
		'comma-dangle': ['error', 'always-multiline'],
		'jsx-quotes': ['error', 'prefer-double'],
		'react/no-unknown-property': [2, { 'ignore': ['class', 'for', 'onKeydown'] }],
		'react/react-in-jsx-scope': 'off',
		'react/no-string-refs': ['off', {'noTemplateLiterals': true}],
		'@typescript-eslint/no-empty-function': 'off',
	},
}
