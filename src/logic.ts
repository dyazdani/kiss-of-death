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
      hasMadeBombDecision: boolean
      isUsingBomb: boolean
      isDead: boolean
  }
}

export interface GameState {
  allPlayerIds: string[]
  allPlayers: PlayersObject
  turnOrder: string[]
  kissee: string
  playersReady: string[]
  count: number
  gameOver: boolean
  playersLeft: number
}

type GameActions = {
  increment: (params: { amount: number }) => void
  spinBottle: (myPlayerId: string) => void
  handleReadyButtonClick: (myPlayerId: string) => void
  // useBomb: (params: {game: GameState, playerId: string}) => void
  // dontUseBomb: (params: {game: GameState, playerId: string}) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function getCount(game: GameState) {
  return game.count
}

Rune.initLogic({
  minPlayers: 4,
  maxPlayers: 4,
  setup: (allPlayerIds: string[]): GameState => ({
    allPlayerIds,
    turnOrder: allPlayerIds
      .map((value: string) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value),
        // An object with player objects
        allPlayers: allPlayerIds
          .reduce((acc, curr) => ({
          ...acc, [curr]: {
            hasMadeBombDecision: false, 
            isUsingBomb: false, 
            isDead: false}
          }), {}),
    playersReady: [],
    kissee: "",
    count: 0,
    gameOver: false,
    playersLeft: 4
  }),
  actions: {
    increment: ({ amount}, { game }) => {
      game.count += amount
    },
    spinBottle: (myPlayerId, {game} ) => {
      // Determine random kissee
      const setKissee = () => {
        const players = game.allPlayers;
        const playerKeys = Object.keys(players)
        let randomPlayer = playerKeys[Math.floor(Math.random() * playerKeys.length)];

        while (!game.kissee) { 
            if (!players[randomPlayer].isDead) { // if player is not dead
              game.allPlayers[randomPlayer].isDead = true;
              game.playersLeft--;
              game.kissee = randomPlayer
              console.log("kissee changed to: ", game.kissee)
            } else { // or if they are dead
              randomPlayer = playerKeys[Math.floor(Math.random() * playerKeys.length)];
            }
        }
      }

      setKissee();
      game.kissee = "";
    },
    handleReadyButtonClick: (myPlayerId, {game}) => {
      game.playersReady.push(myPlayerId);
    },
  },
    //   //Make into separate functions
     
    //   // Check to see if any player is a winner
    //   if (game.playersLeft === 1) {
    //     const losers = game.allPlayerIds.filter(id => game.allPlayersAndComps.allPlayers[id].isDead);
    //     const winner = game.allPlayerIds.filter(id => !game.allPlayersAndComps.allPlayers[id].isDead)[0];
    //     Rune.gameOver({
    //       players: {
    //         [winner]: "WON",
    //         [losers[0]]: "LOST",
    //         [losers[1]]: "LOST",
    //         [losers[3]]: "LOST",
    //       }
    //     })
    //   }

      

    //   // Use turnOrder array to establish next player's turn
    //   const slicedTurnOrder = game.turnOrder.slice(1);
    //   game.turnOrder = [...slicedTurnOrder, game.turnOrder[0]];

    //   // If the player with the next turn is in the allPlayers object
    //   if (game.allPlayersAndComps.allPlayers[game.turnOrder[0]]) {
    //     // And if that player is dead...
    //     if (game.allPlayersAndComps.allPlayers[game.turnOrder[0]].isDead) {
    //       // Remove them from the turOrder array
    //       game.turnOrder = game.turnOrder.slice(1);
    //     }
    //   }

    //   // If the player with the next turn is in the allComps object
    //   if (game.allPlayersAndComps.allComps[game.turnOrder[0]]) {
    //     // And if that player is dead...
    //     if (game.allPlayersAndComps.allComps[game.turnOrder[0]].isDead) {
    //       // Remove them from the turOrder array
    //       game.turnOrder = game.turnOrder.slice(1);
    //     }
    //   }
     
    // },

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