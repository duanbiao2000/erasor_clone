/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // 定义一个数组，用于指定允许加载图片的域名
        domains: ['lh3.googleusercontent.com'],
    },
};

export default nextConfig;
