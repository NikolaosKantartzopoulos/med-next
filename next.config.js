/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		// providing the locales supported by your application
		locales: ["en-US", "el-GR"],
		//  default locale used when the non-locale paths are visited
		defaultLocale: "en-US",
	},
};

module.exports = nextConfig;
