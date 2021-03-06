import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-unsafe-regex';
import visualizeRuleTester from './utils/visualize-rule-tester';

const ruleTester = avaRuleTester(test, {
	env: {
		es6: true
	},
	parserOptions: {
		sourceType: 'module'
	}
});

const error = {
	messageId: 'no-unsafe-regex'
};

ruleTester.run('no-unsafe-regex', rule, {
	valid: [
		'const foo = /\bunicorn\b/',
		'const foo = /\bunicorn\b/g',
		'const foo = new RegExp(\'^\bunicorn\b\')',
		'const foo = new RegExp(\'^\bunicorn\b\', \'i\')',
		'const foo = new RegExp(/\bunicorn\b/)',
		'const foo = new RegExp(/\bunicorn\b/g)',
		'const foo = new RegExp()'
	],
	invalid: [
		{
			code: 'const foo = /(x+x+)+y/',
			errors: [error]
		},
		{
			code: 'const foo = /(x+x+)+y/g',
			errors: [error]
		},
		{
			code: 'const foo = new RegExp(\'(x+x+)+y\')',
			errors: [error]
		},
		{
			code: 'const foo = new RegExp(\'(x+x+)+y\', \'g\')',
			errors: [error]
		},
		{
			code: 'const foo = new RegExp(/(x+x+)+y/)',
			errors: [error]
		},
		{
			code: 'const foo = new RegExp(/(x+x+)+y/g)',
			errors: [error]
		}
	]
});

const visualizeTester = visualizeRuleTester(test, {
	parserOptions: {
		ecmaVersion: 2021
	}
});

visualizeTester.run('no-unsafe-regex', rule, [
	'const foo = /(x+x+)+y/g'
]);
