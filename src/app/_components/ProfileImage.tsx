import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";

type ProfileImageProps = {
  width: number;
  height: number;
};

export default async function ProfileImage({
  width,
  height,
}: ProfileImageProps) {
  const session = await getServerAuthSession();

  return (
    <div>
      {session && session.user && session.user.image && (
        <Image
          src={session.user.image}
          alt="Profile Image"
          className="double-border  relative h-20 w-20  rounded-full object-contain"
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
