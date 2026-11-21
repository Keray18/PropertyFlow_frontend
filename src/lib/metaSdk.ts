// Declaring FB globally to avoid TS errors
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FB: any;
    fbAsyncInit: () => void;
  }
}

let sdkInitPromise: Promise<void> | null = null;

export const loadFacebookSDK = (): Promise<void> => {
  if (sdkInitPromise) {
    return sdkInitPromise;
  }

  sdkInitPromise = new Promise((resolve, reject) => {
    const appId = process.env.NEXT_PUBLIC_META_APP_ID;
    if (!appId) {
      return reject(new Error('NEXT_PUBLIC_META_APP_ID is not configured in the environment.'));
    }

    if (window.FB && window.FB.init) {
      return resolve();
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: false,
        version: 'v22.0',
      });
      resolve();
    };

    if (document.getElementById('facebook-jssdk')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load Facebook SDK'));

    const fjs = document.getElementsByTagName('script')[0];
    if (fjs && fjs.parentNode) {
      fjs.parentNode.insertBefore(script, fjs);
    } else {
      document.head.appendChild(script);
    }
  });

  return sdkInitPromise;
};

export const launchEmbeddedSignup = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const configId = process.env.NEXT_PUBLIC_META_CONFIG_ID;
    if (!configId) {
      return reject(new Error('NEXT_PUBLIC_META_CONFIG_ID is not configured in the environment.'));
    }

    if (!window.FB) {
      return reject(new Error('Facebook SDK is not loaded. Cannot launch Embedded Signup.'));
    }

    window.FB.login(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response: any) => {
        if (response.authResponse && response.authResponse.code) {
          resolve(response.authResponse.code);
        } else {
          reject(new Error('Meta authorization was cancelled or failed.'));
        }
      },
      {
        config_id: configId,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          feature: 'whatsapp_embedded_signup',
        },
      }
    );
  });
};
