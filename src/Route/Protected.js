import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const { HomeComponent } = props;

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    const loggedData = localStorage.getItem("login");
    if (!storedData || !loggedData) {
      navigate("/login");
      console.log(storedData);
    }
  }, []);

  return (
    <div>
      <HomeComponent />
    </div>
  );
}

export default Protected;
