// import NextAuth from 'next-auth';
// import { DefaultSession } from 'next-auth';

// declare module 'next-auth' {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface User {
//     name: string;
//     token: string;
//   }

//   interface Session extends DefaultSession {
//     user?: User;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     name: string,
//     token: string
//   }
// }