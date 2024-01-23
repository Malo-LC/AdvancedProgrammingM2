import { motion } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import api from "../../utils/api";

//style
import footer from "../../assets/images/footer.png";
import homepage_img from "../../assets/images/homepage_img.png";
import "./home.css";

function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const textDivVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    api
      .get("user/me")
      .then((res) => {
        if (!res?.access_token) {
          api.disconnect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <motion.div className={`homepage ${isMobile ? "homepage-mobile" : "homepage-desktop"}`}>
        <motion.div className="text-div" variants={textDivVariants} initial="hidden" animate="visible">
          <motion.div className="text-[40px] text-[#163767] font-bold" variants={textItemVariants}>
            <h1>MYEFREI STAGE</h1>
          </motion.div>
          <motion.div className="text-[#6D7ED6] text-[25px] font-semibold" variants={textItemVariants}>
            <h1>Ton site de gestion des stages</h1>
          </motion.div>
          <motion.div className="text-[20px] font-light" variants={textItemVariants}>
            <h1>Un seul site pour gérer toutes tes demandes de stage EFREI</h1>
          </motion.div>
        </motion.div>
        <motion.div>
          <img src={homepage_img} className="h-[300px]" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 w-full">
        <img src={footer} />
      </div>
    </div>
  );
}

export default Home;
