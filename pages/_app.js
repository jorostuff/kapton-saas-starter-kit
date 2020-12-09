import '../styles/globals.css'
import { AuthProvider } from '../assets/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'

// App runs whenever a page loads
function MyApp({ Component, pageProps }) {
  return (
  	<AuthProvider>
  		<ChakraProvider>
  			<Component {...pageProps}/>
  		</ChakraProvider>
  	</AuthProvider>
  );
}

export default MyApp