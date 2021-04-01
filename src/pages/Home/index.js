import React, { useEffect } from "react";
import ajax from "../../utils/ajax";

const Home = () => {
  useEffect(() => {
    ajax.get("proxy/2/statuses/public_timeline.json", {
      params: {},
    });
  }, []);
  return <div>Home</div>;
};

export default Home;
