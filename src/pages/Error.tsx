import { Center, Heading } from "@chakra-ui/react";

export default function Error() {
  return (
    <Center
      h="100vh"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      bgImage="url('/image/05b6a71c48ac19ba9097a5bb44daa7e1.png')"
    >
      <Heading>Oops, Page Not Found</Heading>
    </Center>
  );
}
