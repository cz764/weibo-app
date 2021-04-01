import React, { useEffect } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { getHomeTimeline } from "../../actions/timeline";
import moment from "moment";

const mapStateTimeline = (state) => state.timeline;

const Home = () => {
  const dispatch = useDispatch();
  const { home = [] } = useMappedState(mapStateTimeline);

  useEffect(() => {
    dispatch(getHomeTimeline());
  }, [dispatch]);
  return (
    <div>
      {home.map(({ id, text, user, created_at, source }) => (
        <div key={id} style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex" }}>
            <img
              src={user.profile_image_url}
              alt={user.profile_image_url}
              style={{ width: 32, height: 32, borderRadius: 50 }}
            />
            <div>
              <div>{user.screen_name}</div>
              <div>
                {moment(created_at).fromNow()} From{" "}
                <span dangerouslySetInnerHTML={{ __html: source }}></span>
              </div>
            </div>
          </div>
          {text}
        </div>
      ))}
    </div>
  );
};

export default Home;
