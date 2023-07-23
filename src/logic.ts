import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface PlayerObject {
  Player: { 
    hasMadeBombDecision: boolean
    isUsingBomb: boolean
    isDead: boolean
  }
}

export interface GameState {
  allPlayerIds: string[]
  allComps: PlayerObject
  allPlayers: PlayerObject
  allPlayersAndComps: PlayerObject
  turnOrder: string[]
  kissee: string
  count: number
  gameOver: boolean
}

type GameActions = {
  increment: (params: { amount: number }) => void
  spinBottle: (params: {game: GameState, playerId: string}) => void
  useBomb: (params: {game: GameState, playerId: string}) => void
  dontUseBomb: (params: {game: GameState, playerId: string}) => void
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
    // object with of all computer players AKA bots as objects
    allComps: (Array(12 - allPlayerIds.length) 
      .fill('comp')
      .map((element, i) => `${element}${i}`)
      // TODO: perhaps add other properties to comp objects
      .reduce((acc, curr) => ({
        ...acc, [curr]: {
          hasMadeBombDecision: false, 
          isUsingBomb: false, 
          isDead: false
        }
      }), {} as PlayerObject)),
    turnOrder: [
      ...allPlayerIds,
      ...Array(12 - allPlayerIds.length)
        .fill('comp')
        .map((element, i) => `${element}${i}`)
    ]
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
      }), {} as PlayerObject),
      allPlayersAndComps: [
        ...allPlayerIds,
        ...Array(12 - allPlayerIds.length)
        .fill('comp')
        .map((element, i) => `${element}${i}`)
      ]
      .reduce((acc, curr) => ({
        ...acc, [curr]: {
          hasMadeBombDecision: false, 
          isUsingBomb: false, 
          isDead: false}
      }), {} as PlayerObject),
    kissee: "",
    count: 0,
    gameOver: false,
  }),
  actions: {
    increment: ({ amount}, { game }) => {
      game.count += amount
    },
    spinBottle: ( { game, playerId } ) => {
        // Cannot spin bottle if not your turn
        if (playerId !== game.turnOrder[0]) {
          throw Rune.invalidAction()
        }
        
        // Determine random kissee
        const players = game.allPlayersAndComps;
        const playersKeys = Object.keys(players);
        const randomPlayersArray = playersKeys[Math.floor(Math.random() * playersKeys.length)];
        for (let i = 0; i < randomPlayersArray.length; i++) {
          if (!players[randomPlayersArray[i] as keyof PlayerObject].isDead) {
            game.kissee = randomPlayersArray[i];
            break;
          }
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
    },
    useBomb: ({ game, playerId }) => {
      if (!game.allPlayers[playerId as keyof PlayerObject].isDead) {
        game.allPlayers[playerId as keyof PlayerObject].isUsingBomb = true;
        game.allPlayers[playerId as keyof PlayerObject].hasMadeBombDecision = true;
      }
    },
    dontUseBomb: ({ game, playerId }) => {
      if (!game.allPlayers[playerId as keyof PlayerObject].isDead) {
        game.allPlayers[playerId as keyof PlayerObject].hasMadeBombDecision = true;
      }
    },
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