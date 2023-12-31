import UpdateUserRole from "./updateUserRole";

const account = {
   name: "John Doe",
   email: "johndoe@gmail.com",
   role: "User",
   joinedOn: "29th September, 2029",
};

export default function ParentAdminUserView() {
   return (
      <div>
         <h1 className="font-semibold text-3xl mb-4">User Account</h1>
         <table className="block">
            <tbody className="block border-2 border-custom-marker divide-y-2 divide-custom-marker md:divide-y-0">
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Name
                  </td>
                  <td className="w-full p-3 md:pl-4">{account.name}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     E-mail
                  </td>
                  <td className="w-full p-3 md:pl-4 break-all">{account.email}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Role
                  </td>
                  <td className="w-full p-3 md:pl-4">{account.role}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Joined on
                  </td>
                  <td className="w-full p-3 md:pl-4">{account.joinedOn}</td>
               </tr>
            </tbody>
         </table>
         <UpdateUserRole role="user" />
      </div>
   );
}
