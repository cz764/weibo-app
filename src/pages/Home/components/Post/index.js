import React from "react";
import { Card } from "antd";
import {
  RetweetOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import moment from "moment";
import styles from "./index.module.scss";

const getPostTitle = (user, created_at, source) => (
  <div className={styles.user}>
    <img
      src={user.profile_image_url}
      alt={user.profile_image_url}
      className={styles.avatar}
    />
    <div className={styles.userInfo}>
      <div>{user.screen_name}</div>
      <div className={styles.extra}>
        {moment(new Date(created_at)).fromNow()} From{" "}
        <span dangerouslySetInnerHTML={{ __html: source }}></span>
      </div>
    </div>
  </div>
);

const Post = ({
  text,
  user,
  created_at,
  source,
  reposts_count,
  attitudes_count,
  comments_count,
  pic_urls,
  retweeted_status,
  type,
}) => {
  return (
    <Card
      type={type}
      className={styles.post}
      bordered={false}
      hoverable
      title={getPostTitle(user, created_at, source)}
      actions={
        type
          ? []
          : [
              <div>
                <RetweetOutlined key="retweet" />
                <span>{reposts_count || ""}</span>
              </div>,
              <div>
                <LikeOutlined key="like" />
                <span>{attitudes_count || ""}</span>
              </div>,
              <div>
                <MessageOutlined key="message" />
                <span>{comments_count || ""}</span>
              </div>,
            ]
      }
    >
      <div className={styles.content}>
        <div className={styles.text}>
          {text}
          {retweeted_status && <Post type="inner" {...retweeted_status} />}
        </div>
        <ul className={styles.images}>
          {pic_urls.map(({ thumbnail_pic }) => (
            <li key={thumbnail_pic} className={styles.imgWrapper}>
              <div className={styles.imgContainer}>
                <img src={thumbnail_pic} alt={thumbnail_pic} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default Post;
