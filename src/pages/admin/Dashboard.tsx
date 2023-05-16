import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    Heading,
    Stack
} from "@chakra-ui/react";
import { parseISO } from "date-fns";
import { BiUser } from "react-icons/bi";
import { FiGrid, FiLogOut } from "react-icons/fi";
import { Navigate, Outlet } from "react-router-dom";
import { Interceptors } from "use-http";
import useLocalStorage from "use-local-storage";
import { LineBackground } from "../../components/Backgrounds";
import { SidebarButton } from "../../components/Buttons";

const interceptors: Interceptors<any> = {
  response: async ({ response }) => {
    if (response.data?.publishDate) {
      response.data.publishDate = parseISO(response.data.publishDate);
      response.data.dueDate = parseISO(response.data.dueDate);
    }
    return response;
  },
};

export default function Dashboard() {
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>(
    "adminData",
    undefined
  );
  console.log("登录成功", adminData);
  if (!adminData?.token) return <Navigate to="/login" />;

  console.log(adminData.id);
  const onLogout = () => {
    setAdminData(undefined);
    window.location.reload();
  };

  return (
    <Flex minH="100vh">
      <Stack
        flexGrow={1}
        maxW="max-content"
        p={4}
        spacing={8}
        position="relative"
        borderRightWidth={1}
        opacity={0.9}
        bg="#AC6A99"

      >
        <Box>
          {/* <Icon boxSize='5rem' rounded='full' p={3} bg='gray.50' as={AiOutlineUser} /> */}
          <Heading p={3} fontSize="lg">
            Hi, {adminData.name}
          </Heading>
        </Box>
        <Stack
          as={ButtonGroup}
          spacing={6}
          variant="ghost"
          minW="12vw"
          colorScheme="gray"
          flexGrow={1}
        >
          <SidebarButton tagName="游戏 Game" to="" icon={FiGrid} />
          <SidebarButton
            to="profile"
            tagName="修改个人资料 Modify Profile"
            icon={BiUser}
          />
        </Stack>
        <Divider borderColor="gray.300" />
        <Button
          onClick={onLogout}
          variant="ghost"
          colorScheme="gray"
          leftIcon={<FiLogOut />}
        >
          退出 Logout
        </Button>
        <LineBackground boxSize="sm" viewBox="-200 900 1100 1000" />
      </Stack>
      <Outlet context={adminData} />
    </Flex>
  );
}
