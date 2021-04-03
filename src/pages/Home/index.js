import React from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import InfiniteScroll from "react-infinite-scroller";
import { Row, Affix } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { getHomeTimeline } from "../../actions/timeline";
import Post from "./components/Post";
import styles from "./index.module.scss";
import { LOGIN_URL } from "../../constants";

const mapStateTimeline = (state) => state.timeline;

const Home = () => {
  const dispatch = useDispatch();
  const { home: { posts = [], page } = {} } = useMappedState(mapStateTimeline);

  const handleInfiniteOnLoad = () => {
    dispatch(getHomeTimeline({ page: page + 1 }));
  };

  return (
    <div className={styles.container}>
      <Affix offsetTop={0}>
        <Row className={styles.appbar} justify="space-between" align="middle">
          <a href={LOGIN_URL}>
            <UserOutlined className={styles.icon} />
          </a>
          <div className={styles.appTitle}>Weibo App</div>
          <Link to="/new">
            <EditOutlined className={styles.icon} />
          </Link>
        </Row>
      </Affix>
      <InfiniteScroll
        initialLoad
        pageStart={1}
        loadMore={handleInfiniteOnLoad}
        hasMore={true}
      >
        {posts.map(({ id, ...rest }) => (
          <Post key={id} id={id} {...rest} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
