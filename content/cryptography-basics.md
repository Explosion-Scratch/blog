---
title: Cryptography using JavaScript
description: How to guide for hashing, signing, encryption, debunking VPNs and more!
category: JavaScript, Web API, Crypto API
createdAt: Friday, December 24 2021, 11:00 AM
---

Ok, so this is going to be a longer article. Today I'll cover how to think about **hashing**, **signing**, **encryption**, **salting**, and as a sort of side note, why you shouldn't get NordVPN.

# Part 1: The terms

So chances are you've heard stuff like "This service is end to end encrypted", "Military grade encryption", "We never share your data", etc, and maybe if you're into privacy and security you've heard some of the terms that I mentioned a bit ago, like 'hashing', 'encryption', etc. Anyways, I'll discuss what those are now.

## Hashing:

Hashing takes any string or data and converts it into a uniform output. There are several different algorithms for hashing, maybe you've heard of SHA-256, PBKDF2, etc, anyways this is a basic example of how hashing works:

1. Take something as input
2. Apply some sort of transformation
3. Generate a uniform length output

Let's look at some examples of what hashes into what:

```
"This is a string" ⇾ '745b3710658912b0a2c7505547f517558ca95b790c8fb260491885e4b17a559d'
[Insert markdown of article currently] ⇾ 'a4ff8e63fd0ed435f72c18a3ea65afd25d05ea3f0c16ac7a4895d660565aad17'
"a" ⇾ 'da3811154d59c4267077ddd8bb768fa9b06399c486e1fc00485116b57c9872f5'
```

As you can see, the length of the string as an input doesn't matter. This is **very important**, why? Because it means you can't undo a hash. Let's make a **really** simple hash function in JavaScript:

<Callout>Do not use this in any way, it is **highly** insecure, this is just an example</Callout>

```js
function badHashFunction(string) {
  return (
    string
      //Split the string into a list
      .split("")
      //Get character code for each letter ("a" = 97, "b" = 98, etc)
      .map((letter) => letter.charCodeAt(0))
      //Add all the character codes up
      .reduce((acc, current) => acc + current)
  );
}
```

Now we get this type of output:

```
hash("test") ⇾ 448
hash("askjldlaksdjlkaskjdkjlaskjlflkjlkjdslkj") ⇾ 4140
```

ok, but two things can equal the same output. That's the important behavior of a hash:

```
hash("test") ⇾ 448
hash("etst") ⇾ 448
hash("tfss") ⇾ 448
```

When two strings equal the same thing hashed, this is called a **collision**, in most secure hash algorithms collisions are highly unlikely, but the possibility of a collision makes hashes unreverseable.

When you're storing a password in a database, like when you make a great site where users can sign up and login, you **always** need to hash the passwords. This still allows you to compare them though. Let's see how that works:

```js
//Still unsafe, we'll cover why in a sec
function userSignedUp(username, password) {
  storeInDB(username, hash(password));
}
```

Then when that user logs into your app, you check their password like this:

```js
function seeIfUserIsAuthenticated(username, password) {
  let hashedPasswordFromDB = getDBItem(username, "password");
  //Using === is also unsafe, we'll cover that in a bit too
  return hash(password) === hashedPasswordFromDB;
}
```

Now we'll see why these examples I saw are unsafe. Say an attacker finds your database,they can easily simply search for common passwords. Let's say your database looks like this:

```json
[
  {
    "username": "explosion",
    "password": "b88280a8f8ef0ac50042315463a1358292a78e0dfdea0606055d19301bb95284"
  },
  {
    "username": "alice",
    "password": "b88280a8f8ef0ac50042315463a1358292a78e0dfdea0606055d19301bb95284"
  },
  {
    "username": "bob",
    "password": "0dbf385d0b592de47ae3fb65f2f842262750a200d183ade1f2384a6613f4fc7e"
  }
]
```

There are a couple of things we can notice right off the bat, #1: `explosion`, and `alice`, have the same password hash, this means they used the same password! OH NO! #2, an attacker could easily figure out many many of these passwords, like this:

```js
//Hashes of "abc", and "12345"
let listOfCommonPasswordHashes = ["b88280a8f8ef0ac50042315463a1358292a78e0dfdea0606055d19301bb95284", "0dbf385d0b592de47ae3fb65f2f842262750a200d183ade1f2384a6613f4fc7e"];

for (let commonPasswordHash of listOfCommonPasswords){
  if (db.find(i => i.password === commonPasswordHash){
    console.log(`Someone has a common password!!!`);
  }
}
```

