import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import userService from "../../services/userService.js";
import api from "../../utils/api.js";
import NoAvatar from "../../assets/images/no-avatar.png";
import { useMediaQuery } from "react-responsive";

//style
import "./profile.css";

function Profile() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const user = userService.getUserProfile();
  const [image, setImage] = useState(null);

  const fetchUserInfo = async () => {
    const profilePic = await api.getPfp(user.profilePictureUri);
    setImage(profilePic);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const userInfo = [
    { name: "Email", info: user.email },
    { name: "Téléphone", info: user.phoneNumber },
    { name: "Adresse", info: user.address },
    { name: "Promotion", info: user.promotionYear },
    { name: "Majeur", info: user.major },
    { name: "Classe", info: user.class },
  ];

  return (
    <div className="h-screen items-center justify-center space-y-[50px]">
      <motion.div initial={{ x: "-300%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120, damping: 10 }} className="profile-title">
        <p>Mon profil</p>
      </motion.div>
      <div className={`${isMobile ? "info-container-mobile" : "info-container-desktop"}`}>
        <div className="user-info-pic">
          <img alt="avatar" className="rounded-full border-2 border-gray-300 h-[130px] w-[130px] mb-4" src={image || NoAvatar} />
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
