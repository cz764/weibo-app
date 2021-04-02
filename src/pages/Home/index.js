import React, { useEffect } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import InfiniteScroll from "react-infinite-scroller";
import { getHomeTimeline } from "../../actions/timeline";
import Post from "./components/Post";
import styles from "./index.module.scss";

const mapStateTimeline = (state) => state.timeline;

const Home = () => {
  const dispatch = useDispatch();
  const { home: { posts = [], page } = {} } = useMappedState(mapStateTimeline);

  const handleInfiniteOnLoad = () => {
    dispatch(getHomeTimeline({ page: page + 1 }));
  };

  return (
    <div className={styles.container}>
      <InfiniteScroll
        initialLoad
        pageStart={1}
        loadMore={handleInfiniteOnLoad}
        hasMore={true}
      >
        {posts.map(({ id, ...rest }) => (
          <Post key={id} {...rest} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
