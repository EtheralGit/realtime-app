import mongoose from "mongoose";

const SideBarUserSchema = mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const SideBarUsers = mongoose.model("SidebarUsers", SideBarUserSchema);

export default SideBarUsers;
