
import { v4 } from 'uuid';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

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
