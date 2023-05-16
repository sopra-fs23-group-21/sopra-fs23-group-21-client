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
        <Button variant="round" minW="xs" as={Link} to="login" bg="rgba(172,106,153,0.9)">
          开始游戏 Start the game
        </Button>
        <Button variant="round" minW="xs" as={Link} to="rules" bg="rgba(172, 106, 153, 0.9)" color="#FFFFFF">
          游戏规则 Game rules
        </Button>

        {/* <ButtonGroup> */}
        <Button variant="round" minW="xs" as={Link} to="login" opacity={0.9}>
          登录&nbsp;  Login
        </Button>
        <Button variant="round" minW="xs" as={Link} to="register" opacity={0.9}>
          注册&nbsp;  Register
        </Button>
        {/* </ButtonGroup> */}
      </VStack>
      <LineBackground transform="scaleX(-1) rotate(90deg)" />
    </Stack>
  );
}
