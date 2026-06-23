const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "burger-40dda",
  private_key_id: "92c780699a160b9e6e7740eff149436d84cb523e",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: "firebase-adminsdk-fbsvc@burger-40dda.iam.gserviceaccount.com",
  client_id: "111056804147938097950",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40burger-40dda.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
