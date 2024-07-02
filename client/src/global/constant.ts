export const ENDPOINT_SERVICE =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:9090'