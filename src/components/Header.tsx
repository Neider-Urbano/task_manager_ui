import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { generateToken, removeTokenStorage, token } = useToken();
  const hasToken = token != null;

  const handleToken = () => {
    if (!hasToken) {
      generateToken();
      navigate("/dashboard");
    } else {
      removeTokenStorage();
      navigate("/");
    }
  };

  return (
    <Navbar
      className="p-4 md:p-5 flex mb-5"
      style={{
        background: "linear-gradient(180deg, #6a3e92 0%, #9b59b6 100%)",
      }}
    >
      <div className="max-w-[1280px] flex w-full">
        <NavbarBrand>
          <h1 className="text-lg md:text-xl font-bold text-white">
            Task Manager
          </h1>
        </NavbarBrand>

        <NavbarContent justify="end">
          <Dropdown placement="bottom">
            <DropdownTrigger>
              <Avatar
                isBordered
                size="lg"
                src="https://i.pravatar.cc/150?u=task-manager-avatar"
                alt="User Avatar"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem key="user">User name</DropdownItem>
              <DropdownItem key="email">email@example.com</DropdownItem>
              <DropdownItem
                key="token"
                className={hasToken ? "text-danger" : "text-success"}
                color={hasToken ? "danger" : "success"}
                onPress={handleToken}
              >
                {hasToken ? "Cerrar sesión" : "Iniciar sesión"}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default Header;
