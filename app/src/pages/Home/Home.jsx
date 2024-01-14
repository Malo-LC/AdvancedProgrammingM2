import { useEffect } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";
import './home.css'

function Home() {
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
  <div>
    <Navbar />
    {/* <button onClick={api.disconnect}>Disconnect</button> */}
    <div className="content-container">
      <div className="text-container">
        <h1>MY EFREI STAGE</h1>
        <h2>Ton site de gestion des stages</h2>
        <p>Un seul site pour gérer toutes tes demandes de stage EFREI</p>
      </div>
      <div className="img-container">
        <img src="../../../public/job.png" alt="job" />
      </div>
    </div>
    <div className="wave-svg ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#163767" fill-opacity="1" d="M0,160L30,170.7C60,181,120,203,180,186.7C240,171,300,117,360,128C420,139,480,213,540,250.7C600,288,660,288,720,250.7C780,213,840,139,900,112C960,85,1020,107,1080,144C1140,181,1200,235,1260,245.3C1320,256,1380,224,1410,208L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
    </div>
  </div>
);
}

export default Home;
