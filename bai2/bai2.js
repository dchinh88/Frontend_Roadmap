
var modal = document.getElementById('myModal');
var grid = new Array(3);
grid[0] = new Array(3);
grid[1] = new Array(3);
grid[2] = new Array(3);
var player = 1;
var gameWon = 0;

function checkWin(playerNum) {
    //NGANG
    for (i = 0; i < 3; i++) {
        if ((grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2]) && grid[i][0] != undefined && grid[i][1] != undefined && grid[i][2] != undefined) {
            console.log('horizontal won');
            return true;
        }
    }
    //DOC
    for (i = 0; i < 3; i++) {
        console.log('i is: ' + i);
        console.log('grid[' + i + '][0] is ' + grid[i][0]);
        console.log('grid[' + i + '][1] is ' + grid[i][1]);
        console.log('grid[' + i + '][2] is ' + grid[i][2]);
        if ((grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i]) && grid[0][i] != undefined && grid[1][i] != undefined && grid[2][i] != undefined) {
            console.log('vertical won');
            return true;
        }
    }
    //CHEO
    if (((grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) || (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0])) && grid[1][1] !== undefined) {
        console.log('diagonal won');
        return true;
    }
    //HOA
    var tieGame = true;
    for (var i = 0; i < 3; i++) {
        for (var x = 0; x < 3; x++) {
            if (grid[i][x] == null && grid[i][x] == undefined) {
                tieGame = false;
            }
        }
    }
    if (tieGame == true) {
        endgame(0);
    }
    return false;
}

function checkLegalMove(row, column) {
    console.log(grid[row][column]);
    if (grid[row][column] !== undefined && grid[row][column] !== null) {
        return false;
    } else {
        return true;
    }
}
function endgame(num) {
    if (num == 0) {
        $('.modal_text').html('Hòa!');
        $('#myModal').css('display', 'block');
    }
    if (num == 1) {
        $('.modal_text').html('Play X Win!');
        $('#myModal').css('display', 'block');
    }
    if (num == 2) {
        $('.modal_text').html('Play O Win!');
        $('#myModal').css('display', 'block');
    }
}


$('#square_one_text').click(() => {
    console.log('clicked');
    if (checkLegalMove(0, 0) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của O')
            $('#square_one_text button').html('X');
            grid[0][0] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_one_text button').html('O');
            grid[0][0] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#square_two_text').click(() => {
    if (checkLegalMove(0, 1) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của O')
            $('#square_two_text button').html('X');
            grid[0][1] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_two_text button').html('O');
            grid[0][1] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#square_three_text').click(() => {
    if (checkLegalMove(0, 2) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của O')
            $('#square_three_text button').html('X');
            grid[0][2] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_three_text button').html('O');
            grid[0][2] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#square_four_text').click(() => {
    if (checkLegalMove(1, 0) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của O')
            $('#square_four_text button').html('X');
            grid[1][0] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_four_text button').html('O');
            grid[1][0] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#square_five_text').click(() => {
    if (checkLegalMove(1, 1) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của O')
            $('#square_five_text button').html('X');
            grid[1][1] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_five_text button').html('O');
            grid[1][1] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#square_six_text').click(() => {
    if (checkLegalMove(1, 2) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của O')
            $('#square_six_text button').html('X');
            grid[1][2] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_six_text button').html('O');
            grid[1][2] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#square_seven_text').click(() => {
    if (checkLegalMove(2, 0) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của O')
            $('#square_seven_text button').html('X');
            grid[2][0] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_seven_text button').html('O');
            grid[2][0] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#square_eight_text').click(() => {
    if (checkLegalMove(2, 1) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của O')
            $('#square_eight_text button').html('X');
            grid[2][1] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_eight_text button').html('O');
            grid[2][1] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#square_nine_text').click(() => {
    if (checkLegalMove(2, 2) == true) {
        if (player == 1) {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_nine_text button').html('X');
            grid[2][2] = 'X';
            if (checkWin(1) == true) {
                endgame(1);
            }
            player = 2;
        } else {
            $('.luotchoi').html('Lượt chơi của X')
            $('#square_nine_text button').html('O');
            grid[2][2] = 'O';
            if (checkWin(2) == true) {
                endgame(2);
            }
            player = 1;
        }
    }
});

$('#restartBtn').click(() => {
    grid = new Array(3);
    grid[0] = new Array(3);
    grid[1] = new Array(3);
    grid[2] = new Array(3);
    player = 1;
    gameWon = 0;
    $('.luotchoi').html('Lượt chơi của X')
    $('#square_one_text button').html('');
    $('#square_two_text button').html('');
    $('#square_three_text button').html('');
    $('#square_four_text button').html('');
    $('#square_five_text button').html('');
    $('#square_six_text button').html('');
    $('#square_seven_text button').html('');
    $('#square_eight_text button').html('');
    $('#square_nine_text button').html('');
    modal.style.display = 'none';
})