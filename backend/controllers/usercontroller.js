import User from "../models/usermodel.js";
import SideBarUsers from "../models/sidebarusermodel.js";

// edit profile
export const changeSelfProfile = async (req, res) => {
  try {
    const { username, content } = req.body;

    if (username.length < 3 || username.length > 25) {
      return res.status(400).json({ error: "Invalid Username" });
    }
    if (content.length < 8 || content.length > 26) {
      return res.status(400).json({ error: "Invalid Content" });
    }

    const nameExists = await User.findOne({ username: username });

    if (nameExists) {
      console.log("username exists");
      return res.status(400).json({ error: "username exists" });
    }

    const updatedProfile = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        username,
        content,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      _id: updatedProfile._id,
      username: updatedProfile.username,
      profilePic: updatedProfile.profilePic,
      content: updatedProfile.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// sidebar profile

export const getUsersForSideBar = async (req, res) => {
  try {
    const LoggedInUser = req.user._id;

    const sidebarUsers = await SideBarUsers.findOne({ _id: LoggedInUser });

    if (!sidebarUsers) {
      return res.status(204).send();
    }

    const allUserProfile = await SideBarUsers.findOne({
      _id: LoggedInUser,
    }).populate({
      path: "userId",
      select: "-password",
    });

    const addedUsers = allUserProfile.userId;

    res.status(200).json({ addedUsers });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const LoggedInUser = req.user._id;

    const allUsers = await User.find({
      _id: { $ne: LoggedInUser },
    }).select("-password");

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters" });
    }

    const searchTerm = username.toLowerCase();

    const FindingUser = await User.find({
      username: {
        $regex: new RegExp(searchTerm, "i"),
      },
    });

    if (FindingUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: FindingUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const addUser = req.body;

    if (!loggedInUser)
      return res.status(400).json({ error: "You are not loggedIn" });

    if (!addUser) return res.status(404).json({ error: "User not found" });

    const updatedAddUser = await SideBarUsers.findOneAndUpdate(
      { _id: loggedInUser._id },
      { $addToSet: { userId: addUser.addUser } },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({ message: "User added successfully", user: updatedAddUser });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const deleteId = req.body;

    if (!loggedInUser)
      return res.status(400).json({ error: "You are not loggedIn" });

    if (!deleteId) return res.status(404).json({ error: "User not found" });

    const updatedSidebarUser = await SideBarUsers.findOneAndUpdate(
      { _id: loggedInUser },
      { $pull: { userId: deleteId.deleteId } },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully Unfriend", user: updatedSidebarUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
