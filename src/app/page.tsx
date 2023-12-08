
import { useRouter } from 'next/router'

import Link from "next/link";
import { CreateProduct } from "~/app/_components/create-product";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Image from "next/image";
import SideNav from "~/app/_components/SideNavbar";
import PriceTag from "./_components/PriceTag";
import ProductName from "./_components/ProductName";
import { RoleAdmin } from './_components/AdminButton';

export default async function Home( ) {
  const session = await getServerAuthSession();
  

// const { mutateAsync: setRoleAsAdmin } = api.auth.setRoleAsAdmin.mutate();
// const { mutateAsync: setRoleAsUser } = api.auth.setRoleAsUser.mutate();
// const handleSetRoleAsAdmin = async () => {
//   try {
//     if (user) {
//       await api.auth.setRoleAsAdmin.mutate({ userId: user.id });
//       alert('Role set to admin');
//     } else {
//       throw new Error('User is null');
//     }
//   } catch (error) {
//     alert('Failed to set role as admin');
//   }
// };
  return (
    <div className="container mx-auto flex ">
      <div className=" min-h-screen  ms-4   border-r-2">
        <SideNav />
      </div>
      <main className=" flex   w-[100%]  flex-col">
        <div className=" flex items-center justify-between bg-white px-4 py-2 shadow-sm">
          {session && (
            <div className="flex items-center">
              <Image
                src={session.user?.image ?? "/default-profile.png"}
                alt="Profile"
                width={32}
                height={32}
                className="mr-2 h-8 w-8 rounded-full ms-3"
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
        <div className=" p-10">
          <GetAllProduct />
          <div className=" ">
            <CrudCreateProduct />
          </div>
       
          <CheckUserRole />
        </div>
      </main>
    </div>
  );
// }
// async function RoleAdmin(){
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;
//   const user = await api.auth.getSession.query({id:session.user.id});
//   console.log(user);
// const handleSetRoleAsAdmin = async () => {
//   try {
//     if (user) {
//       await api.auth.setRoleAsAdmin.mutate({ userId: user.id });
//       alert('Role set to admin');
//     } else {
//       throw new Error('User is null');
//     }
//   } catch (error) {
//     alert('Failed to set role as admin');
//   }
// };

// const handleSetRoleAsUser = async () => {
//   try {
//     if (user) {
//       await api.auth.setRoleAsBasic.mutate({ userId: user.id });
//       alert('Role set to user');
//     } else {
//       throw new Error('User is null');
//     }
//   } catch (error) {
//     alert('Failed to set role as user');
//   }
// };
//   return (
//     <div>
//       <button onClick={handleSetRoleAsAdmin} disabled={false}>
//         Set role as admin
//       </button>
//     </div>
//   )
}
async function CheckUserRole() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const user = await api.auth.getSession.query({ id: session.user?.id });
    return (
      <>

      {
        user && user.role === "admin" ? (
          <RoleAdmin session={session}/>
        ) : (
        <RoleAdmin session={session}/>
        )


      }
      </>
    );
    
    }
//   if (user.role === "admin") {
//     // User is an admin
//     return (
//       <>
//         <RoleAdmin session={session} />
//       </>
//     );
//   } else if (user.role === "basic" || user.role === "") {
//   // User role is "basic" or not defined

//     // User role is not defined
//     return (
//       <>
//         <p>User role is not defined</p>
//       </>
      
//     );
//   } else {
//     // User is a basic user
//     return             <RoleAdmin session={session} />

// ;
  



async function CrudCreateProduct() {
  const session = await getServerAuthSession();
  if (!session?.user || session?.user.role !== 'admin') return null;
  
  const latestProduct = await api.product.getLatestProduct.query();

  return (
    <div className="">
      {latestProduct ? (
        <p className="truncate">
          Your most recent product: {latestProduct.name}
        </p>
      ) : (
        <p>You have no products yet.</p>
      )}

      <CreateProduct />
    </div>
  );
}
async function GetAllProduct() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  
  const allProducts = await api.product.getAll.query();


  return (
    <div className=" flex ">
      {allProducts.length > 0 ? (
        allProducts.map((product : any) => (
        <Link href={`/products/${product.id}`} key={`${product.id}-${product.name}-${product.price}`}>
        <div className="m-4  p-4 h-[300px] w-[300px] relative  text-white bg-skyBlue-950    rounded-md	">
            <ProductName name={product.name} />
            <PriceTag price={product.price} />
          <button className="bg-blue-500 hover:bg-blue-700 absolute  bottom-5 text-skyBlue-750 font-bold py-2 px-4 rounded">
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
