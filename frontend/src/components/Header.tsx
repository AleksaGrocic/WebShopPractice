import { FC } from "react";
import { AccountCircleOutlined, ShoppingCartOutlined } from "@mui/icons-material";

const Header: FC = () => {
  return (
    <header className="header">
        <h2 className="title">Web Shop Practice</h2>
        <div className="header_icons">
          <ShoppingCartOutlined className="button_cart" sx={{ fontSize: 36, color: "white" }} />
          <AccountCircleOutlined className="button_account" sx={{ fontSize: 36, color: "white" }} />
        </div>
        
    </header>
  );
};

export default Header;
