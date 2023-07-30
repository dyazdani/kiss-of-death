import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import { Players } from "rune-games-sdk/multiplayer"
import PlayerCircle from "./components/PlayerCircle.tsx"
import Avatar from "./components/Avatar.tsx"
import TurnArrows from "./components/TurnArrows.tsx"
import kiss from "./assets/kiss.mp3"
import backgroundMusic from "./assets/background-music.mp3"
import ChooseAnimal from "./components/ChooseAnimal.tsx"


function App() {
  const [game, setGame] = useState<GameState>()
  const [myPlayerId, setMyPlayerId] = useState("")
  const [players, setPlayers] = useState<Players>({})
  const [hasMusicStarted, setHasMusicStarted] = useState(false)

  useEffect(() => {
      Rune.initClient({
        onChange: ({ action, newGame, yourPlayerId, players }) => {
          if (action && action.action === 'spinBottle') {
            const kissSound = new Audio(kiss);
            const startKiss = () => {
              kissSound.play();
            }
            startKiss();
          }

          if (!hasMusicStarted && newGame.playersReady.length === 4) {
            const music = new Audio(backgroundMusic)
            const startMusic = () => {
              music.play();
            }
            startMusic();
            setHasMusicStarted(true);
          }

          setGame(newGame)
          setPlayers(players)

          if (yourPlayerId) {
            setMyPlayerId(yourPlayerId)
          }
          }
      })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Kiss of Death</h1>
      <TurnArrows 
        player1={players[game.allPlayerIds[0]].playerId}
        player2={players[game.allPlayerIds[1]].playerId}
        player3={players[game.allPlayerIds[2]].playerId}
        player4={players[game.allPlayerIds[3]].playerId}
        playersReady={game.playersReady.length}
        currentTurnPlayer={game.turnOrder[0]}/>
      <div className="avatar-wrapper">
        <Avatar 
          avatarUrl={`${players[game.allPlayerIds[0]].avatarUrl}`} 
          playerName={`${players[game.allPlayerIds[0]].displayName}`}
          animal={`${game.allPlayers[game.allPlayerIds[0]].animal}`}
        />      
        <Avatar 
          avatarUrl={`${players[game.allPlayerIds[1]].avatarUrl}`}  
          playerName={`${players[game.allPlayerIds[1]].displayName}`}
          animal={`${game.allPlayers[game.allPlayerIds[1]].animal}`}
        />
        <Avatar 
          avatarUrl={`${players[game.allPlayerIds[2]].avatarUrl}`} 
          playerName={`${players[game.allPlayerIds[2]].displayName}`}
          animal={`${game.allPlayers[game.allPlayerIds[2]].animal}`}
        />
        <Avatar 
          avatarUrl={`${players[game.allPlayerIds[3]].avatarUrl}`} 
          playerName={`${players[game.allPlayerIds[3]].displayName}`}
          animal={`${game.allPlayers[game.allPlayerIds[3]].animal}`}
        />
      </div>
      <PlayerCircle 
        allPlayersObject={game.allPlayers} 
        player1={players[game.allPlayerIds[0]].playerId}
        player2={players[game.allPlayerIds[1]].playerId}
        player3={players[game.allPlayerIds[2]].playerId}
        player4={players[game.allPlayerIds[3]].playerId}/>
      <div className="circle-wrapper">
        <ChooseAnimal 
          circleDeg="45" 
          isDisabled={
            game.allPlayers[myPlayerId].animal === "black-widow"
          } 
          animalName="black-widow"
        />
        <ChooseAnimal 
          circleDeg="135" 
          isDisabled={
            game.allPlayers[myPlayerId].animal === "king-cobra"
          } 
          animalName="king-cobra"
        />
        <ChooseAnimal 
          circleDeg="225"
          isDisabled={
            game.allPlayers[myPlayerId].animal === "komodo-dragon"
          }  
          animalName="komodo-dragon"
        />
        <ChooseAnimal 
          circleDeg="315" 
          isDisabled={
            game.allPlayers[myPlayerId].animal === "poison-dart-frog"
          } 
          animalName="poison-dart-frog"
        />
      </div>
        <button
          type="button" 
          onClick={() => {
            Rune.actions.handleReadyButtonClick(myPlayerId);
          }}
          disabled={game.playersReady.includes(myPlayerId)}
          className={`green ${game.playersReady.length < 4 ? "" : "hidden"}`}
      >
        START!
      </button>
      <button 
        className={`spin-bottle ${game.playersReady.length === 4 && myPlayerId === game.turnOrder[0] ? "" : "hidden"}`}
        disabled={
          myPlayerId !== game.turnOrder[0] || game.allPlayers[myPlayerId].isDead
        } 
        type="button" 
        onClick={() => {
          Rune.actions.spinBottle(myPlayerId);
        }}
        ></button>
        <p className={`bottle-paragraph ${game.playersReady.length === 4 && myPlayerId === game.turnOrder[0] ? "" : "hidden"}`}>Spin the bottle 💋</p>
    </>
  )
}

export default App
