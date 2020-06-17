import React from "react";
import LockIcon from '@material-ui/icons/Lock';

const customStyle ={
    fontSize: "22px",
    marginRight: "10px"
}

function Header(){
return (
   <div className="header">
       <LockIcon style={customStyle} />
       Secret App
   </div>
);
}

export default Header;