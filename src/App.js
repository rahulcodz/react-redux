import "./App.css";
// import SimpleForm from "./components/SimpleForm";
import "bootstrap/dist/css/bootstrap.min.css";

import ReduxForm from "./components/ReduxForm";
import { getUsers } from "./components/store/action/TestActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  //for redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  });

  return (
    <div>
      <ReduxForm />
      {/* <SimpleForm /> */}
    </div>
  );
}

export default App;
