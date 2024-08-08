
document.getElementById("send-message").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  const recipient = document.getElementById("recipient").value;

  // Encrypt the message
  const encryptedMessage = encryptMessage(message);
  console.log("Encrypted Message:", encryptedMessage);

  // Create a digital signature
  const signature = createDigitalSignature(encryptedMessage);
  console.log("Digital Signature:", signature);

  // Simulate sending the message and signature to the recipient
  receiveMessage(recipient, encryptedMessage, signature);
});

function encryptMessage(message) {
  const key = CryptoJS.enc.Utf8.parse("d7f3e4a8a9f8b7c6d5e4f3a2b1c0e7d8e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b"); // Example key
  const encrypted = CryptoJS.AES.encrypt(message, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

function createDigitalSignature(message) {
  const privateKey = `-----BEGIN PRIVATE KEY-----

-----END PRIVATE KEY-----`;
  const sign = new JSEncrypt();
  sign.setPrivateKey(privateKey);
  const signature = sign.sign(message, CryptoJS.SHA256, "sha256");
  return signature;
}

function receiveMessage(recipient, encryptedMessage, signature) {
  // Decrypt the message
  const decryptedMessage = decryptMessage(encryptedMessage);
  console.log("Decrypted Message:", decryptedMessage);

  // Verify the digital signature
  const isVerified = verifyDigitalSignature(encryptedMessage, signature);
  console.log("Signature Verified:", isVerified);

  // Display the received message
  const messagesDiv = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${recipient}:</strong> ${decryptedMessage} (Verified: ${isVerified})`;
  messagesDiv.appendChild(messageDiv);
}

function decryptMessage(encryptedMessage) {
  const key = CryptoJS.enc.Utf8.parse("d7f3e4a8a9f8b7c6d5e4f3a2b1c0e7d8e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b"); // Example key
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function verifyDigitalSignature(message, signature) {
  const publicKey = `-----BEGIN PUBLIC KEY-----

-----END PUBLIC KEY-----`;
  const verify = new JSEncrypt();
  verify.setPublicKey(publicKey);
  return verify.verify(message, signature, CryptoJS.SHA256);
}
