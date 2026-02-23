/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['@mdx-js/react', '@next/mdx'],
  redirects: () => {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/interest',
        destination:
          'https://docs.google.com/forms/d/e/1FAIpQLSdpUESCiXh5c-L7aDgN05G7kL9za8kwqom_LdGLUiG1jBqA2A/viewform',
        permanent: true,
      },
    ];
  },
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
