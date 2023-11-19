const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector("[data-final-column]")
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')

// applying the rules of the game 
const SELECTIONS = [
    {
        name: "rock",
        emoji: "👊🏾",
        beats: "scissors"
    },
    {
        name: "paper",
        emoji: "🖐🏾",
        beats: "rock"
    },
    {
        name: "scissors",
        emoji: "✌🏾",
        beats: "paper"
    },
]
// the selection of how it will be done once clicked
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
       const selectionName = selectionButton.dataset.selection
       const selection = SELECTIONS.find(selection => selection.name === selectionName)
       makeSelection(selection)
    })
})

// determining who the winner is 
function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    console.log(computerSelection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)
// reason to pass computer selection first then yours selection second because we will insert the elements instead of adding to end, we will do it directly after the text computer (html) into the grid
// this will keep it in order and have it at the top of the list as oppose the bottom ; once it gets long you dont want to scroll to the bottom to see results 
    if (yourWinner) incremenetScore(yourScoreSpan)
   if (computerWinner) incremenetScore(computerScoreSpan)

}

// incrementing the scores for your and computer to show when game is played 


function incremenetScore(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
    // takes the score and parses an interger to that score add one to current score
    // add if statement inside makeSelection function so that if you win your score changes and if computer wins computer score changes 
}

// creating the draw
function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

// logic of showing the selection and who the winner is 
function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

// making computer do its own selection
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    // selecting between 0 1 & 2 ; indexed from array
    return SELECTIONS[randomIndex]
}



