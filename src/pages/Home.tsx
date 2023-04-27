import { Button, Flex, Stack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LineBackground } from "../components/Backgrounds";

export default function Home() {
  return (
    <Stack
      minH="100vh"
      minW="fit-content"
      p={7}
      spacing={16}
      position="relative"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      bgImage="url('/image/05b6a71c48ac19ba9097a5bb44daa7e1.png')"
    >
      <Flex align="end" justify="space-between">
        <Flex align="end" gap={2} flexGrow={1}></Flex>
      </Flex>
      <VStack minH="50vh" maxH="100vh" justify="space-evenly">
        <Button variant="round" minW="xs" as={Link} to="login" bg="#AC6A99">
          开始游戏 Start the game
        </Button>
        {/* <ButtonGroup> */}
        <Button variant="round" minW="xs" as={Link} to="login">
          登录 Login
        </Button>
        <Button variant="round" minW="xs" as={Link} to="register">
          注册 Register
        </Button>
        {/* </ButtonGroup> */}
      </VStack>
      <LineBackground transform="scaleX(-1) rotate(90deg)" />
    </Stack>
  );
}
