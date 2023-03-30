import "../src/assets/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getData, getUsers, toastAction } from "./Redux/action/TestActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Router from "./Route/Router";
function App(id) {
  //for redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(1, "", "", ""));
    dispatch(getData());
    dispatch(toastAction());
  });

  return (
    <>
      <Router />
    </>
  );
}

export default App;
