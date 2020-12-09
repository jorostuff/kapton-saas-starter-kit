import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../assets/Navbar';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { authCheckRedirect } from '../assets/AuthContext';
import { verifyIdToken, getUserData } from '../assets/firebaseAdmin';
import { Grid, GridItem, Input, InputGroup, InputRightElement, Button, Heading, Text, Container, Collapse, Alert, AlertIcon, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useColorModeValue } from '@chakra-ui/react';

const changeDetails = async (new_email, new_company, new_phone, new_website, uid) => {
	await firebase.auth().currentUser.updateEmail(new_email).then(async () => {
		await firebase.firestore().collection('users').doc(uid).update({
			company: new_company,
			phone: new_phone,
			website: new_website,
		}).then(() => {
			return true;
		}).catch(err => err);
	}).catch(err => err);
}

export default function Account({ email, account_details, uid }) {
	const router = useRouter();

	const company = account_details && account_details.company;
	const phone = account_details && account_details.phone;
	const website = account_details && account_details.website;

	const [emailState, setEmailState] = useState(email);
	const [companyState, setCompanyState] = useState(company);
	const [phoneState, setPhoneState] = useState(phone);
	const [websiteState, setWebsiteState] = useState(website);

	const [confirmState, setConfirmState] = useState(false);
	const [cancelDisabled, setCancelDisabled] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [successAlertState, setSuccessAlertState] = useState(false);
	return(
		<Navbar>
			<Container maxW="md" float="left" p="1em" borderRadius="10px" bg={useColorModeValue("white", "#1e1e1e")} boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1)">
				<Grid gap={4}>
					<GridItem>
						<Heading size="lg">Account Details</Heading>
					</GridItem>
					<GridItem>
						<Text fontSize="md">Email:</Text>
						<Input value={emailState} placeholder="Email" type="email" onChange={(e) => setEmailState(e.target.value)} />
					</GridItem>
					<GridItem>
						<Text fontSize="md">Company:</Text>
						<Input value={companyState} placeholder="Company" type="text" onChange={(e) => setCompanyState(e.target.value)} />
					</GridItem>
					<GridItem>
						<Text fontSize="md">Phone:</Text>
						<Input value={phoneState} placeholder="Phone" type="tel" onChange={(e) => setPhoneState(e.target.value)} />
					</GridItem>
					<GridItem>
						<Text fontSize="md">Website:</Text>
						<Input value={websiteState} placeholder="Website" type="url" onChange={(e) => setWebsiteState(e.target.value)} />
					</GridItem>
					<GridItem>
						<Button variant="solid" colorScheme="blue" onClick={() => {
							setConfirmState(true);
							setSuccessAlertState(false);
						}}>Save</Button>
					</GridItem>
					<Collapse in={successAlertState} animateOpacity>
					  <Alert status="success">
						  <AlertIcon />
						  Saved!
						</Alert>
					</Collapse>
				</Grid>
			</Container>
	  <AlertDialog isOpen={confirmState}>
		<AlertDialogOverlay>
		  <AlertDialogContent>
			<AlertDialogHeader fontSize="lg" fontWeight="bold">Save changes</AlertDialogHeader>
			<AlertDialogBody>Are you sure you want to change your account details?</AlertDialogBody>
			<AlertDialogFooter>
			  <Button disabled={cancelDisabled} onClick={() => setConfirmState(false)}>Cancel</Button>
			  <Button isLoading={confirmLoading} colorScheme="green" onClick={async () => {
				setCancelDisabled(true);
				setConfirmLoading(true);
				await changeDetails(emailState, companyState, phoneState, websiteState, uid).then(async () => {
					setConfirmState(false);
					setSuccessAlertState(true);
					setCancelDisabled(false);
					setConfirmLoading(false);
					if(emailState !== email) {
						await firebase.auth().signOut().then(() => {
							  router.push('/');
							}).catch(err => {
								alert(err);
							});
					}
				}).catch(err => alert(err));
			  }} ml={3}>Confirm</Button>
			</AlertDialogFooter>
		  </AlertDialogContent>
		</AlertDialogOverlay>
	  </AlertDialog>
		</Navbar>
	);
}

export async function getServerSideProps(context) {
  // Getting the encrypted token 
  const token = await authCheckRedirect(true, "/", context);
  if(token) {
		// Verifying and returning the decrypted token
		const { email, uid } = await verifyIdToken(token).catch(err => console.log(err));
		const account_details = await getUserData(token, uid).catch(err => console.log(err));
		return {
		  props: {
				email: email,
				account_details: account_details,
				uid: uid,
		  }
		}
	}
	return { props: {} }
}