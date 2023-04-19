import jsonwebtoken from "jsonwebtoken";

let secret = process.env.VUE_APP_JWT_SECRET;

function sign(token) {
  jsonwebtoken.verify(token);
}
const deneme = () => {
  if (!secret) {
    console.log("no secret key defined in .env file!");
  } else {
    console.log("token => " + token);
  }
};
export { deneme };
