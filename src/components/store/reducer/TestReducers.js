const initialState = {
  users: null,
  currentUser: null,
};

export default function TestReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        usersData: action.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "POST_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case "GET_SINGLE_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "REMOVE_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "DELETE_USER":
      return { ...state, isLoading: true };
    case "DELETE_USER_SUCCESS":
      return { ...state, isLoading: false };
    case "DELETE_USER_FAILURE":
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}
