const INITIAL_STATE = {
  users: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "get_users":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
