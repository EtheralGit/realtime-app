import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { HiDotsVertical } from "react-icons/hi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useChangeProfile from "@/hooks/useChangeProfile";

const UserProfile = () => {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  const userName = userObject.username;
  const userProfile = userObject.profilePic;
  const userContent = userObject.content;

  const { loading, changeProfile } = useChangeProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sucess");
    await changeProfile(updatedName, updatedContent);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={userProfile} alt="@shadcn" className="" />
          </Avatar>
          <div className="flex flex-col justify-center">
            <h1 className="text-white text-lg font-medium">{userName}</h1>
            <p className="text-white text-xs opacity-80 -mt-[4px]">
              {userContent}
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <HiDotsVertical className="h-6 text-white cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid items-center gap-4">
                  <Label htmlFor="username" className=" text-white">
                    Username
                  </Label>
                  <input
                    type="text"
                    id="username"
                    className="text-sm rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
                    placeholder={userName}
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols items-center gap-4">
                  <Label htmlFor="content" className=" text-white">
                    Content
                  </Label>
                  <input
                    type="text"
                    id="content"
                    className="text-sm rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
                    placeholder={userContent}
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <button
                  className="bg-gray-900 rounded-md text-md text-white px-6 py-3 hover:bg-black duration-300 "
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="mt-2" />
    </div>
  );
};

export default UserProfile;
