//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

// Derive the host that serves uploaded images from the API base URL so
// next/image trusts it. Falls back to the local API when the env is unset.
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333/api';
const { protocol, hostname, port } = new URL(apiUrl);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  images: {
    remotePatterns: [
      {
        protocol: protocol.replace(':', ''),
        hostname,
        port,
        pathname: '/uploads/**',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
