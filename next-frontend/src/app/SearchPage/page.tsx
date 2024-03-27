import React from "react";
import NameSearch from "../components/NameSearch";
import NavBar from "../components/AccountNavbar";
import NormalizedNameSearch from "../components/NormalizedNameSearch";


const SearchPage = () => {
    return (
        <div style={{ textAlign: 'center', fontSize: '24px' }}>
            <NavBar />
            <NormalizedNameSearch />
        </div>
    );
};

export default SearchPage;