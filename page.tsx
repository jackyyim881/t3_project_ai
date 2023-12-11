// import { useRouter } from "next/router";

// import Link from "next/link";
// import { CreateProduct } from "~/app/_components/create-product";
// import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
// import Image from "next/image";
// import SideNav from "~/app/_components/SideNavbar";
// import PriceTag from "./_components/PriceTag";
// import ProductName from "./_components/ProductName";
// import { RoleAdmin } from "./_components/AdminButton";

// export default async function Home() {
//   const session = await getServerAuthSession();

//   return (
//     <div className="container mx-auto flex  ">
//       <div className=" ms-4  min-h-screen   border-r-2">
//         <SideNav />
//       </div>
//       <main className=" flex   w-[100%]  flex-col">
//         <div className=" flex items-center justify-between bg-white px-4 py-2 shadow-sm">
//           {session && (
//             <div className="flex items-center">
//               <Image
//                 src={session.user?.image ?? "/default-profile.png"}
//                 alt="Profile"
//                 width={32}
//                 height={32}
//                 className="mr-2 ms-3 h-8 w-8 rounded-full"
//               />
//               <span className="font-semibold text-gray-700">
//                 Logged in as {session.user?.name}
//               </span>
//             </div>
//           )}
//           <Link
//             href={session ? "/api/auth/signout" : "/api/auth/signin"}
//             className="ml-10 text-blue-500 transition-colors hover:text-blue-700"
//           >
//             {session ? "Sign out" : "Sign in"}
//           </Link>
//         </div>
//         <div className=" p-10">
//           <GetAllProduct />
//           <div className=" ">
//             <CrudCreateProduct />
//           </div>

//           <CheckUserRole />
//         </div>
//       </main>
//     </div>
//   );
//   async function CheckUserRole() {
//     const session = await getServerAuthSession();
//     if (!session?.user?.isAdmin) {
//       // If isAdmin is false or not present, the user is not an admin
//       return null; // Non-admin users should not see the CreateProduct component
//     }
//     const user = await api.auth.getSession.query({ id: session.user?.id });
//     return (
//       <>
//         {user && user.role === "admin" ? (
//           <RoleAdmin session={session} />
//         ) : (
//           <RoleAdmin session={session} />
//         )}
//       </>
//     );
//   }
//   async function CrudCreateProduct() {
//     const session = await getServerAuthSession();
//     const createProductInterface = session?.user?.isAdmin ? (
//       <CreateProduct />
//     ) : null; // If the user is not an admin, this will render nothing.
//     const latestProduct = await api.product.getLatestProduct.query();
//     return (
//       <div className="">
//         {latestProduct ? (
//           <p className="truncate">
//             Your most recent product: {latestProduct.name}
//           </p>
//         ) : (
//           <p>You have no products yet.</p>
//         )}
//         {createProductInterface}
//       </div>
//     );
//   }
//   async function GetAllProduct() {
//     const session = await getServerAuthSession();
//     if (!session?.user) return null;

//     const allProducts = await api.product.getAll.query();

//     return (
//       <div className=" flex ">
//         {allProducts.length > 0 ? (
//           allProducts.map((product: any) => (
//             <Link
//               href={`/products/${product.id}`}
//               key={`${product.id}-${product.name}-${product.price}`}
//             >
//               <div className="relative  m-4 h-[300px] w-[300px] rounded-md  bg-skyBlue-950 p-4    text-white	">
//                 <ProductName name={product.name} />
//                 <PriceTag price={product.price} />
//                 <button className="text-skyBlue-750 absolute bottom-5  rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700">
//                   Click Me
//                 </button>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <p>You have no products yet.</p>
//         )}
//       </div>
//     );
//   }
// }

// export async function getAuth() {
//   const session = await getServerAuthSession();

//   return {
//     props: { session }, // will be passed to the page component as props
//   };
// }
