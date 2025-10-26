import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export interface JwtPayloadInterface {
  id: string,
  name: string,
  email: string,
  [key: string] : string
}

function checkSecretToken() {
  const JWT_SECRET = process.env.JWT_SECRET
  console.log("Isi jwt: ", JWT_SECRET)
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET diperlukan di environtment variabel")
  }
}

export async function generateJwtToken(payload: JwtPayloadInterface, expiresIn: string = "1h") {
  checkSecretToken();
  const token: string = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secret);
  console.log("\n\nToken jwt: ", token)
  return token;
}

export async function decodeJwtToken(token: string) {
  checkSecretToken();
  const { payload } = await jwtVerify(token, secret)
  return payload as JwtPayloadInterface;
}