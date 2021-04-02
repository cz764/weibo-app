import React, { useEffect } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { getHomeTimeline } from "../../actions/timeline";
import Post from "./components/Post";
import styles from "./index.module.scss";

const mapStateTimeline = (state) => state.timeline;

const Home = () => {
  const dispatch = useDispatch();
  const { home = [] } = useMappedState(mapStateTimeline);

  useEffect(() => {
    dispatch(getHomeTimeline());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      {home.map(({ id, ...rest }) => (
        <Post key={id} {...rest} />
      ))}
    </div>
  );
};

export default Home;
