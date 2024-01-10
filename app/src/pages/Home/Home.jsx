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

  return (
    <div>
      <h1>Home</h1>
      <button onClick={api.disconnect}>Disconnect</button>
    </div>
  );
}

export default Home;
