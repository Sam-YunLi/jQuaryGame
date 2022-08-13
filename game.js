var player1 = prompt("Player 1, what is your name?");
var player1Color = 'rgb(86, 151, 255)';
var player2 = prompt("Player 2, what is your name?");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, columnNum) {
  console.log("You won starting at this row, column");
  console.log(rowNum);
  console.log(columnNum);
}

function changeColor(rowIndex, columnIndex, color) {
  return table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, columnIndex) {
  return table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }
}

function colorMatch(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var column = 0; column < 4; column++) {
      if (colorMatch(returnColor(row, column), returnColor(row, column + 1), returnColor(row, column + 2), returnColor(row, column + 3))) {
        console.log('horizontal');
        reportWin(row, column);
        return true;
      } else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for (var column = 0; column < 7; column++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatch(returnColor(row, column), returnColor(row + 1, column), returnColor(row + 2, column), returnColor(row + 3, column))) {
        console.log('vertical');
        reportWin(row, column);
        return true;
      } else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  for (var column = 0; column < 5; column++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatch(returnColor(row, column), returnColor(row + 1, column + 1), returnColor(row + 2, column + 2), returnColor(row + 3, column + 3))) {
        console.log('diagonal');
        reportWin(row, column);
        return true;
      } else if (colorMatch(returnColor(row, column), returnColor(row - 1, column + 1), returnColor(row - 2, column + 2), returnColor(row - 3, column + 3))) {
        console.log('diagonal');
        reportWin(row, column);
        return true;
      } else {
        continue;
      }
    }
  }
}

// game logic
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(currentName + " it is your turn, pick a column to drop your chip.");

$('.board button').on('click', function() {
  var column = $(this).closest('td').index();
  var bottomAvail = checkBottom(column);
  changeColor(bottomAvail, column, currentColor);
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName + " you have won!");
    $('h2').fadeOut('fast');
    $('h3').fadeOut('fast');
  }
  currentPlayer = currentPlayer * -1;
  if (currentPlayer === 1) {
    currentName = player1;
    currentColor = player1Color;
  } else {
    currentName = player2;
    currentColor = player2Color;
  }
  $('h3').text(currentName + " it is your turn.").fadeIn('fast');
})