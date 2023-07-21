import type { RuneClient } from "rune-games-sdk/multiplayer"

export interface GameState {
  allPlayerIds: string[]
  playersSpunThisRound: string[]
  currentTurnPlayer: string
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
    playersSpunThisRound: [],
    currentTurnPlayer: [
      ...allPlayerIds,
      ...Array(12 - allPlayerIds.length)
        .fill('comp')
        .map((el, i) => `${el}${i}`)
    ]
      .map((value: string) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)[0],
    count: 0,
    gameOver: false,
  }),
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    spinBottle: ({ game, playerId } ) => {
      if (playerId !== game.currentTurnPlayer)
        throw Rune.invalidAction()
    
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
