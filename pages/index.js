import { useState, useEffect } from 'react';
import { authCheckRedirect } from '../assets/AuthContext';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useRouter } from 'next/router';
import { Input, InputGroup, InputRightElement, Button, Center, Grid, GridItem, Container, Alert, AlertIcon, Collapse, CloseButton, Heading, Spinner, useColorModeValue } from '@chakra-ui/react';

// Creates an entry for the new user's data (subscriptions...)
const createUserInfo = async (uid) => {
	const doc = firebase.firestore().collection('users').doc(uid);
	const doc_data = await doc.get();
	if(!doc_data.exists) {
		doc.set({
			company: "",
			website: "",
		  phone: ""
		}).catch((error) => {
			alert(error);
		});
	}
}

function EmailInput(setEmail) {
	return(
	  <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
	);
}

function PasswordInput(setPassword) {
  const [show, setShow] = useState(false)
  return (
    <InputGroup>
      <Input placeholder="Password" type={show ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
      <InputRightElement width="5.25rem">
        <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default function Login() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [alertTitle, setAlertTitle] = useState("");
	const [alertState, setAlertState] = useState(false);

	const [spinnerState, setSpinnerState] = useState("none");

	return(
		<Center h="100%" w="100%" bg="linear-gradient(#262626, black)" position="fixed">
			<Grid templateColumns="repeat(2, 1fr)" w="sm" bg={useColorModeValue("white", "#1e1e1e")} p={6} borderRadius="10px" gap={2}>
				<GridItem textAlign="center" colSpan={2}>
			  	<Heading fontSize="28px">Kapton's SaaS Starter Kit</Heading>
			  </GridItem>
			  <GridItem colSpan={2}>
			  	{ EmailInput(setEmail) }
			  </GridItem>
			  <GridItem colSpan={2}>
			  	{ PasswordInput(setPassword) }
			  </GridItem>
			  <GridItem colSpan={1}>
			  	<Button variant="solid" colorScheme="blue" w="100%" disabled={email === "" || password === ""} onClick={async () => {
			  		setSpinnerState("flex");
			  		await firebase.auth().createUserWithEmailAndPassword(email, password).then(function({ user }) {
			  			createUserInfo(user.uid);
			  			router.push('/dashboard');
			  		}).catch(function(error) {
			  			setSpinnerState("none");
			  			setAlertTitle(error.message);
			  			setAlertState(true);
			  		});
			  	}}>Create Account</Button>
			  </GridItem>
			  <GridItem colSpan={1}>
			  	<Button variant="solid" colorScheme="blue" w="100%" disabled={email === "" || password === ""} onClick={async () => {
			  		setSpinnerState("flex");
			  		await firebase.auth().signInWithEmailAndPassword(email, password).then(function({ user }) {
			  			createUserInfo(user.uid);
			  			router.push('/dashboard');
			  		}).catch(function(error) {
			  			setSpinnerState("none");
			  			setAlertTitle(error.message);
			  			setAlertState(true);
			  		});
			  	}}>Log In</Button>
			  </GridItem>
			  <GridItem colSpan={2}>
			  	<Button variant="outline" colorScheme="blue" w="100%" onClick={async () => {
			  		setSpinnerState("flex");
			  		await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function({ user }) {
			  			createUserInfo(user.uid);	
			  			router.push('/dashboard');
			  		}).catch(function(error) {
			  			setSpinnerState("none");
			  			setAlertTitle(error.message);
			  			setAlertState(true);
			  		});
			  	}}>Continue with Google</Button>
			  </GridItem>
			  <Collapse style={{gridColumn: 'span 2'}} in={alertState} animateOpacity>
				  <Alert w="100%" status="error">
					  <AlertIcon />
					  {alertTitle}
					</Alert>
				</Collapse>
			</Grid>
			<Center display={spinnerState} zIndex="3" position="absolute" h="100%" w="100%" bg="rgba(0, 0, 0, 0.7)">
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
			</Center>
		</Center>
	);
}

Login.getInitialProps = async context => {
	const token = await authCheckRedirect(false, "/dashboard", context);
	return { token };
}