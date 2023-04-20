let secret2 = import.meta.env.VITE_JWT_SECRET;
import { jwtVerify } from "jose";

export async function verifyToken(token) {
  try {
    const secret = "evet";
    const { payload, protectedHeader } = await jwtVerify(token, secret);
    console.log("Token verified. Payload:", payload);
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
  }
}

const deneme = () => {
  if (!secret) {
    console.log("no secret key defined in .env file!");
  } else {
    console.log("token => " + token);
  }
};

// local storage a aliyo tokeni verify ile kontrol ediyo varsa okey gec yoksa localstoraeda token bolumunu siliyor giris yap'a atiyor
// burasi sadece jwt icin javascript fonksiyonlarini tutuyo
