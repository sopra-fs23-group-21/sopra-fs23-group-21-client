import {
    Button, Flex, Grid, HStack, Modal, ModalContent, Stack, useToast,
    VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { IncomingOptions } from "use-http";
import useLocalStorage from "use-local-storage";
import useApi from "../../components/useApi";
import { baseSchema } from "../../forms/Schemas";

export default function Overview() {
  const [isOpen, setIsOpen] = useState(false);
  const schema = baseSchema.pick(["roomId"]);
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>(
    "adminData",
    undefined
  );
  const [rooms, setRooms] = useState(new Array<GameContextProps>());
  const [roomId, setRoomId] = useState("");
  const options: IncomingOptions = {
    headers: {
      Authorization: adminData?.token ? adminData?.token : "",
    },
  };
  //join the room `/cards/${values}`
  const toast = useToast();
  const { post: addUser, response: addUserResult } = useApi(
    "/cards/addUser",
    options
  );

  //join the room when creating successfully
  const addUserFun = (values: string) => {
    addUser("?roomCode=" + values).then((data) => {
      if (addUserResult.ok && data.status == 200) {
        window.open("/room/" + values, "_top");
      } else {
        toast({ title: data.msg, status: "error" });
      }
    });
  };

  //create a game room
  const { post: createGame, response: createGameResult } = useApi(
    "/cards",
    options
  );
  const joinGame = (values: string | undefined) => {
    if (values) joinGameFun(values);
  };

  const joinOldGame = () => {
    joinGameFun(roomId);
  };
  //join the game
  const joinGameFun = (values: string) => {
    addUserFun(values);
  };
  //create room
  const createGameFun = () => {
    createGame().then((data) => {
      if (createGameResult.ok) {
        console.log(data);
        if (data.status === 200) {
          joinGameFun(data.data);
        } else {
          toast({ title: data.msg, status: "error" });
        }
      } else toast({ title: data.msg, status: "error" });
    });
  };

  useEffect(() => {
    //const apiUrl = process.env.REACT_SOCKET_API_URL;
    //const ws = new WebSocket(`ws:/doudizhu-server.oa.r.appspot.com/ws/room/sync/${adminData?.token}`);
    //const ws = new WebSocket(`${apiUrl}/ws/room/sync/${adminData?.token}`);
    // 本地跑
    // const ws = new WebSocket(`ws:/localhost:8080/ws/room/sync/${adminData?.token}`);
    //云上跑 https://sopra-fs23-group-21-server-new.oa.r.appspot.com/

    const ws = new WebSocket(
      `wss:/sopra-fs23-group-21-server-new.oa.r.appspot.com/ws/room/sync/${adminData?.token}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      console.log("WebSocket received message:", event.data);
      const result = JSON.parse(event.data) as ResultProps<GameContextProps[]>;
      if (result.status === 200) {
        const dataRoom: GameContextProps[] = result.data;
        setRooms(dataRoom);
        if (dataRoom && dataRoom.length > 0) {
          dataRoom.forEach((gameContext) => {
            gameContext.userList?.forEach((user) => {
              if (user.id === adminData?.id) {
                setRoomId(gameContext.code);
                setIsOpen(true);
              }
            });
          });
        }
      }
    };

    ws.onclose = () => {};

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // close websocket connection when quit the room
    return () => {
      ws.close();
    };
  }, []);

  if (!adminData?.token) return <Navigate to="/login" />;

  return (
    <Stack
      flexGrow={1}
      justify="space-between"
      spacing={6}
      px={10}
      py={6}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      bgImage="url('/image/05b6a71c48ac19ba9097a5bb44daa7e1.png')"
    >
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
  {rooms?.map((room, index) => (
    <Button
      key={index}
      variant="dashed"
      color="gray.200"
      bgColor="#AC6A99"
      onClick={() =>
        room.userList && room.userList?.length < 3
          ? joinGame(room.code)
          : false
      }
      as={Link}
      to=""
    >
      room code: {room.code}
      <MdAddCircleOutline fontSize="1.5rem" />
      {room.userList && room.userList?.length < 3
        ? "joined the room"
        : "already full"}
    </Button>
  ))}
  <Button
    onClick={createGameFun}
    variant="dashed"
    as={Link}
    to=""
    color="gray.200"
    bgColor="#AC6A99"
    gridColumn="span 4"
  >
    <MdAddCircleOutline fontSize="1.5rem" />
    create a game
  </Button>
</Grid>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <VStack spacing={8}>
            <Flex
              gap={5}
              bg="white"
              boxShadow="lg"
              rounded="3xl"
              borderWidth={1}
              px={10}
              py={6}
            >
              you are already in room {roomId}! Do you want to join it
            </Flex>
            <HStack spacing={6} justifyContent="end" w="full">
              <Button
                variant="round"
                px={8}
                py={6}
                type="submit"
                onClick={() => joinOldGame()}
              >
                Join the game
              </Button>
            </HStack>
          </VStack>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
