import { authCheckRedirect } from '../../assets/AuthContext';

export default function Redirect() {
	return null;
}

Redirect.getInitialProps = async context => {
	const token = await authCheckRedirect(true, "/", context);
	if (context.req && token) {
    context.res.writeHead(302, { Location: "/integrations" });
    context.res.end();
  }
	return {};
}