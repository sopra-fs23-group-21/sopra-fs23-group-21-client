import { Box, Center, Heading, Text } from "@chakra-ui/react";

export default function Rules() {
  return (
    <Center
      h="100vh"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      bgImage="url('/image/05b6a71c48ac19ba9097a5bb44daa7e1.png')"
    >
      <Box
        bg="white"
        w="100%"
        maxW="1200px"
        p="6"
        borderRadius="lg"
        boxShadow="md"
      >
        <Text fontSize="sm" textAlign="justify">
1. Our poker game is a three-player game. To start the game, all three players must be online at the same time, enter the same game room, and click ' 准备 ready？'，the '准备 Ready?' button is unavailable until there are three players in the same game room. If only one or two players are present, or if all three players are not online at the same time, the game cannot be played.<br/>
<br/>
2. After finishing a game, it is best for all three players to either choose to play another round together or all choose to exit the room, instead of one player continuing while the other two choose to exit.<br/>
<br/>
3. The rules of the game "Doudizhu" are relatively complicated: In short, this is a team-based game, with two farmers as one team and the landlord as the other team. Whoever plays all their cards first wins, and as long as one of the farmers plays all the cards first, the farmers win.<br/>
<br/>
4. At the beginning of the game, the three players can compete to become the landlord. Each player is randomly dealt 17 cards, and an additional three cards are given to the player who successfully becomes the landlord. Therefore, each farmer has 17 cards, while the landlord has 20 cards and can play first.<br/>
<br/>
5. The types of cards include single cards (A), double cards (AA), three cards with one (AAA+6), three cards with two (AAA+66), four cards (AAAA), consecutive cards (4-5-6-7-8), consecutive double cards (44-55-66), consecutive three cards (444-555), consecutive three cards with one (444-555-7-9), and the pair of jokers (red joker + black joker).<br/>
<br/>
6. In "Doudizhu", the card values are as follows: 3 &lt; 4 &lt; 5 &lt; 6 &lt; 7 &lt; 8 &lt; 9 &lt; 10 &lt; J &lt; Q &lt; K &lt; A &lt; 2 &lt; RED JOKER &lt; BLACK JOKER. The size relationship between card combinations is as follows: single cards(A), double cards(AA), three cards(AAA), three cards with one(222+6), three cards with two(JJJ+K), consecutive single cards(10-J-Q-K-A, note:at least 5 cards), consecutive double cards(JJ-QQ-KK,at least 3 cards combination), consecutive three cards(888-999, at least 2 card combination), consecutive three cards with one(QQQ-KKK-2-5) are all at the same level. This means that single cards can only be played against single cards, double cards can only be played against double cards, and other card combinations can only be compared within their respective card combinations. For example, if the landlord plays a 3, the farmers can play a 6, but not a 66. If the landlord plays 3-4-5-6-7, the farmers can play 4-5-6-7-8, but not any other card combinations.

Four cards is a kind is a special card combination that was not mentioned earlier, as it is higher than any other card combination. Four cards can be played against any other card combination. For example, 3333 is the lowest value of four cards, but it can beat 4-5-6-7-8 and KKK-AAA-4-7.

The most special card combination is the pair of jokers. The red joker and black joker can beat any card combination, including the highest four cards, which is 2222.<br/>
<br/>
7. For more details on "Landlord," you can search for it on Wikipedia at https://en.wikipedia.org/wiki/Dou_dizhu.<br/>
<br/>
8. Finally, when the game finishes, everyone need to click on "Quit Room" - This is very important!!!

        </Text>
      </Box>
    </Center>
  );
}
