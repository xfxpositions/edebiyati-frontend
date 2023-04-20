import jsonwebtoken from "jsonwebtoken";
let secret = process.env.VUE_APP_JWT_SECRET;

function verify(token) {
  return jsonwebtoken.verify(token, secret);
}
const deneme = () => {
  if (!secret) {
    console.log("no secret key defined in .env file!");
  } else {
    console.log("token => " + token);
  }
};
export { deneme };
// local storage a aliyo tokeni verify ile kontrol ediyo varsa okey gec yoksa localstoraeda token bolumunu siliyor giris yap'a atiyor
// burasi sadece jwt icin javascript fonksiyonlarini tutuyo
