import React, { useEffect, useState } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { List, Avatar, Card, Button, Input, Row, Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { createComment, showComments, deleteComment } from "actions/comments";
import { COMMENT_PAGESIZE, getUid } from "../../../../constants";
import moment from "moment";
import styles from "./index.module.scss";

const mapStateComments = (state) => state.comments;
const uid = getUid();
const { confirm } = Modal;

const CommentsList = ({ id }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { comments = [], page = 0, total = 0 } = useMappedState(
    mapStateComments
  );

  const handleLoadMore = () => {
    dispatch(showComments({ id, page: page + 1, count: COMMENT_PAGESIZE }));
  };
  useEffect(() => {
    handleLoadMore();
  }, []);
  const handleSendComment = () => {
    let param = new URLSearchParams();
    param.append("id", id);
    param.append("comment", value);
    setValue("");
    dispatch(createComment(param, false));
  };
  const handleDeleteComment = (e, id) => {
    e.preventDefault();
    let param = new URLSearchParams();
    param.append("cid", id);
    confirm({
      title: "警告",
      icon: <ExclamationCircleOutlined />,
      content: "你确定删除这条评论吗？",
      onOk() {
        dispatch(deleteComment(param));
      },
    });
  };
  const loadMore = page * COMMENT_PAGESIZE < total && (
    <div className={styles.loadmore}>
      <Button onClick={handleLoadMore}>Load More</Button>
    </div>
  );

  return (
    <Card className={styles.commentsList}>
      <Row>
        <Col span={20}>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={handleSendComment}>
            评论
          </Button>
        </Col>
      </Row>
      <List
        dataSource={comments}
        loadMore={loadMore}
        renderItem={({ user = {}, id, text, created_at }) => (
          <List.Item
            key={id}
            actions={
              uid === user.idstr
                ? [
                    <a href="#!" onClick={(e) => handleDeleteComment(e, id)}>
                      删除
                    </a>,
                  ]
                : []
            }
          >
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
