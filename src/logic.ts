import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface CompPlayer {
  isUsingBomb: boolean
  isDead: boolean
}

export interface Player {
  id: string
  isUsingBomb: boolean
  isDead: boolean
}

export interface GameState {
  allPlayerIds: string[]
  allComps: Array<CompPlayer>
  allPlayers: Array<Player>
  turnOrder: string[]
  count: number
  gameOver: boolean
}

type GameActions = {
  increment: (params: { amount: number }) => void
  spinBottle: (params: {game: GameState, playerId: string}) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function getCount(game: GameState) {
  return game.count
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (allPlayerIds: string[]): GameState => ({
    allPlayerIds,
    // array of all computer players AKA bots
    allComps: (Array(12 - allPlayerIds.length) 
      .fill('comp')
      .map((element, i) => `${element}${i}`)
      // TODO: perhaps add other properties to comp objects
      .reduce((acc, curr) => ({...acc, [curr]: {isUsingBomb: false, isDead: false}}), {}) as Array<CompPlayer>),
    turnOrder: [
      ...allPlayerIds,
      ...Array(12 - allPlayerIds.length)
        .fill('comp')
        .map((element, i) => `${element}${i}`)
    ]
      .map((value: string) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value),
    allPlayers: allPlayerIds.map(element => ({id: element, isUsingBomb: false, isDead: false})),
    count: 0,
    gameOver: false,
  }),
  actions: {
    increment: ({ amount}, { game }) => {
      game.count += amount
    },
    spinBottle: ({ game, playerId } ) => {
        if (playerId !== game.turnOrder[0]) {
          throw Rune.invalidAction()
        }
        
  
        // players all have objects that say if they are dead or using bomb √
        // take turn
        //everyone decide if they are using a bomb (comps random 50/50)
        //once everyone decides (there should eventually be a timer), the bottle spins
        //randomly select player from turnOrder list
        // if playerId matches playerId selected for kiss, check if isUsingBomb is true. 
        //if so, kisser isDead: true. If isUsingBomb: false, kissed isDead: true. 
        //If unkissed isUsingBomb: true, then their isDead = true
        // All player with isDead: true are eliminated.
        // 1. if there are no more people players left game over and no one wins.
        // 2. If there is one person and no more computers left, that person wins!
        // If neither 1 or 2 are true, splice dead players from turnOrder array and continue.
        // Change turnOrder so the next person is at the front of the queue √
      
      const slicedTurnOrder = game.turnOrder.slice(1);
      game.turnOrder = [...slicedTurnOrder, game.turnOrder[0]]
    }
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
