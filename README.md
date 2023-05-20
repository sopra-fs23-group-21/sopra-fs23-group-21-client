# SoPra FS23 - Group 21 Client 
## Introduction
Dou Dizhu (Fighting the Landlord) is one of the most popular card games in China. It is about the class struggle in the old society, which is known as Land Reform Movement. The game was originally popular in Hanyang District, Wuhan City, Hubei Province, China, and has gradually become popular all over the world. Due to the different historical and cultural backgrounds of various provinces and cities in China, different types of Dou Dizhu have been derived according to local characteristics, such as Jiujiang Dou Dizhu, Wuhan Dou Dizhu, and Ningbo Dou Dizhu, etc.

The art of Dou Dizhu may be easy to learn, but it requires a lot of strategic planning and mathematical reasoning skill to master it. Also, to win the game, the players also need to be collaborative and memorize the cards which have been put on the deck. The game is played by at least 3 players, using a deck of 54 cards (even the Joker cards), one of which is the landlord, and the other two are the farmers. The two sides play against each other, and the one who runs out of cards first wins.

Our poker game is a three-player game. To start the game, all three players must be online at the same time, enter the same game room, and click ready. If only one or two players are present, or if all three players are not online at the same time, the game cannot be played.

After finishing a game, it is best for all three players to either choose to play another round together or all choose to exit the room, instead of one player continuing while the other two choose to exit.

The rules of the game "Doudizhu" are relatively complicated: In short, this is a team-based game, with two farmers as one team and the landlord as the other team. Whoever plays all their cards first wins, and as long as one of the farmers plays all the cards first, the farmers win.

At the beginning of the game, the three players can compete to become the landlord. Each player is randomly dealt 17 cards, and an additional three cards are given to the player who successfully becomes the landlord. Therefore, each farmer has 17 cards, while the landlord has 20 cards and can play first.

The types of cards include single cards (A), double cards (AA), three cards with one (AAA+6), three cards with two (AAA+66), four cards (AAAA), consecutive cards (4-5-6-7-8), consecutive double cards (44-55-66), consecutive three cards (444-555), consecutive three cards with one (444-555-7-9), and the pair of jokers (red joker + black joker).

In "Doudizhu", the card values are as follows: 3<4<5<6<7<8<9<10<J<Q<K<A<2<RED JOKER<BLACK JOKER. The size relationship between card combinations is as follows: single cards(A), double cards(AA), three cards(AAA), three cards with one(222+6), three cards with two(JJJ+K), consecutive single cards(10-J-Q-K-A, note:at least 5 cards), consecutive double cards(JJ-QQ-KK,at least 3 cards combination), consecutive three cards(888-999, at least 2 card combination), consecutive three cards with one(QQQ-KKK-2-5) are all at the same level. This means that single cards can only be played against single cards, double cards can only be played against double cards, and other card combinations can only be compared within their respective card combinations. For example, if the landlord plays a 3, the farmers can play a 6, but not a 66. If the landlord plays 3-4-5-6-7, the farmers can play 4-5-6-7-8, but not any other card combinations.

Four cards is a kind is a special card combination that was not mentioned earlier, as it is higher than any other card combination. Four cards can be played against any other card combination. For example, 3333 is the lowest value of four cards, but it can beat 4-5-6-7-8 and KKK-AAA-4-7.

The most special card combination is the pair of jokers. The red joker and black joker can beat any card combination, including the highest four cards, which is 2222.

For more details on "Landlord," you can search for it on Wikipedia at https://en.wikipedia.org/wiki/Dou_dizhu.

In this group project, we hope to develop a website to let users play the Dou Dizhu together. The first step is to register an account. A registered user can join in the game with two other registered users. Also, the user can invite people to join the game. It would be a way for people to expand their social circle and enrich their amateur cultural life.


## Technologies
- React: CSS, Typescript, HTML
- Chakra UI
- GitHub Actions
- REST API
- HTML5 Audio API

## High-level Components
Most important components:
- [Dashboard](https://github.com/sopra-fs23-group-21/sopra-fs23-group-21-client/blob/main/src/pages/admin/Dashboard.tsx)
- [Poker](https://github.com/sopra-fs23-group-21/sopra-fs23-group-21-client/blob/main/src/pages/gameroom/Poker.tsx)
- [Room](https://github.com/sopra-fs23-group-21/sopra-fs23-group-21-client/blob/main/src/pages/gameroom/Room.tsx)

### Dashboard
After successful login, the player will land on the dashboard page. The dashboard contains a narrow menu sidebar on the left and a button to create/join a room:
- [Overview](https://github.com/sopra-fs23-group-21/sopra-fs23-group-21-client/blob/main/src/pages/admin/Overview.tsx)
    Overview is used to show the status of creating or joining a room. 

- [Profile](https://github.com/sopra-fs23-group-21/sopra-fs23-group-21-client/blob/main/src/pages/admin/Profile.tsx)
    Profile shows the profile information including current name, username, password and repeat password to let the player have the opportunity to change his name, username and password.

### Poker
Poker shows the core functions of cards in the game, including:
- assign the cards for each player
- select the cards
- change the selected cards
- play the cards
- pass the round
- elect the landlord
- get ready for the game
- exit the room

### Room
Room shows the status of one room, including:
- players in the room
- sort the cards
- show the photo of landlord and farmers
- define the order of playing cards

## Launch & Development

```npm install primeicons --save```

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
Testing is optional, and you can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## Illustrations
Here is a video on YouTube show you about our game.
[![IMAGE ALT TEXT HERE](https://youtu.be/L9dDTjOKUlM/0.jpg)](https://youtu.be/L9dDTjOKUlM)

[//]: # (https://youtu.be/L9dDTjOKUlM)

There are some screeshots of our game
Register an account

Login 

Initial the game

Play the game

Show the result


## Roadmap
Potential improvements or extensions may include:
- In the game room, users can change the music and choose their favorite music as the background music
- The user can log in with the email. After passing the email verification, if the password is forgotten, the user can retrieve the password or change the password through the email.
- The game ranking feature can be added

## Learn More
- To learn React, check out the [React documentation](https://reactjs.org/).
- To learn Chakra UI, check out the [Chakra UI](https://chakra-ui.com/)
- To learn GitHub Actions, check out the [GitHub Actions](https://docs.github.com/en/actions)

## Authors & Acknowledgement
> Jing Cao, Weimin Yang, Zhi Wang, Xiong Li

## License
Licensed under Apache License Version 2.0
- See [License](LICENSE)

