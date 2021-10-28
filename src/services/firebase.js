
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { v4 } from 'uuid';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBPZqCe950gqEScRw7VklwzuzOSVf81Qac',
	authDomain: 'whosapp-2c58f.firebaseapp.com',
	projectId: 'whosapp-2c58f',
	storageBucket: 'whosapp-2c58f.appspot.com',
	messagingSenderId: '242627069039',
	appId: '1:242627069039:web:e8998e8bc3cac16993f99a',
	measurementId: 'G-E73KHM0MXG'
};

const firebaseApp = initializeApp(firebaseConfig);

export async function signupFirebase(email, password) {
	try {
		const auth = getAuth();
		await createUserWithEmailAndPassword(auth, email, password);
		const database = getDatabase();
		const usersRef = ref( database, "users/" + v4() );
		set( usersRef, { email } );
		return {
			ok: true
		};
	}
    catch (error) {
		console.log(error.code);
		console.log(error.message);
		return {
			ok: false,
			message: error.code.split('/')[1].split('-').join(' ')
		};
	}
}

export async function loginFirebase(email, password) {
	try {
		const auth = getAuth();
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return {
			ok: true,
			user: userCredential.user.email
		};
	}
	catch (error) {
		console.log(error.message);
		return {
			ok: false,
			message: error.code.split('/')[1].split('-').join(' ')
		};
	}
}

export async function signoutFirebase() {
	try {
		const auth = getAuth();
		await signOut(auth);
		return {
			ok: true
		};
	} catch (error) {
		console.log(error.message);
		return {
			ok: false,
			message: error.code.split('/')[1].split('-').join(' ')
		};
	}
}

export default firebaseApp;