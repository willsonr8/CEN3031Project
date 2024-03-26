import React from "react";
import NameSearch from "../components/NameSearch";
import NavBar from "../components/Navbar";


const SearchPage = () => {
    return (
        <div className="red-dark text-foreground bg-background" style={{ textAlign: 'center', fontSize: '24px' }}>
            <NavBar />
           <NameSearch />
        </div>
    );
};

export default SearchPage;