So this means no users can use a common password, right? Otherwise hacker will be able to crack it. Nope! The solution to this is **salt**.

![image](https://user-images.githubusercontent.com/61319150/147366961-82126065-465a-4c1c-8248-352fbc0b2dc4.png)

Hashes take computational energy on purpose, this is why older hashing algorithms like SHA-1 are insecure. They can be generated super quickly. This is bad because it means a hacker can generate a list of the hashes of the top 200,000 passwords and just see who on your site has those passwords.

The solution to this is to add **salt** to those hashes, that means just adding some random characters before storing it in the database, so now our user sign up looks like this:

```js
function userSignedUp(username, password) {
  let salt = generateRandomSalt(); //This should return something random, like "ljk138flj2389!&*#%(@^LH"
  //Notice how we also store the salt
  storeInDB(username, hash(password + salt), salt);
}
```

Now our database looks like this:

```json
[
  {
    "username": "explosion",
    "salt": "ljk138flj2389!&*#%(@^LH",
    "password": "f43957427c3216bd4ddf287c439c058521fd6ab65bb00be5b099aa7ed2a2358c"
  }
]
```

Yay! Now that hashed password does **not** match the hash of a common password, and instead, the attacker has to spend lots of time computing the hash of every common password **for each user**. This is also why choosing a good hashing algorithm is important.

**Characteristics of a good hashing algorithm:**

- Must take some time to compute, ~.3 seconds per hash would be super secure. This **dramatically** increases the difficulty of brute force attacks.
- Must be a good hash. Just search online for some good ones, SHA-512 is good, PBKDF2 is also good, etc.

**Ending note for hashes**:

You may have noticed my comment further back:

```
//Using === is also unsafe, we'll cover that in a bit too
```

This type of attack is called a timing attack, let's say that we do some sort of thing like this:

```
function randomRequestToServer(){
  let startTime = performance.now();
  await fetchServerForRandomData();
  let timeSpent = performance.now() - startTime;
  store(timeSpent);
}
function attemptToLogin(username, password){
  //Send stuff to server, you know
}

//Now we can attempt to figure out the password like this:

attemptToLogin(username, "random password we're testing");
randomRequestToServer();
```

Now if we do this a whole lot and keep track of the time that randomRequestToServer took you could figure out how close a tested password is to the real one. Because it takes longer to compare similar strings than non-similar strings.

This means that it's best to use something that provides a timing safe equals function, like Node.js's [`crypto.timingSafeEqual(a, b)`](https://nodejs.org/api/crypto.html#crypto_crypto_timingsafeequal_a_b).

## Signing

Now let's move on to signing data. This takes someone's private key, signs some data with it, then you send the data, and the signature along with that data. To verify if that data has been signed, you use the public key of the user who signed it and the signature. A nice diagram is as follows:

![Cryptographic signing](https://www.tutorialspoint.com/cryptography/images/model_digital_signature.jpg)

**What do you mean by public key and private key?**
Public keys and private keys are generated using an algorithm called RSA. It's super cool because it allows you to encrypt something to someone else specifically without anyone along the way being able to decrypt it. This is how my file sharing service [OnDrop](https://github.com/explosion-scratch/ondrop) works.

Basically here's an example:

```js
function decryptData(data, privateKey) {
  //More real code
  return decrypted;
}
function encryptData(data, publicKey) {
  //Some real code here
  return encryptedData;
}
function generateKeyPair() {
  //Actual code here
  return {
    publicKey,
    privateKey,
  };
}
```

You can do all of this with the Web Crypto API! Anyways, as you can see from my horrible example with no real code whatsoever, you can only **decrypt** the data with a private key, but you can encrypt data to anyone using their public key. That means you can share public keys whereever, and keep private keys safe.

**Back to signing**
Signing also uses a public key and private key. The private key is used to sign the data. The public key is used to verify that the data was signed by it. This means that nobody else can sign data as somebody else, and other people can check if data was signed by a specific person.

## Encryption

Encryption takes some data, and a key, and encrypts it. This can then be decrypted using that same key, or in the case of RSA, data is encrypted with the public key, and decrypted with the private key.
