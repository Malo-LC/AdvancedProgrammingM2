import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import userService from "../../services/userService.js";
import api from "../../utils/api.js";
import NoAvatar from "../../assets/images/no-avatar.png";
import { useMediaQuery } from "react-responsive";

//style
import "./profile.css";
import { Edit3, Plus } from "react-feather";
import { toast } from "react-toastify";

function Profile() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const user = userService.getUserProfile();
  const [image, setImage] = useState(null);

  const fetchUserInfo = async () => {
    if (!user.profilePictureUri) return;
    const profilePic = await api.getPfp(user.profilePictureUri);
    setImage(profilePic);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const userInfo = [
    { name: "Email", info: user.email },
    { name: "Téléphone", info: user.phoneNumber },
    { name: "Promotion", info: user.promotionYear },
    { name: "Classe", info: user.class },
  ];
  function readFileAsync(file) {
    if (!file) {
      return null;
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  const updateProfilePicture = async (e) => {
    const f = e.target.files[0];
    const rawBody = await readFileAsync(f);
    const profilePicture = rawBody ? { base64: rawBody, name: f.name, type: f.type } : null;
    const token = await api.post("user/updateProfilePicture", profilePicture);
    if (token) {
      api.setToken(token.access_token);
    }
    const user = userService.getUserProfile();
    const profilePic = await api.getPfp(user.profilePictureUri);
    setImage(profilePic);
    toast.success("Profile picture updated !");
  };

  return (
    <div className="h-screen items-center justify-center space-y-[50px]">
      <motion.div initial={{ x: "-300%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120, damping: 10 }} className="profile-title">
        <p>Mon profil</p>
      </motion.div>
      <div className={`${isMobile ? "info-container-mobile" : "info-container-desktop"}`}>
        <div className="user-info-pic">
          {image ? (
            <div className="flex flex-col items-center">
              <label htmlFor="file" className="block relative cursor-pointer">
                <img src={image} alt="avatar" className="h-[130px] w-[130px] rounded-full overflow-hidden" />
                <input id="file" className="hidden" type="file" accept="image/*" onChange={(e) => updateProfilePicture(e)} />
                <Edit3 size={30} className="absolute bottom-0 right-0 p-1 z-30 border-2 border-black bg-white rounded-full overflow-hidden" />
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <label htmlFor="file" className="block relative cursor-pointer">
                <img src={NoAvatar} alt="avatar" className="h-[130px] w-[130px] rounded-full overflow-hidden" />
                <input id="file" className="hidden" type="file" accept="image/*" onChange={(e) => updateProfilePicture(e)} />
                <Plus size={30} className="absolute bottom-0 right-0 z-30 border-2 border-black bg-white rounded-full overflow-hidden" />
              </label>
            </div>
          )}

          <div className="flex flex-col text-center">
            <div className="text-lg font-semibold">{user.firstname}</div>
            <div className="text-lg font-semibold">{user.lastname}</div>
          </div>
        </div>
        <div className="user-info-table">
          {userInfo.map((item, index) => (
            <React.Fragment key={item.name}>
              <div className={`user-info-element ${index < userInfo.length - 1 ? "border-b border-[#939393] border-opacity-80" : ""}`}>
                <p className="font-semibold w-1/3">{item.name}</p>
                <div className="mb-2 w-2/3">
                  {item.info === undefined ? (
                    <p className={`${item.info === undefined ? "font-light text-gray-500" : "font-normal"}`}>Non renseigné</p>
                  ) : (
                    item.info
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
