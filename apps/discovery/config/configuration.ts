export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  // Not used. Replace main.ts to get config from this file.
  port: parseInt(process.env.PORT, 10) || 3333
});
