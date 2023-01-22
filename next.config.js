/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		// providing the locales supported by your application
		locales: ["el-GR", "en-US"],
		//  default locale used when the non-locale paths are visited
		defaultLocale: "el-GR",
		localeDetection: false,
		domains: [
			{
				domain: "med-next.vercel.app",
				defaultLocale: "el-GR",
			},
		],
	},
};

module.exports = nextConfig;
