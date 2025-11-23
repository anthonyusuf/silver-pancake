import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/NavBar.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import Button from '@mui/material/Button';

function NavBar() {
    const [openLinks, setOpenLinks] = useState(false)


    const toggleNavBar = () => {
        setOpenLinks(!openLinks);
    }
  return (
<div className="NavBar">
        <div className="leftSide" id={openLinks ? "open" : "close"}>
            


            <div className="hiddenLinks">
            <Link to="/contact"> Contact Us </Link>
            <Link to="/log-in"> Log in </Link>
            </div>


        </div>
       
       
        <div className="rightSide">
            <Link to="/contact"> Contact Us </Link>
            <Link to="/log-in"> Log in </Link>


            <Button onClick={toggleNavBar}>
                <ReorderIcon />
                </Button>
        </div>
        
        <div className="logo">WriteOffTrack</div>
       
        </div>
  );
}


export default NavBar



