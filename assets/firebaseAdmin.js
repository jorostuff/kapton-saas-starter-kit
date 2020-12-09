const admin = require('firebase-admin');
const secrets = require('../firebase-key.json');

// Initializing the admin if not already initialized
function initFirebaseAdmin() {
	if(!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(secrets),
			databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		});
	}
}

export const verifyIdToken = (token) => {
	initFirebaseAdmin();
	// Returning the token if it's valid
	return admin.auth().verifyIdToken(token).catch((error) => {
		console.log(error);
	});
}

export const getUserData = (token, uid) => {
	initFirebaseAdmin();
	// Making sure the token is valid
	return admin.auth().verifyIdToken(token).then(async () => {
		// Then getting and checking if the user document entry exists
		const docData = await admin.firestore().collection('users').doc(uid).get();
		if(docData.exists) {
			// Returning user data
			return docData.data();
		} else {
			return null;
		}
	}).catch((error) => {
		console.log(error);
	});
}