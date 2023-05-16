import {
    Button,
    Container,
    Heading, VStack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function VerifyConfirmation() {
  return (
    <VStack
      minH="100vh"
      minW="fit-content"
      p={4}
      spacing={12}
      position="relative"
      justify="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      bgImage="url('/image/05b6a71c48ac19ba9097a5bb44daa7e1.png')"
    >
      <Container
        gap={6}
        w="lg"
        centerContent
        bg="#AC6A99"
        opacity={0.95}
        boxShadow="lg"
        rounded="xl"
        borderWidth={1}
        p={10}
      >
        <Heading fontSize="lg">Registered Successfully</Heading>
        <Button as={Link} to="/login" variant="link" size="lg" color="#9F3C4C">
          Start playing!
        </Button>
      </Container>
    </VStack>
  );
}
