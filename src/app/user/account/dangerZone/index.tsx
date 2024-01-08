import ConfirmAccountDeletion from "./confirmAccountDeletion";
import ConfirmLogout from "./confirmLogout";

export default async function DangerZone() {
   return (
      <div className="flex flex-wrap gap-4">
         <ConfirmLogout />
         <ConfirmAccountDeletion />
      </div>
   );
}
