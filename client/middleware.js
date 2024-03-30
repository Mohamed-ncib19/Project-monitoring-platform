export { default } from "next-auth/middleware";


export function checkTokenExpiration(){
  const token = localStorage.getItem("token");
  console.log(token)
}

export const config = {
  matcher: [ "/",]
};
