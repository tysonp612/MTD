// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithEmailLink,
	signInWithEmailAndPassword,
	signOut,
	sendSignInLinkToEmail,
	signInWithPopup,
	sendPasswordResetEmail,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCnrVv8T6DC2icC4kTgrQOQMXEpIBAEkdg",
	authDomain: "mytechdevices-6160b.firebaseapp.com",
	projectId: "mytechdevices-6160b",
	storageBucket: "mytechdevices-6160b.appspot.com",
	messagingSenderId: "944779491577",
	appId: "1:944779491577:web:a9db8ca0e2dfad6f2e0a28",
	measurementId: "G-P05CBXQC77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();
export const firestore = getFirestore();

export const sendLinkToEmail = async (email) => {
	const config = {
		url: process.env.REACT_APP_REGISTER_REDIRECT_URL.replace(/['"]+/g, ""),
		handleCodeInApp: true,
	};

	try {
		await sendSignInLinkToEmail(auth, email, config);
		toast(
			`Email is sent to ${email}. Click the link to  complete your registration.`
		);
		window.localStorage.setItem("emailForRegistration", email);
	} catch (error) {
		console.log(error);
	}
};

export const signInWithVerifiedEmail = async (email, url) => {
	try {
		const result = await signInWithEmailLink(auth, email, url);
		const user = result.user;
		window.localStorage.removeItem("emailForRegistration");
		return user;
	} catch (error) {
		toast.error(error.message);
	}
};

export const logInWithEmailAndPassword = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		if (userCredential.user) {
			toast.success("Login successfully");
		}

		return userCredential.user;
	} catch (error) {
		if (error.message === "Firebase: Error (auth/wrong-password).") {
			toast.error("Email or password is incorrect, please try again");
		} else if (
			error.message ===
			"Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
		) {
			toast.error("Too many failed login attempts. Please try again later");
		} else if (error.message === "Firebase: Error (auth/user-not-found).") {
			toast.error("User not found. Please try again!");
		}
	}
};

export const logInWithGoogle = async () => {
	try {
		googleProvider.setCustomParameters({ prompt: "select_account" });
		googleProvider.addScope("email");
		const result = await signInWithPopup(auth, googleProvider);
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		// The signed-in user info.
		const user = result.user;

		if (user) {
			toast.success("Google logged in successfully");
		}
		return user;
	} catch (error) {
		toast.error(error.message);
	}
};

export const forgotPasswordEmail = async (email) => {
	const config = {
		url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL.replace(
			/['"]+/g,
			""
		),
		handleCodeInApp: true,
	};
	try {
		await sendPasswordResetEmail(auth, email, config);
	} catch (error) {
		console.log(error);
		toast.error(error.message);
	}
};
export const signOutUser = async () => {
	try {
		signOut(auth);
	} catch (error) {
		toast.error(error.message);
	}
};
