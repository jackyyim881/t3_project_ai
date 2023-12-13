import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/api/auth";

type ProfileImageProps = {
  width: number;
  height: number;
};
type SessionProps = {
  session: any;
};

export default async function ProfileImage({
  width,
  height,
  session,
}: ProfileImageProps & SessionProps) {
  return (
    <div className="  flex items-center justify-between px-4 py-2 text-black shadow-sm">
      {session && (
        <div className="flex items-center">
          <Image
            src={session.user?.image ?? "/default-profile.png"}
            alt="Profile"
            width={32}
            height={32}
            className="mr-2 ms-3 h-8 w-8 rounded-full"
          />
          <span className="font-semibold text-gray-700">
            Logged in as {session.user?.name}
          </span>
        </div>
      )}
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="ml-10 text-blue-500 transition-colors hover:text-blue-700"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}
