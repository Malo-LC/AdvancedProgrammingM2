import { useEffect } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";

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
    </div>
  );
}

export default Home;
