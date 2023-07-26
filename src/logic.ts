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

export interface PlayersAndCompsObject {
  allPlayers: PlayersObject
  allComps: PlayersObject
}

export interface GameState {
  allPlayerIds: string[]
  allPlayersAndComps: PlayersAndCompsObject
  turnOrder: string[]
  kissee: string
  count: number
  gameOver: boolean
  playersLeft: number
}

type GameActions = {
  increment: (params: { amount: number }) => void
  spinBottle: (myPlayerId: string) => void
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
    turnOrder: [
      ...allPlayerIds,
      ...Array(12 - allPlayerIds.length)
        .fill('comp')
        .map((element, i) => `${element}${i}`)
    ]
      .map((value: string) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value),
      allPlayersAndComps: {
        // An object with player objects
        allPlayers: allPlayerIds
          .reduce((acc, curr) => ({
          ...acc, [curr]: {
            hasMadeBombDecision: false, 
            isUsingBomb: false, 
            isDead: false}
          }), {}),
        // object with of all computer players AKA bots as objects
        allComps: (Array(12 - allPlayerIds.length) 
          .fill('comp')
          .map((element, i) => `${element}${i}`)
          .reduce((acc, curr) => ({
            ...acc, [curr]: {
              hasMadeBombDecision: false, 
              isUsingBomb: false, 
              isDead: false
            }
          }), {}))
      },
    kissee: "",
    count: 0,
    gameOver: false,
    playersLeft: 4
  }),
  actions: {
    increment: ({ amount}, { game }) => {
      game.count += amount
    },
    spinBottle: (myPlayerId, {game, playerId} ) => {
      // Cannot spin bottle if not your turn or dead
      // TODO: Gray out the button that does this action
      if (playerId !== game.turnOrder[0] || game.allPlayersAndComps.allPlayers[playerId].isDead) {
        throw Rune.invalidAction()
      }
      
      // Determine random kissee
      const players = game.allPlayersAndComps.allPlayers;
      const comps = game.allPlayersAndComps.allComps;
      const allKeys = [...Object.keys(players), ...Object.keys(comps)]
      const randomPlayerOrComp = allKeys[Math.floor(Math.random() * allKeys.length)];

      game.kissee = randomPlayerOrComp;
      console.log(myPlayerId)

    },

    //   //Make into separate functions
    //   // Mark kissee as as dead
    //   if (players[kissee]) {
    //     const gameWithNewDeadPlayer = game;
    //     gameWithNewDeadPlayer.allPlayersAndComps.allPlayers[kissee].isDead = true;
    //       setGame(gameWithNewDeadPlayer);
    //       game.playersLeft--;
    //     } else {
    //     game.allPlayersAndComps.allPlayers[kissee].isDead = true;
    //     game.playersLeft--;
    //   }

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
  },
  events: {
    playerJoined: () => {
      // Handle player joined
    },
    playerLeft() {
      // Handle player left
    },
  },
})