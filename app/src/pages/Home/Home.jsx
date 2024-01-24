import { motion } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";
import './home.css'

//style
import footer from "../../assets/images/footer.svg";
import homepage_img from "../../assets/images/homepage_img.svg";
import "./home.css";

//style
import footer from "../../assets/images/footer.svg";
import homepage_img from "../../assets/images/homepage_img.svg";
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
    <div className="flex flex-col items-center">
      <motion.div className={`homepage ${isMobile ? "homepage-mobile" : "homepage-desktop"}`}>
        <motion.div className="text-div" variants={textDivVariants} initial="hidden" animate="visible">
          <motion.div className="text-[40px] sm:text-[50px] md:text-[70px] 2xl:text-[90px] text-[#163767] font-bold" variants={textItemVariants}>
            <h1>MYEFREI STAGE</h1>
          </motion.div>
          <motion.div className="text-[#6D7ED6] text-[25px] md:text-[35px] font-semibold" variants={textItemVariants}>
            <h1>Ton site de gestion des stages</h1>
          </motion.div>
          <motion.div className="text-[20px] md:text-[25px] font-light md:w-[400px]" variants={textItemVariants}>
            <h1>Un seul site pour gérer toutes tes demandes de stage EFREI</h1>
          </motion.div>
        </motion.div>
        <motion.div>
          <img src={homepage_img} className="h-[300px] md:h-[400px]" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 w-screen">
        <img src={footer} className="w-full" />
      </div>
    </div>
  );
}

export default Home;
