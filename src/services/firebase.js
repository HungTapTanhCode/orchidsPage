import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB8NuDbqkVnh4RDC8AM1y_P1ol_iI017o",
  authDomain: "se172330.firebaseapp.com",
  projectId: "se172330",
  storageBucket: "se172330.firebasestorage.app",
  messagingSenderId: "647030467040",
  appId: "1:647030467040:web:6189186d508c6750c6a385"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

// ✅ Luôn hiển thị popup chọn tài khoản Google khi login
provider.setCustomParameters({ prompt: 'select_account' });
const signInWithgoogle = () => signInWithPopup(auth, provider);

export { signInWithgoogle };  
