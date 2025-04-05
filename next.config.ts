import withPWA from 'next-pwa'

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true
})({
  // your existing next config
})

export default config
