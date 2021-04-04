import React from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import InfiniteScroll from "react-infinite-scroller";
import { Row, Affix, List, Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { getHomeTimeline } from "../../actions/timeline";
import Post from "./components/Post";
import styles from "./index.module.scss";
import { LOGIN_URL } from "../../constants";
import moment from "moment";

const mapStateTimeline = (state) => state.timeline;
const mapStateComments = (state) => state.comments;

const Home = () => {
  const dispatch = useDispatch();
  const { home: { posts = [], page } = {}, current } = useMappedState(
    mapStateTimeline
  );
  const { comments = [] } = useMappedState(mapStateComments);
  console.log(comments);
  console.log(current);

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
          <>
            <Post key={id} id={id} isCurrent={current === id} {...rest} />
            {current === id && (
              <Card>
                <List
                  dataSource={comments}
                  renderItem={({ user = {}, id, text, created_at }) => (
                    <List.Item key={id}>
                      <List.Item.Meta
                        avatar={<Avatar src={user.profile_image_url} />}
                        title={
                          <div>
                            <span>{user.name}</span>
                            <span className={styles.extra}>
                              {moment(new Date(created_at)).fromNow()}
                            </span>
                          </div>
                        }
                        description={text}
                      />
                    </List.Item>
                  )}
                ></List>
              </Card>
            )}
          </>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
