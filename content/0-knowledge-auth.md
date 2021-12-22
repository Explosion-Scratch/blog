---
title: Creating an end to end encrypted authenticator and password manager
description: The process and data flow of implementing a super-secure 0 knowledge storage system, where all data is securely encrypted
category: Auth, Security, Encryption, Hashing
createdAt: Tuesday, December 21 2021, 7:33 PM
---

## My goal:

The goal of this project was to create a secure password manager and 2 factor auth code generator (think google Authenticator app) that would be securely encrypted. This means that none of the user's data would ever leave the page unencrypted, or be stored in a way that can be decrypted without knowing the user's password.

### Before we begin, here are some basic terms explained:

- **Hashing**: Hashing is a method of taking any string or data as an input, and returning a constant length string as an output. Because of the nature of hashes it's _possible_ (1 in like a trillion) that multiple strings can result in the same hash, that means that you can't undo hashes and get the original string. Think of this as a mathematically secure alternative to converting each letter to a number between 1 and 26 then adding all the letters from a word up to get the 'hash'
- **Salt**: Salt is added to a hash to prevent people from using pre-computed hashed. There are **rainbow tables** which contain the hashes in common algorithms of every string up to length 8. Salting hashes prevents this by adding random characters after the thing you're hashing, e.g. `HASH(PASSWORD + SALT)` then storing the salt with the hash, like this: `$ALGORITHM$SALT$HASH`.
- **AES encryption**: This stands for **A**dvanced **E**ncryption **S**tandard and it's a super strong method of taking something and encrypting it with a password. Without that password you have no hope of recovering or decrypting the data.

<hr>

## Initial plan:

My initial plan was to AES encrypt data on the server with the user's password, but you might imagine the potential downfall of this solution: Say someone hacked into my server, or I turned evil, and decided to collect incoming data and save it, e.g. just save all request bodies to a JSON file. Bing bang boom I just stole everyone's data. Big sad.

## Initial plan revised:

It was time to actually make something! Here's a real photo of me coding:

![Actual photo of me](https://image.shutterstock.com/image-photo/young-hacker-hoodie-front-laptop-260nw-788871841.jpg)

My next thought was:

> Why don't I use the Web Crypto API to encrypt this data in the browser before sending it to the server?
> _- Explosion, 2021_

So I looked for some examples, learned from MDN and made this epic code:

```js
const buff_to_base64 = (buff) => btoa(String.fromCharCode.apply(null, buff));

const base64_to_buf = (b64) =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(null));

const enc = new TextEncoder();
const dec = new TextDecoder();

const getPasswordKey = (password) =>
  window.crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);

const deriveKey = (passwordKey, salt, keyUsage) =>
  window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    passwordKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    keyUsage
  );

export async function encrypt(secretData, password) {
  try {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);
    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      enc.encode(secretData)
    );

    const encryptedContentArr = new Uint8Array(encryptedContent);
    let buff = new Uint8Array(
      salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
    );
    buff.set(salt, 0);
    buff.set(iv, salt.byteLength);
    buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
    const base64Buff = buff_to_base64(buff);
    return base64Buff;
  } catch (e) {
    console.log(`Error - ${e}`);
    return "";
  }
}

export async function decrypt(encryptedData, password) {
  const encryptedDataBuff = base64_to_buf(encryptedData);
  const salt = encryptedDataBuff.slice(0, 16);
  const iv = encryptedDataBuff.slice(16, 16 + 12);
  const data = encryptedDataBuff.slice(16 + 12);
  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
  const decryptedContent = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    aesKey,
    data
  );
  return dec.decode(decryptedContent);
}
```

Btw you can use that code like this:

```js
let encryptThis = "This data is super securely encrypted 😲";
encrypt(encryptThis, "super secret password").then((encrypted) => {
  console.log({ encrypted });

  decrypt(encrypted, "super secret password").then((decrypted) => {
    console.assert(decrypted === encryptThis);
  });
});
```

Ok now this was a pretty good plan, so now the server sends back AES encrypted data to the user, then they decrypt it in browser with their password, then to update it, they simply encrypt before uploading to the server.

Let's say that the server sent this in response to an attempt to login:

```json
{
  "username": "explosion",
  //If you're wondering the password is bcrypt's hash of "not my real password"
  "password": "$2a$12$3lBIC4fzb5rWCIiDGNl82Os35yLzwkTNomfUmBA7FMMb/UbOhO9Dm"
}
```

Ok, but what if some really clever user did this:

```js
async function hash(str) {
  return "$2a$12$3lBIC4fzb5rWCIiDGNl82Os35yLzwkTNomfUmBA7FMMb/UbOhO9Dm";
}
```

oops, now user has access to our account, also because this is hashed with bcrypt, which is server side that means when signing up we'd have to send the **plaintext** password to the server. Big no no.

<Callout>Please note that I don't just hand out data as suggested above, you have to login with a correct username and password to even get the data in the first place, then it's sent to users. </Callout>

Also in case you were wondering how passwords are hashed client side, I used SHA-256, but because that's a really fast algorithm, I do 1000 iterations of it. This means that it would take a significantly longer amount of time to brute force, and it's unlikely that people have rainbow tables of x1000 hashes.

Here's my code for the hash function:

```js
async function hash(str, iterations = 1000) {
  //Gotta love that crypto API
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(str)
  );
  //One liner from stackoverflow
  let result = Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
  if (iterations === 0) {
    return result;
  } else {
    //Recusive function for multiple iterations
    return await hash(result, iterations - 1);
  }
}
```

## My final solution:

What if I hashed the password **twice**? Ok hear me out:

1. Password hashed in browser once then hashed password sent to server
2. Server re-hashes password and stores that in Database, the flow is the same for checking if the hash matches when logging in.

Now, if that's correct, the browser side hashed password is used to encrypt the data before uploading it to the server, this means that no unencrypted data **ever** leaves your browser! Ka-ching!

## That's epic Explosion, where can I try it?

(SORRY) Currently in private beta until I totally finish it, then it'll also have support for notes, logins, OTP/TOTP codes, import/export data, etc, once all of that's implemented, I'll make the repo public. Check back in a few days!

Thanks for reading,

--Explosion--
