// players all have objects that say if they are dead or using bomb √
// take turn
// STRETCH: everyone decide if they are using a bomb (comps random 50/50)
// STRETCH: once everyone decides (there should eventually be a timer), the bottle spins
//randomly select player to be kissee √
// STRETCH: if playerId matches playerId selected for kiss, check if isUsingBomb is true. 
// STRETCH: if so, kisser isDead: true. If isUsingBomb: false, 
// kissed isDead: true. √
// STRETCH: If unkissed isUsingBomb: true, then their isDead = true
// All player with isDead: true are eliminated.
// STRETCH: 1. if there are no more people players left game over and no one wins.
// 2. If there is one person left, that person wins! √
// STRETCH: If neither 1 or 2 are true, splice dead players from turnOrder array and continue.
// Change turnOrder so the next person is at the front of the queue √
import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface PlayersObject {
    [Player: string]: { 
      isDead: boolean
      animal: string
  }
}

export interface GameState {
  allPlayerIds: string[]
  allPlayers: PlayersObject
  turnOrder: string[]
  playersReady: object[]
  playersLeft: number
  animalsChosen: string[]
  hasGameStarted: boolean
}

type GameActions = {
  spinBottle: () => void
  assignAnimal: (chosenAnimal: string) => void
  // useBomb: (params: {game: GameState, playerId: string}) => void
  // dontUseBomb: (params: {game: GameState, playerId: string}) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 4,
  maxPlayers: 4,
  setup: (allPlayerIds: string[]): GameState => {
    return ({
    allPlayerIds,
    turnOrder: allPlayerIds
      .map((value: string) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value),
    // An object with player objects
    allPlayers: allPlayerIds
      .reduce((acc, curr) => ({
      ...acc, [curr]: {
        isDead: false,
        animal: ""}
    }), {}),
    playersReady: [],
    hasGameStarted: false,
    playersLeft: 4,
    animalsChosen: []
  })},
  actions: {
    assignAnimal: (chosenAnimal, {game, playerId}) => {
      if (game.allPlayers[playerId].animal) {
        throw Rune.invalidAction();
      }
      game.allPlayers[playerId].animal = chosenAnimal;
      game.animalsChosen.push(chosenAnimal);
      game.playersReady.push({[chosenAnimal]: playerId})
    },
    spinBottle: (_, {game, playerId} ) => {
      // Determine random kissee

        const players = game.allPlayers;
        const playerKeys = Object.keys(players)
        const playerKeysWithoutKisser = playerKeys.filter(el => el !== playerId);
        let randomPlayer = playerKeysWithoutKisser[Math.floor(Math.random() * playerKeysWithoutKisser.length)];

        while (players[randomPlayer].isDead) {
          randomPlayer = playerKeysWithoutKisser[Math.floor(Math.random() * playerKeysWithoutKisser.length)];
        }
        
          game.allPlayers[randomPlayer].isDead = true;
          game.playersLeft--;

      // Check to see if any player is a winner
      if (game.playersLeft < 2) {
        const losers = game.allPlayerIds.filter(id => game.allPlayers[id].isDead);
        const loserOne = losers[0];
        const loserTwo = losers[1];
        const loserThree = losers[2];
        const winner = game.allPlayerIds.filter(id => !game.allPlayers[id].isDead)[0];
        Rune.gameOver({
          players: {
            [winner]: "WON",
          [loserOne]: "LOST",
            [loserTwo]: "LOST",
            [loserThree]: "LOST",
          }
        })
      }
      
      // Use turnOrder array to establish next player's turn
      const slicedTurnOrder = game.turnOrder.slice(1);
      game.turnOrder = [...slicedTurnOrder, game.turnOrder[0]];


      // If player is dead...
        while (game.allPlayers[game.turnOrder[0]].isDead) {
          // Go to next player
          const slicedTurnOrder = game.turnOrder.slice(1);
          game.turnOrder = [...slicedTurnOrder, game.turnOrder[0]];
        }
    },
  },
    // STRETCH GOAL
    // useBomb: ({ game, playerId }) => {
    //   if (!game.allPlayers[playerId].isDead) {
    //     game.allPlayers[playerId].isUsingBomb = true;
    //     game.allPlayers[playerId].hasMadeBombDecision = true;
    //   }
    // },
    // dontUseBomb: ({ game, playerId }) => {
    //   if (!game.allPlayers[playerId].isDead) {
    //     game.allPlayers[playerId].hasMadeBombDecision = true;
    //   }
    // },
  events: {
    playerJoined: () => {
      // Handle player joined
    },
    playerLeft() {
      // Handle player left
    },
  },
})