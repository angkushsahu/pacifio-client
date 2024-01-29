export default function userAvatarName({ userName }: { userName: string }) {
   const avatarName = userName
      .split(" ")
      .map((word) => word[0])
      .join("");

   const twoLetteredAvatarName = avatarName.substring(0, 1) + avatarName.substring(avatarName.length - 1);
   return twoLetteredAvatarName.toUpperCase();
}
