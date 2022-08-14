import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }


  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
        die :
        generateNewDie()
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  const newGame = () => { 
    setDice(allNewDice())
    setTenzies(false)
  }

  return (
    <div className="container">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies骰子遊戲</h1>
        <p className="instructions">點擊數字相同的骰子，全部的骰子數字相同則獲勝</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button
          className="roll-dice"
          onClick={tenzies ? newGame : rollDice}
        >
          {tenzies ? "開新局" : "換一批"}
        </button>
      </main>
    </div>
  )
}