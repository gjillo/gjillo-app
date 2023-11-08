/** @type {import('next').NextConfig} */
const nextConfig = {}

// For development purposes
if(process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

for (const key in process.env) {
  const value = process.env[key];

  if (value === '[redacted]') {
    console.warn(`Seems you forgot to set a value for env var: ${key}`);
  }
}
``
nextConfig.webpack = (config, options) => {
  config.module.rules.push({
    test: /\.(graphql|gql)/,
    exclude: /node_modules/,
    loader: "graphql-tag/loader"
  });

  return config;
}

module.exports = nextConfig
