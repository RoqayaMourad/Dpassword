![DPassword logo](https://res.cloudinary.com/dbmjocdgi/image/upload/v1653704335/dpassword-cover_sftst6.jpg)

The first Decentralized password manager


## What does  🔐**DPassword**  do?

DPassword is a password managers that enables anyone to manage their password, 

Building a password manager with Zero knowledge proof and No Backend 


## Why centralized storage is not Ideal? 🔑📄
 
When you use a password manager or any other vault app, you store your data on a specific location (local or private cloud) this have some critical problems. your important data is centralized, meaning that  **whoever controls the storage controls the content**. The controller can change the content, completely replace it, or just prevent access. 
That makes your data vulnerable to attacks, exploitation, and loss. 

This makes centralized storage [local or remote] not optimal for storing important data, each has it's downsides


#### Storage

**Remote or Cloud**: Denied access to data or data deletion because of billing issues or even policy changes or what ever the service provider says, **You're completely reliant on who is holding your data**

**Local**: Vulnerable to hacks, MITM attacks or just accidental data lose


## What does  🔐**DPassword**  do?

There is a gap in the market for a reliable, secure and easy to use password manager.

#### **DPassword** check the marks ✅ to be most secure digital vault... with features that doesn't exist on the typical password manager

 With DPassword your data is:

 - ✅ **Secure**: and your master password never stored or transmitted.

 - ✅ **Persistent**: Stored on the IPFS and Filecoin Network to ensure it's availability.

 - ✅ **Provable Ownership**: Where you own your data the same way you own your FIL or bitcoin in your wallet, (wallet integration is coming soon).

 - ✅ **Trustless**: Does not require you to trust the password manager company to know your data is safe.

 - ✅ **Open source**: and open for anyone to study and analyze it's codebase.

## What you can do with DPassword ? 🔐

**Dassword** manages your passwords across websites and apps while being secure and reliable
You can store your credit cards, personal files, personal notes, and sensitive files


## How it works ?

*WE designed a specific flow of data to make sure the master password is only used for data encryption zero knowledge login authentication (SHA-3)*

![Data Access Component](https://res.cloudinary.com/dbmjocdgi/image/upload/v1653708784/4_lkep9z.jpg)

![CID locating](https://res.cloudinary.com/dbmjocdgi/image/upload/v1653708784/5_dvklpy.jpg)

![Uploading to IPFS](https://res.cloudinary.com/dbmjocdgi/image/upload/v1653708784/6_prdoad.jpg)

![Retrieval from IPFS](https://res.cloudinary.com/dbmjocdgi/image/upload/v1653708784/7_ijphk2.jpg)


**The master password is never stored on your local storage or transmitted**

-----
## Challenges we ran into 💪

Building a password manager with Zero knowledge proof and No Backend while enabling Synchronization across multiple devices was no easy task, we have build a similar app before for another hackathon however, this is a different architecture and a different problem to solve: *How do you store password security with only the frontend to manage transactions with IPFS?*

**The solution:** keep some sort of persistent state with a fixed address

We have only one rule we stick to (**the user must own his data & we can't have access to it in any way**).
There is no trusted way to make sure all my data are unavailable for any cloud provider, but IPFS is completely decentralized and the data stored securely.
we also struggled to find a fast IPFS service provider, but we found one in the end

## Accomplishments that we're proud of 😄

We finished the app without breaking our rule, the data is double encrypted and the master password is never transferred

## FEATURES ⚙

- Automated IPFS sync.
- Save documents.
- Save personal Notes.
- Save credit cards.
- Create Password records.
- Generate password.
- Auto fetch website icon.
- Realtime item filtering.
- Create a strong and unique password for each site.
- Temporary local storage Encryption.
- Strong encryption Base on AES256 & SHA-3.
- SHA-1 based password authentication.
- Zero-knowledge architecture.
- Open Source Security and code transparency.

## How it's built ?  👨‍💻

**Web3**: **IPFS** , **Filecoin**

**Front-end**  : Angular 14 

**Mobile**  : Ionic 6 with Capacitor


## How it implements IPFS & Filecoin ?

- Web3.storage as a service,  which uses the decentralized storage provided by the Filecoin ⨎ network, and rewards nodes based on storage.
- Automatically replicate your data across a network of storage providers. and verify the integrity of your data, enabled by Filecoin’s cryptographic proof system.

### Links
Website: https://dpassword.com

App: https://dpassword.com/app/

FrontEnd repo: https://github.com/RoqayaMourad/dpassword

