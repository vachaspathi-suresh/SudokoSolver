let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let seli = -1;
let selj = -1;
let originalBoard = board;
const updateTable = () => {
  var table = document.getElementById("board");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] < 1 || board[i][j] > 9)
        table.rows[i].cells[j].innerHTML = null;
      else table.rows[i].cells[j].innerHTML = board[i][j];
    }
  }
};

const isValid = (r, c) => {
  for (let i = 0; i < 9; i++) {
    if (
      (i !== r && board[r][c] === board[i][c]) ||
      (i !== c && board[r][c] === board[r][i])
    ) {
      return false;
    }
  }
  var rb = parseInt(r / 3);
  var cb = parseInt(c / 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        (r % 3 !== i || c % 3 !== j) &&
        board[r][c] === board[rb * 3 + i][cb * 3 + j]
      ) {
        return false;
      }
    }
  }
  return true;
};

const checkBoard = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!isValid(i, j) || board[i][j] === 0) return false;
    }
  }
  return true;
};

const loadNew = () => {
  board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  for (let i = 0; i < 20; i++) {
    pos = Math.floor(Math.random() * 81);
    r = Math.floor(pos / 9);
    c = pos % 9;
    if (board[r][c] !== 0) {
      i--;
      continue;
    }
    let val = Math.floor(Math.random() * 9) + 1;
    board[r][c] = val;
    while (!isValid(r, c, board)) {
      val = Math.floor(Math.random() * 9) + 1;
      board[r][c] = val;
    }
  }
  var table = document.getElementById("board");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      originalBoard[i][j] = board[i][j];
      if (board[i][j] < 1 || board[i][j] > 9) {
        table.rows[i].cells[j].innerHTML = null;
        table.rows[i].cells[j].classList.remove("given");
        table.rows[i].cells[j].onclick = () => {
          seli = i;
          selj = j;
          document.getElementById("backdrop").classList.remove("hide");
        };
      } else {
        table.rows[i].cells[j].innerHTML = board[i][j];
        table.rows[i].cells[j].classList.add("given");
      }
    }
  }
};

const solveIt = () => {
  var isFull = true;
  var r = -1;
  var c = -1;
  for (let i = 0; i < 9 && isFull; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        r = i;
        c = j;
        isFull = false;
        break;
      }
    }
  }
  if (isFull) {
    return isFull;
  }
  for (let i = 1; i < 10; i++) {
    var temp = board[r][c];
    board[r][c] = i;
    if (!isValid(r, c)) {
      board[r][c] = temp;
      continue;
    }
    if (solveIt()) {
      return true;
    } else {
      board[r][c] = 0;
    }
  }
  return false;
};

loadNew();

loadButton = document.getElementById("loadNew");
loadButton.onclick = () => location.reload();
solveButton = document.getElementById("solveIt");
solveButton.onclick = () => {
  board = originalBoard;
  solveIt();
  updateTable();
};
checkButton = document.getElementById("checkIt");
checkButton.onclick = () => {
  if (checkBoard()) {
    document.getElementById("message").children[0].innerHTML =
      "Successfully Solved";
    document
      .getElementById("message")
      .children[0].classList.remove("notsolved");
    document.getElementById("message").children[0].classList.add("solved");
  } else {
    document.getElementById("message").children[0].innerHTML = "Wrong Values";
    document.getElementById("message").children[0].classList.remove("solved");
    document.getElementById("message").children[0].classList.add("notsolved");
  }
};

let table = document.getElementById("board");

document.getElementById("backdrop").onclick = () => {
  document.getElementById("backdrop").classList.add("hide");
};

[...document.getElementsByClassName("row")].forEach((row, num1) => {
  [...row.children].forEach((buttonElement, num2) => {
    buttonElement.onclick = () => {
      if (seli !== -1 && selj !== -1) {
        table.rows[seli].cells[selj].innerHTML = num1 * 3 + num2 + 1;
        board[seli][selj] = num1 * 3 + num2 + 1;
        seli = -1;
        selj = -1;
      }
    };
  });
});
