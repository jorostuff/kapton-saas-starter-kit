import { useState, useEffect } from 'react';
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { Grid, GridItem, Button, Heading, Center, useColorMode, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export default function Navbar({ children }) {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	const [navDisplayState, setNavDisplayState] = useState("none");
  return(
  	<div>
	    <Grid display={{base: "block", lg: "inline-block"}} position={{base: "relative", lg: "fixed"}} w={{base: "100%", lg: "250px"}} h={{base: "fit-content", lg: "100vh"}} bg="linear-gradient(#262626, black)">
      	<Grid display={{base: navDisplayState, lg: "grid"}} h="fit-content" gap={3} p={3}>
	        <GridItem>
	          <Heading textAlign="center" fontSize="28px" color="white">Kapton's SaaS Starter Kit</Heading>
	        </GridItem>
	        <GridItem>
	          <Link href="/dashboard">
	            <Button variant="solid" colorScheme="blue" w="100%">Dashboard</Button>
	          </Link>
	        </GridItem>
	        <GridItem>
	          <Link href="/integrations">
	            <Button variant="solid" colorScheme="blue" w="100%">Integrations</Button>
	          </Link>
	        </GridItem>
	        <GridItem>
	          <Link href="/account">
	            <Button variant="solid" colorScheme="blue" w="100%">Account</Button>
	          </Link>
	        </GridItem>
	        <GridItem>
	          <Button w="100%" onClick={async () => {
	            await firebase.auth().signOut().then(() => {
	              router.push('/');
	            }).catch(err => {
	            	alert(err);
	            });
	          }}>Log Out</Button>
	        </GridItem>
	        <GridItem>
	        	<Center>
	          	<Button variant="link" onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
	          </Center>
	        </GridItem>
	      </Grid>
	      <Center display={{base: "flex", lg: "none"}} onClick={() => navDisplayState == "grid" ? setNavDisplayState("none") : setNavDisplayState("grid")}>
        	{ navDisplayState == "grid" ? <ChevronUpIcon color="white" w={50} h={50} m={1} /> : <ChevronDownIcon w={50} h={50} m={1} color="white" /> }
        </Center>
	    </Grid>
	    <Grid display="inline-block" float="right" w={{base: "100%", lg: "calc(100% - 250px)"}} p={{base: 3, lg: 8}}>
	    	{children}
	    </Grid>
	    <style jsx global>{`
			  body {
			    background: ${useColorModeValue("#f7f7f7", "#2e2e2e")}!important;
			  }
			`}</style>
    </div>
  );
}