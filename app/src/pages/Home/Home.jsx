import { useEffect } from "react";
import api from "../../utils/api";

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

  return <div></div>;
}

export default Home;
