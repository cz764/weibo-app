import React, { useEffect } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { List, Avatar, Card, Button } from "antd";
import { showComments } from "actions/comments";
import { COMMENT_PAGESIZE } from "../../../../constants";
import moment from "moment";
import styles from "./index.module.scss";

const mapStateComments = (state) => state.comments;

const CommentsList = ({ id }) => {
  const { comments = [], page = 0, total = 0 } = useMappedState(
    mapStateComments
  );
  const dispatch = useDispatch();
  const handleLoadMore = () => {
    dispatch(showComments({ id, page: page + 1, count: COMMENT_PAGESIZE }));
  };
  useEffect(() => {
    handleLoadMore();
  }, []);
  const loadMore = page * COMMENT_PAGESIZE < total && (
    <div className={styles.loadmore}>
      <Button onClick={handleLoadMore}>Load More</Button>
    </div>
  );

  return (
    <Card className={styles.commentsList}>
      <List
        dataSource={comments}
        loadMore={loadMore}
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
  );
};

export default CommentsList;
