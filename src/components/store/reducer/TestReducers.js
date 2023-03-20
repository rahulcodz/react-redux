const initialState = {
  users: null,
};

export default function TestReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "POST_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
