export { default } from "next-auth/middleware";


export const config = {
  matcher: ["/","/auth/pending",'/My/dashboard','/My/profile']
};
