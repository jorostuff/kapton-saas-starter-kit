import { useState, useEffect, useContext, createContext} from 'react';
import { setCookie, parseCookies} from 'nookies';
import initFirebase from './initFirebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { createXkit } from '@xkit-co/xkit-catalog.js';

initFirebase();
const xkit = process.browser ? createXkit(process.env.NEXT_PUBLIC_XKIT_DOMAIN) : undefined;

const AuthContext = createContext();

// Runs on every page load because it's executed in _app.js
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
      	await xkit.logout();
        setUser(null);
        setCookie(undefined, 'token', '');
      } else {
        const token = await user.getIdToken();
        await xkit.login(token);
        setUser(user);
        setCookie(undefined, 'token', token);
      }
    });
  }, []);

	return(
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}

// Returns the AuthContext's last value
export const getAuth = () => useContext(AuthContext);

// state = true | The page will be accessible only to logged-in users
// state = false | Logged in users will not have access to the page
export const authCheckRedirect = (state, redirect_path, context) => {
  const { token } = parseCookies(context);
  if(state) {
    if (context.req && !token) {
      context.res.writeHead(302, { Location: redirect_path });
      context.res.end();
    }
  } else {
    if (context.req && token) {
      context.res.writeHead(302, { Location: redirect_path });
      context.res.end();
    }
  }
  return token;
}