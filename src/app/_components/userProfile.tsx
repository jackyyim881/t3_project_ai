// import Image from "next/image";
// type Session = {
//   user: {
//     image: string | null | undefined;
//     name: string;
//   };
// };

// type UserProfileProps = {
//   session: Session;
// };
// export function UserProfile({ session }: UserProfileProps) {
//   <div className="flex items-center">
//     <Image
//       src={session.user?.image ?? "/default-profile.png"}
//       alt="Profile"
//       width={32}
//       height={32}
//       className="mr-2 ms-3 h-8 w-8 rounded-full"
//     />
//     <span className="font-semibold text-gray-700">
//       Logged in as {session.user?.name}
//     </span>
//   </div>;
// }
