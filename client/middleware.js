export { default } from "next-auth/middleware";

export const config = {
  // /auth/register
  matcher: [ "/","/auth/welcome"]
};
