import admin from 'firebase-admin';

if (!admin.apps || !admin.apps.length) {
  // Initialize with a service account JSON string in env var FIREBASE_SERVICE_ACCOUNT
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    let svc = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (typeof svc === 'string') {
      try {
        svc = JSON.parse(svc);
      } catch (e) {
        console.warn('Failed to JSON.parse FIREBASE_SERVICE_ACCOUNT');
        svc = null;
      }
    }

    if (svc && svc.private_key && typeof svc.private_key === 'string') {
      // replace escaped newlines with real newlines
      svc.private_key = svc.private_key.replace(/\\n/g, '\n');
    }

    if (svc) {
      admin.initializeApp({
        credential: admin.credential.cert(svc),
      });
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // If the environment points to a service account file, default init will pick it up
    admin.initializeApp();
  } else {
    // Not initialized; server-side Firebase features will fail until configured
    console.warn('Firebase Admin not initialized. Set FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS.');
  }
}

export default admin;
