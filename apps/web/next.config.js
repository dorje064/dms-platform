//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

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
  // Self-contained server output for a small, low-RAM Docker runtime image.
  output: 'standalone',
  // Trace deps from the monorepo root so standalone bundles workspace node_modules.
  outputFileTracingRoot: join(__dirname, '../../'),
  images: {
    remotePatterns: [
      {
        // Next's RemotePattern types protocol as the literal 'http' | 'https'.
        protocol: /** @type {'http' | 'https'} */ (protocol.replace(':', '')),
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
