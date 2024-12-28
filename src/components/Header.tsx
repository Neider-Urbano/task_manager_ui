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

const Header = () => {
  return (
    <Navbar className="p-4 md:p-8 flex">
      <NavbarBrand>
        <h1 className="text-lg md:text-xl font-bold">Task Manager</h1>
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
            <DropdownItem key="new">User name</DropdownItem>
            <DropdownItem key="new">email@example.com</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
