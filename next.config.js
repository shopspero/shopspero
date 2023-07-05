/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
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
