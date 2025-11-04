import crypto from "crypto";

const SECRET_KEY = crypto.createHash("sha256").update(String(process.env.ENCRYPTION_KEY)).digest("base64").substring(0, 32); // key 32 byte
const IV = crypto.randomBytes(16);

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return IV.toString("hex") + ":" + encrypted;
}

export function decrypt(text: string) {
  const [ivHex, encrypted] = text.split(":");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), Buffer.from(ivHex, "hex"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
