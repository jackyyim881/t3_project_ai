import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/api/auth";

type SessionProps = {
  session: any;
};

type ImageSize = {
  width?: number;
  height?: number;
};

export default async function ProfileImage({
  session,
  width,
  height,
}: SessionProps & ImageSize) {
  return (
    <div className="flex w-full items-center justify-between border-b-2 px-4 py-2 text-black">
      {session && (
        <div className="flex items-center">
          <Image
            src={session.user?.image ?? "/default-profile.png"}
            alt="Profile"
            width={width}
            height={height}
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
