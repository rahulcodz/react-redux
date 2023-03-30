const initialState = {
  users: null,
  currentUser: null,
  toastAction: "null",
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

    case "GET_USERS_SUCCESS":
      return {
        ...state,
        loading: action.payload,
      };

    case "POST_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case "POST_USER_SUCCESS":
      return {
        ...state,
        userAddSuccess: action.payload,
      };

    case "POST_USER_ERROR":
      return {
        ...state,
        userAddError: action.payload,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        userAddSuccess: "User Updated Successfully!",
      };
    case "UPDATE_USER_ERROR":
      return {
        ...state,
        userAddError: "Error!",
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
      return { ...state, deleteMessage: "User Deleted!" };
    case "DELETE_USER_FAILURE":
      return { ...state, isLoading: false, error: action.error };

    case "TOAST_ACTION":
      return {
        ...state,
        toastAction: action.payload,
      };
    default:
      return state;
  }
}

// rough for t
// To render messages that you are getting from Redux in your React application, you need to first make sure that you have the messages stored in your Redux store. This can be done by dispatching an action to update the store with the messages. Once the messages are stored in the Redux store, you can access them in your React component using the connect function from the react-redux library.

// Here's an example of how you can render messages from Redux in your React application:

// Create a Redux action that updates the store with the messages:
// javascript
// Copy code
// // actions.js

// export const updateMessages = (messages) => ({
//   type: 'UPDATE_MESSAGES',
//   payload: messages,
// });
// Create a Redux reducer that updates the store with the messages:
// javascript
// Copy code
// // reducers.js

// const initialState = {
//   messages: [],
// };

// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'UPDATE_MESSAGES':
//       return { ...state, messages: action.payload };
//     default:
//       return state;
//   }
// };
// Connect your component to the Redux store using the connect function:
// javascript
// Copy code
// // MyComponent.js

// import React from 'react';
// import { connect } from 'react-redux';

// const MyComponent = ({ messages }) => {
//   return (
//     <div>
//       {messages.map((message) => (
//         <div key={message.id}>{message.text}</div>
//       ))}
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   messages: state.messages,
// });

// export default connect(mapStateToProps)(MyComponent);
// In the above example, the connect function connects MyComponent to the Redux store and maps the messages state from the store to a prop in the component. The MyComponent then renders the messages by mapping over the messages prop and rendering each message as a div element.

// By following these steps, you should be able to render messages from Redux in your React application.
