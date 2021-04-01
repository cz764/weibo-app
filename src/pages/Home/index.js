import React, { useEffect } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { getHomeTimeline } from "../../actions/timeline";
import moment from "moment";
import styles from "./index.module.scss";

const mapStateTimeline = (state) => state.timeline;

const Home = () => {
  const dispatch = useDispatch();
  const { home = [] } = useMappedState(mapStateTimeline);

  useEffect(() => {
    dispatch(getHomeTimeline());
  }, [dispatch]);
  return (
    <div>
      {home.map(({ id, text, user, created_at, source, pic_urls }) => (
        <div key={id} className={styles.post}>
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
          <div className={styles.content}>
            <div className={styles.text}>{text}</div>
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
        </div>
      ))}
    </div>
  );
};

export default Home;
