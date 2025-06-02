const baseUrl = process.env.LARAVEL_NOTIFICATION_BASE_API_URL || 'http://localhost:9000/api';

const serviceConfig = {
  larvelNotificationUrl: baseUrl,
  iscHashApiKey: process.env.LARAVEL_NOTIFICATION_ISC_HASH_API_KEY || '2b82c6d6cb83a4be48f6d55f3520e527',
  introspectApiUrl: `${baseUrl}/v1/auth/introspect`,
};


export default serviceConfig;