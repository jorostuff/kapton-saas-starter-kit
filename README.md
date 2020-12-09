# Kapton's SaaS Starter Kit
*A SaaS boilerplate written in Next.js, Firebase (and Firestore), Xkit and Chakra UI.*

**Preview here:** <a href="https://saas-starter.vercel.app/" target="_blank">https://saas-starter.vercel.app/</a>

## How to setup

#### Getting the repository

1. Download/clone the repository.
    
    `git clone https://github.com/kaptona/kapton-saas-starter-kit`

#### Installing the required packages

2. Go to the downloaded/cloned folder and install the dependencies like this:
    
    `npm install` or `yarn install`

#### Setting up the .env.local file

3. Find the *.env.local.sample* file and rename it to *.env.local*.

#### Setting up Firebase

4. Create a Firebase account <a href="https://firebase.google.com/" target="_blank">here</a>.  

5. Go to the Firebase console and set up *Authentication* and *Cloud Firestore*.

6. Go to the Firebase project settings and find the Firebase SDK config details.

7. Open the *.env.local* file and put the Firebase SDK config details there like this:

        NEXT_PUBLIC_FIREBASE_API_KEY=<put_api_key_here>
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<put_auth_domain_here>
        NEXT_PUBLIC_FIREBASE_DATABASE_URL=<put_database_url_here>
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=<put_project_id_here>
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<put_storage_bucket_here>
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<put_messaging_sender_id>
        NEXT_PUBLIC_FIREBASE_APP_ID=<put_app_id_here>
        
8. Go to Firebase project settings and click on *Service Accounts*.<br>
Then on Firebase Admin SDK, generate a private key. Drag and drop the downloaded file in the project folder.<br>
Rename the file to *firebase-key.json*
        
#### Setting up Firestore
9. Go to the Firebase console, open the  *Cloud Firestore* tab and click on *Rules*. Then copy-paste this there:
        
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            match /{document=**} {
              allow read, write: if request.auth != null;
            }
          }
        }
    While these rules are valid, they are not recommended for production applications.<br>
    You can check out <a href="https://firebase.google.com/docs/firestore/security/get-started" target="_blank">security rules</a> to learn more.

#### Setting up Xkit

10. Create an Xkit account <a href="https://xkit.co/" target="_blank">here</a>. 

11. Go to the *New Connector* tab and install a connector/s.

12. Go to the *Settings* tab, scroll down to *API Keys*, and click on *Generate API Key*. 

13. Open the *.env.local* file and put the Xkit Publishable Key, Secret Key and URL Slug like this:
        
        NEXT_PUBLIC_XKIT_PUBLISHABLE_KEY=<put_publishable_key_here>
        NEXT_PUBLIC_XKIT_SECRET_KEY=<put_secret_key_here>
        NEXT_PUBLIC_XKIT_DOMAIN=<put_url_slug_here>
        
### Hooray, that was all!<br>
To view the result, run `npm run dev` in the project folder and go to <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.
