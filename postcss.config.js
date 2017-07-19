module.exports = {
	plugins: [
		require('postcss-will-change'),
		require('postcss-simple-vars'),
		require('postcss-calc')({warnWhenCannotResolve: true}),
		require('autoprefixer')({
			browsers: ['> 0.01%']
		}),
		require('postcss-nested'),
		require('postcss-flexbugs-fixes'),
	]
}