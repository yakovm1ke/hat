module.exports = {
	root: true,
	env: {
		node: true,
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
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
	},
}
