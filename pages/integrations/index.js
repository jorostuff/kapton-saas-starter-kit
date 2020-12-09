import Navbar from '../../assets/Navbar';
import { authCheckRedirect } from '../../assets/AuthContext';
import { verifyIdToken } from '../../assets/firebaseAdmin';
import { useEffect } from 'react';
import firebase from 'firebase/app';
import dynamic from 'next/dynamic';
import { createXkit } from '@xkit-co/xkit-catalog.js';
const XkitCatalog = dynamic(
  () => import('@xkit-co/xkit-catalog.js').then(mod => mod.App),
  { ssr: false }
);

const xkit = process.browser ? createXkit(process.env.NEXT_PUBLIC_XKIT_DOMAIN) : undefined;

export default function Integrations({ decrypted_token }) {
  if(decrypted_token) {
  	return(
      <Navbar>
      	<XkitCatalog xkit={xkit} rootPath="/integrations" connectorsPath="/" hideTitle />
      </Navbar>
    );
  } else {
    return(
      <h2>Loading...</h2>
    );
  }
}

// You can get access tokens from Xkit using this function
async function getAccessToken(userId, connectorSlug) {
	const authCreds = Buffer.from(process.env.NEXT_PUBLIC_XKIT_PUBLISHABLE_KEY + ":" + process.env.NEXT_PUBLIC_XKIT_SECRET_KEY).toString('base64');
  const data = await fetch(`https://app.xkit.co/api/platform/connections/${userId}/${connectorSlug}`, {
  	method: 'GET',
	  headers: {'Authorization': 'Basic ' + authCreds}
  }).then(async res => res.json());

  if (!data.connection.enabled) {
    return "none";
  } else if (data.connection.authorization.status !== "active") {
    console.log(`User ${userId} has authorization for ${connectorSlug} in a ${authorization.status} status`)
    return "none";
  } else {
    return data.connection.authorization.access_token;
  }
}

export async function getServerSideProps(context) {
  // Getting the encrypted token 
  const token = await authCheckRedirect(true, "/", context);
  if(token) {
    // Verifying and returning the decrypted token
    const decrypted_token = await verifyIdToken(token).catch(err => console.log(err));
    return {
      props: {
        decrypted_token: decrypted_token,
      }
    }
	}
	return { props: {} }
}