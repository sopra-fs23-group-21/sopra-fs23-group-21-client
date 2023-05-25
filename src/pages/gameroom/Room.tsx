import {
  Box, Button,
  Center,
  Container,
  Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import MusicPlayer from "./MusicPlayer";
import PlayerCard from "./PlayerCard";
import Poker from "./Poker";

export default function Room() {
  //当前登录的用户信息
  const [adminData] = useLocalStorage<AdminProps | undefined>(
    "adminData",
    undefined
  );
  //房间号
  const { roomId } = useParams();
  //音乐地址
  const audioUrl = "/music/667.mp3";
  //弹窗
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  //上一副牌
  const [last, setLast] = useState<Array<PokerProps> | undefined>(undefined);
  const cardWidth = 122;
  const cardHeight = 180; // 设置牌的高度
  const cardOverlap = 50;
  const extraWidth = 40; // 增加的额外宽度
  const totalWidth =
    cardWidth + (last?.length || 1 - 1) * cardOverlap + extraWidth;
  //我的
  const [my, setMy] = useState(adminData);
  //left
  const [left, setLeft] = useState<AdminProps | undefined>(undefined);
  //right
  const [right, setRight] = useState<AdminProps | undefined>(undefined);
  //游戏阶段
  const [roomStatus, setRoomStatus] = useState(0);
  const [numUser,setNumUser]= useState(0);
  //是否出牌
  const [isPay, setIsPay] = useState(false);
  //游戏结果
  const [result, setResult] = useState<string | undefined>();
  //地主牌
  const [pokers, setPokers] = useState<Array<PokerProps> | undefined>(
    undefined
  );
  /**
   * 获取牌
   * @param card
   */
  const getCardImagePath = (card: PokerProps) => {
    if (card.value > 13) {
      return `/image/${card.value}.png`;
    }
    return `/image/${card.type}/${card.value}.png`;
  };
  /***
   * 排序
   * @param arr
   */
  const sortByValueAndType = (arr: PokerProps[] | undefined) => {
    if (!arr) {
      return arr;
    }
    return arr.sort((a, b) => {
      if (a.value < b.value) {
        return -1;
      } else if (a.value > b.value) {
        return 1;
      }
      if (a.type < b.type) {
        return -1;
      } else if (a.type > b.type) {
        return 1;
      }
      return 0;
    });
  };
  const updateGameContextDate = (data: GameContextProps) => {
    if (!data.userList) {
      return;
    }
    let place = 0;
    for (let i = 0; i < data.userList.length; i++) {
      if (data.userList[i]) {
        //确定地主头像
        if (data.gameStatus > 2 && i == data.start) {
          data.userList[i].head = "/image/Picture6.png";
        } else {
          data.userList[i].head = "/image/Picture1.png";
        }
        if (data.userList[i].token === adminData?.token) {
          place = i;
        }
        //获取当前玩家
        data.userList[i].handCard = sortByValueAndType(
          data.userList[i].handCard
        );
      }
    }
    if (data.now != undefined) {
      data.userList[data.now].status = "on";
    }
    setNumUser(data.userList.length);
    setPokers(data.pokers);
    setResult(
      data.winner == undefined
        ? undefined
        : data.winner == data.start
        ? "Landlord Win!"
        : "Farmers Win!"
    );
    setIsPay(data.now === place);
    setRoomStatus(data.gameStatus);
    setMy(data.userList[place]);
    setLast(data.last?.card);
    console.log("当前出牌", data.last?.card);
    if (place === 0) {
      setLeft(data.userList[2]);
      setRight(data.userList[1]);
    }
    if (place === 1) {
      setLeft(data.userList[0]);
      setRight(data.userList[2]);
    }
    if (place === 2) {
      setLeft(data.userList[1]);
      setRight(data.userList[0]);
    }
  };

  useEffect(() => {
    //const apiUrl = process.env.REACT_SOCKET_API_URL;
    //const ws = new WebSocket(`ws:/doudizhu-server.oa.r.appspot.com/ws/room/sync/${adminData?.token}`);
    //const ws = new WebSocket(`${apiUrl}/ws/ddz/sync/${adminData?.token}`);
    //Local Run:
    // const ws = new WebSocket(`ws:/localhost:8080/ws/ddz/sync/${roomId}/${adminData?.token}`);
    //Google Cloud Run:
    // sopra-fs23-group-21-server-new.oa.r.appspot.com

    const ws = new WebSocket(
      `wss:/sopra-fs23-group-21-server-new.oa.r.appspot.com/ws/ddz/sync/${roomId}/${adminData?.token}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      console.log("WebSocket received message:", event.data);
      const result = JSON.parse(event.data) as ResultProps<GameContextProps>;
      if (result.status === 200) {
        const data: GameContextProps = result.data;
        updateGameContextDate(data);
      }
    };

    ws.onclose = () => {};

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // 在组件卸载时关闭WebSocket连接
    return () => {
      ws.close();
    };
  }, []);

  return (
    <Flex
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      bgImage="url('/image/05b6a71c48ac19ba9097a5bb44daa7e1.png')"
      direction="column"
      h="100vh"
      w="100vw"
    >
      {/* Top */}
      <Box h="10%" w="100%">
        <Container
          gap={6}
          display="flex"
          justifyContent="center"
          position="relative"
          width="100%"
          margin="0 auto"
          w="lg"
          boxShadow="lg"
          rounded="3xl"
        >
          {pokers?.map((card, index) => (
            <Box key={index} p={1} left={`${index * cardOverlap}px`}>
              <Image
                bg="white"
                src={roomStatus == 3 ? getCardImagePath(card) : "/image/c.png"}
                width={`${cardWidth / 2}px`}
                height={`${cardHeight / 2}px`}
                objectFit="cover"
              />
            </Box>
          ))}
        </Container>
        {/* 加弹窗按钮 */}
        <Flex
            justifyContent="flex-end"
            position="absolute" // 使用绝对定位
            zIndex={1} // 设置按钮的层级
            top={5}
            right={100}
        >
          <Button onClick={handleOpen}
                  bg="white"
                  color="blue"
                  opacity={0.7}
                  fontWeight={700}
                  fontSize={20}
                  _hover={{ color: "white", bgColor:"#4b424a"}}
                  _active={{ color: "white", bgColor:"#4b424a" }}
          >Game Rule</Button> {/* 设置按钮的背景颜色为透明 */}
        </Flex>

      </Box>
      <Flex direction="row" flex="1">
        {/* Left */}
        <Box h="100%" w="20%">
          {left && <PlayerCard user={left} />}
        </Box>
        <Flex
          direction="column"
          flex="1"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
        >
          {/* Center */}
          <Center
            h="60vh"
            w="60vw"
            justifyContent="center"
            position="absolute"
            alignItems="center"
          >
            {result && (
              <Text textAlign="center" w="md" color="purple" fontSize="6xl"
                    fontWeight="bold">
                `{result}`
              </Text>
            )}
            {last?.map((card, index) => (
              <Box
                key={index}
                position="absolute"
                p={1}
                cursor="pointer"
                left={`${index * cardOverlap}px`}
              >
                <Image
                  bg="white"
                  src={getCardImagePath(card)}
                  width={`${cardWidth}px`}
                  height={`${cardHeight}px`}
                  objectFit="cover"
                />
              </Box>
            ))}
          </Center>
        </Flex>
        {/* Right */}
        <Box h="100%" w="20%">
          {right && <PlayerCard user={right} />}
        </Box>
      </Flex>
      {/* Bottom */}
      <Box h="30%" w="100%">
        <Poker
          roomStatus={roomStatus}
          user={my}
          roomId={roomId}
          isPay={isPay}
          numUser={numUser}
        />
        <MusicPlayer audioUrl={audioUrl} />
      </Box>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent
            maxWidth="1000px"
            bg="rgba(0, 0, 0, 0.8)" // 设置背景颜色和透明度
            color="white" // 设置字体颜色为白色
        >
          <ModalHeader>Game Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>1. READY: </p><p>Doudi Zhu is a three-player poker game.  The '准备 Ready?' button is unavailable until there are three online players in the same game room. If you can't start the game, please remember to click to '退出房间 Exit the room'.
            <p>After finishing a game, three players choose to play another round together or all choose to exit the room, instead of one player continuing while the other two choose to exit!!!
            </p></p>

            <p>2. RUNNING FOR LANDLORD: </p><p>At the beginning, each player gets 17 cards. By clicking on 'Running for the landlord' button, players can get additional three cards and landlord identity. If multiple players click on the landlord button, the first choosing player is the landlord. The landlord can play cards first. The other two players(farmers) are the teammates.
            </p>

            <p>3. RESULT: </p><p>Doudi Zhu is a team-based game. Whoever plays all their cards first wins, and as long as one of the farmers plays all the cards first, the farmers win.
            </p><hr></hr><br></br>

            <p>POKER COMBINATION: </p><p>Double Jokers &gt; Four Cards &gt; Other Card Combination</p>
            <p> Level 1(High): Four cards (AAAA), Double Jokers [They are higher than any other card combination.]
            </p><p>Level 2(Low): Single cards (A), Double cards (AA), Three cards with one (AAA+6), Three cards with two (AAA+66), Consecutive single cards (4-5-6-7-8), Consecutive double cards (44-55-66), Consecutive three cards (444-555), Consecutive three cards with one (444-555-7-9) [Notes: These poker combination can only be played against themselves].
            </p><hr></hr><br></br>

            <p>Level 1</p><hr></hr>
            <p>Four Cards: Level 2 Card Combination &lt;3333 &lt; AAAA &lt; 2222 &lt; Double Jokers
            </p>
            <p>Double Jokers: Level 2 Card Combination &lt; Four Cards &lt; Double Jokers(Red Joker+Black Joker)
            </p><br></br>

            <p>Level 2</p><hr></hr>
            <p>1. SINGLE CARD: 3 &lt; 4 &lt; 5 &lt; 6 &lt; 7 &lt; 8 &lt; 9 &lt; 10 &lt; J &lt; Q &lt; K &lt; A &lt; 2 &lt; RED JOKER &lt; BLACK JOKER &lt; Four cards &lt; Double Jokers
            </p>
            <p>2. DOUBLE CARDS: 33 &lt; 44 &lt; 55 &lt; 66 &lt; 77 &lt; 88 &lt; 99 &lt; 1010 &lt; JJ &lt; QQ &lt; KK &lt; AA &lt; 22 &lt; Four cards &lt; Double Jokers
            </p>
            <p>3. THREE CARDS: 333 &lt; 444 &lt; 555 &lt; 666 &lt; 777 &lt; 888 &lt; 999 &lt; 101010 &lt; JJJ &lt; QQQ &lt; KKK &lt; AAA &lt; 222 &lt; Four cards &lt; Double Jokers
            </p>
            <p>4. THREE CARDS WITH ONE: 333+9 &lt; KKK+5 &lt; Four cards &lt; Double Jokers; [Only compare the first three cards]
            </p>
            <p>5. THREE CARDS WITH TWO: 444+88 &lt; 222+55 &lt; Four cards &lt; Double Jokers; [Only compare the first three cards]
            </p>
            <p>6. Consecutive Single Cards: 3-4-5-6-7 &lt; 10-J-Q-K-A &lt; Four cards &lt; Double Jokers; [Note:Exclude 2 and Joker; At least 5 cards]
            </p>
            <p>7. Consecutive Double Cards: 33-44-55 &lt; QQ-KK-AA &lt; Four cards &lt; Double Jokers; [Note:Exclude 2 and Joker; At least 3 cards]
            </p>
            <p>8. Consecutive Three Cards: 333-444 &lt; KKK-AAA &lt; Four cards &lt; Double Jokers; [Note:Exclude 2 and Joker; At least 2 cards]
            </p>
            <p>9. Consecutive Three Cards With One: 333-444-7-J &lt; KKK-AAA-5-6 &lt; Four cards &lt; Double Jokers;   [Note:The Consecutive Three Cards Parts exclude 2 and Joker; The Consecutive Three Cards Parts have at least 2 cards]
            </p><hr></hr>
            <p>More Details: https://www.youtube.com/watch?v=HOWevyidlXk</p>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              CLOSE
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
