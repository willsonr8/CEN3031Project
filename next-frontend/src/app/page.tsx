import React from "react";
import NameSearch from "./components/NameSearch";
import NavBar from "./components/HomePageNavbar";

//Render the home page with the navigation bar and drug search components
const HomePage = () => {
    return (
        <div style={{ textAlign: "center", fontSize: "24px" }}>
            <NavBar />
            <NameSearch />
        </div>
    );
};

export default HomePage;
