export default {
  build: {
    outDir: '../_build',
    manifest: true,
    cssCodeSplit: false,
  },
  server: {
    proxy: {
      '/entries': {
        target: 'https://futuredreamsmakeathon.org.uk',
        changeOrigin: true,
      },
      cors: false,
    },
  },
};
