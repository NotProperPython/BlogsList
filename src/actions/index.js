import jsonPlaceHolder from "../../src/apis/jsonPlaceHolder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // await required here as we want to make sure all posts are loaded with their corresponding users
  await dispatch(fetchPosts());

  // // getting all the ids from the getState(redux-store) and finding the unique ones
  // const userIds = _.uniq(_.map(getState().posts, "userId"));

  // // await not required as we don't care about the response, also await dosne't work with foreach
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  // // A cleaner way of doing the same thing
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

//async action creator using redux-thunk
export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await jsonPlaceHolder.get("/posts");
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data,
    });
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({
      type: "FETCH_USER",
      payload: response.data,
    });
  };
};

// // **A SOLUTION TO USER OVERFETCHING**

// export const fetchUser = (id) => {
//   return (dispatch) => {
//     _fetchUser(id, dispatch);
//   };
// };

// // creating a memoize function in order to only make the calls to get user once
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data,
//   });
// });
