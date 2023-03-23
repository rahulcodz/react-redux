import "./App.css";
// import SimpleForm from "./components/SimpleForm";
import "bootstrap/dist/css/bootstrap.min.css";

import ReduxForm from "./components/ReduxForm";
import { getData, getUsers } from "./components/store/action/TestActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import SearchBox from "./components/SearchBox";

function App(id) {
  //for redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(1, ""));
    dispatch(getData());
  });

  return (
    <div>
      {/* <SimpleForm /> */}
      {/* <SearchBox /> */}
      <ReduxForm />
    </div>
  );
}

export default App;
