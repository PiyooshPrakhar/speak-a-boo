export const hashPassword = async (rawPassword) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(rawPassword);

  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

};
