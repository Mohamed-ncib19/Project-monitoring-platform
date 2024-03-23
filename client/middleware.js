export { default } from "next-auth/middleware";

export const config = {
  matcher: [ "/","/auth/welcome","/auth/register"]
};
