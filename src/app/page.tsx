import Link from "next/link";
import { getServerAuthSession } from "~/server/api/auth";
import { api } from "~/trpc/server";
import SideNav from "~/app/_components/SideNavbar";
import PriceTag from "./_components/PriceTag";
import ProductName from "./_components/ProductName";
import { CheckUserRole } from "./_components/hooks/roleHooks";
import ProfileImage from "./_components/ProfileImage";

export default async function Home() {
  const session = await getServerAuthSession();
  // refresh the router by using the checkuserrole
  return (
    <div className="container mx-auto flex  ">
      <div className=" ms-4  min-h-screen   border-r-2">
        <SideNav />
      </div>
      <div className=" flex w-[100%] flex-col">
        <ProfileImage session={session} width={30} height={30} />
        <div className=" p-10">
          <GetAllProduct />
        </div>
        <CheckUserRole />
      </div>
    </div>
  );
}
// type ControlRole = {
//   session: any;
// };

// type SetRoleMutationConfig = {
//   onSuccess: () => void;
//   onError: () => void;
// };
// <div className="  flex items-center justify-between px-4 py-2 text-black shadow-sm">
//   {session && (
//     <div className="flex items-center">
//       <Image
//         src={session.user?.image ?? "/default-profile.png"}
//         alt="Profile"
//         width={32}
//         height={32}
//         className="mr-2 ms-3 h-8 w-8 rounded-full"
//       />
//       <span className="font-semibold text-gray-700">
//         Logged in as {session.user?.name}
//       </span>
//     </div>
//   )}
//   <Link
//     href={session ? "/api/auth/signout" : "/api/auth/signin"}
//     className="ml-10 text-blue-500 transition-colors hover:text-blue-700"
//   >
//     {session ? "Sign out" : "Sign in"}
//   </Link>
// </div>;
//   async function CheckUserRole() {
//     const session = await getServerAuthSession();
//     if (session?.user?.role !== "ADMIN") {
//       return null;
//     }
//     return (
//       <div className="flex items-center justify-center">
//         <RoleAdmin session={session} />
//         {/* <CrudCreateProduct /> */}
//       </div>
//     );
//   }
// }

// async function TestRole() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;
//   const setRoleAdmin = api.auth.setRoleAsAdmin.mutate({
//     userId: session.user.id,
//   });

//   const setRoleUser = api.auth.setRoleAsUser.mutate({
//     userId: session.user.id,
//   });

//   return (
//     <>
//       <div className=" absolute">
//         <h2 className="text-2xl font-bold">Set role</h2>
//         <button
//           onClick={setRoleAdmin}
//           className="rounded bg-blue-500 px-4 py-2 font-bold text-black hover:bg-blue-700"
//         >
//           User
//         </button>
//         <button
//           onClick={setRoleUser}
//           className="rounded bg-blue-500 px-4 py-2 font-bold text-black hover:bg-blue-700"
//         >
//           Admin
//         </button>
//       </div>
//     </>
//   );
// }

// async function CrudCreateProduct() {
//   const latestProduct = await api.product.getLatestProduct.query();
//   return (
//     <>
//       <section className="grow">
//         {latestProduct ? (
//           <p className="truncate">
//             Your most recent product: {latestProduct.name}
//           </p>
//         ) : (
//           <p>You have no products yet.</p>
//         )}
//         <CreateProduct />
//       </section>
//     </>
//   );
// }
async function GetAllProduct() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allProducts = await api.product.getAll.query();

  return (
    <div className=" flex ">
      {allProducts.length > 0 ? (
        allProducts.map((product: any) => (
          <Link
            href={`/products/${product.id}`}
            key={`${product.id}-${product.name}-${product.price}`}
          >
            <div className="relative  m-4 h-[300px] w-[300px] rounded-md  bg-skyBlue-950 p-4    text-white	">
              <ProductName name={product.name} />
              <PriceTag price={product.price} />
              <button className="text-skyBlue-750 absolute bottom-5  rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700">
                Click Me
              </button>
            </div>
          </Link>
        ))
      ) : (
        <p>You have no products yet.</p>
      )}
    </div>
  );
}
