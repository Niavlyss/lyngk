"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Joueurs = {Player1 : 0, Player2 : 1};

Lyngk.Engine = function () {
    var listInter = [];

    var actualPlayer;

    var colorsPlayer1 = [];
    var colorsPlayer2 = [];

    var scoreJ1 = 0;
    var scoreJ2 = 0;

    var initGame = function () {
        actualPlayer = Lyngk.Joueurs.Player1;
        var goodCoordinates = Lyngk.coordValables;
        for(var i=0; i<goodCoordinates.length; i++){
            listInter[goodCoordinates[i]]=new Lyngk.Intersection();
        }
        init_one_piece_all();
    };



    var init_one_piece_all = function () {
        var availableColors = [8, 8, 8, 8, 8, 3];
        for(var coordinates in listInter){
            if(listInter.hasOwnProperty(coordinates)) {
                var randColor;
                do {
                    randColor = Math.floor(Math.random() * 6);
                } while (availableColors[randColor] <= 0);
                availableColors[randColor]--;
                listInter[coordinates].placer(randColor);
            }
        }
    };


    this.plate = function () {
        return listInter;
    };

    this.move = function (piece1, piece2) {
        var p1 = new Lyngk.Coordinates(piece1[0],parseInt(piece1[1]));
        var p2 = new Lyngk.Coordinates(piece2[0],parseInt(piece2[1]));

        if(p1.coordinatesVal() && p2.coordinatesVal()) {
            if(listInter[p2].getState() !== Lyngk.State.VACANT &&
                validMove(p1,p2)) {
                var stack = listInter[p1].remove();
                for(var i =0; i<stack.length;i++){
                    listInter[p2].placer(stack[i].getColor());
                }
                this.checkState(p2);
                changePLayer();
            }
        }
    };

    function checkHeight(piece1, piece2) {
        var testFlag;
        if (listInter[piece1].getHauteur() === 0
            || listInter[piece2].getHauteur() === 0)
            testFlag = false;
        return testFlag;
    }

    function checkPieceState(piece1) {
        var testFlag;
        if (listInter[piece1].getState() === Lyngk.State.FULL_STACK)
            testFlag = false;
        return testFlag;
    }

    function checkBothStackState(piece1, piece2) {
        var testFlag;
        if (listInter[piece1].getState() === Lyngk.State.ONE_PIECE
            && listInter[piece2].getState() === Lyngk.State.STACK)
            testFlag = false;
        return testFlag;
    }

    function checkBothHeight(piece1) {
        var testFlag;
        if (listInter[piece1].getHauteur() < listInter[piece1].getHauteur())
            testFlag = false;
        return testFlag;
    }

    function checkHeightColor(piece1) {
        var testFlag;
        var listP1 = listInter[piece1].getPieces();
        var tabCpt = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < listP1.length; i++) {
            if (listP1[i].getColor() === Lyngk.Color.BLACK) {
                tabCpt[0]++;
            } else if (listP1[i].getColor() === Lyngk.Color.BLUE) {
                tabCpt[1]++;
            } else if (listP1[i].getColor() === Lyngk.Color.RED) {
                tabCpt[2]++;
            } else if (listP1[i].getColor() === Lyngk.Color.GREEN) {
                tabCpt[3]++;
            } else if (listP1[i].getColor() === Lyngk.Color.IVORY) {
                tabCpt[4]++;
            } else if (listP1[i].getColor() === Lyngk.Color.WHITE) {
                tabCpt[5]++;
            }
        }
        for (var j = 0; j < tabCpt.length; j++) {
            if (j >= 0 && j < 5) {
                if (tabCpt[j] > 1) {
                    testFlag = false;
                }
            } else if (j === 5) {
                if (tabCpt[j] > 3) {
                    testFlag = false;
                }
            }
        }
        return testFlag;
    }

    function checkPlayerColorStack(piece1) {
        var testFlag;
        if (actualPlayer === Lyngk.Joueurs.Player1) {
            if (colorsPlayer2.indexOf(listInter[piece1].getColor()) >= 0)
                testFlag = false;

            if (colorsPlayer1.length === 0 &&
                listInter[piece1].getColor() === Lyngk.Color.WHITE)
                testFlag = false;
        } else {
            if (colorsPlayer1.indexOf(listInter[piece1].getColor()) >= 0)
                testFlag = false;

            if (colorsPlayer2.length === 0 &&
                listInter[piece1].getColor() === Lyngk.Color.WHITE)
                testFlag = false;
        }
        return testFlag;
    }

    var validMove = function (piece1,piece2) {
        var testFlag = false;
        if(moveUpDown(piece1,piece2) || moveLeft(piece1,piece2)
            || moveRight(piece1,piece2)){
            testFlag = true;
        }

        if(diffColumn(piece1,piece2) === false ){
            testFlag = false;
        }

        if(checkHeight(piece1, piece2) || checkPieceState(piece1) ||
            checkBothStackState(piece1, piece2) ||  checkBothHeight(piece1)) {
            testFlag = false;
        }


        if(checkHeightColor(piece1) === false) {
            testFlag = false;
        }

        if(checkPlayerColorStack(piece1) === false){
            testFlag = false;
        }

        return testFlag;

    };

    var diffColumn = function (piece1,piece2) {
        var testFlag;
        var diffColumns = (piece1.getColumn().charCodeAt(0))
            - (piece2.getColumn().charCodeAt(0));

        if (diffColumns > 1 || diffColumns < -1) {
            testFlag = false;
        }
        return testFlag;
    }

    var moveUpDown = function (p1,p2){
        var testFlag = false;
        var move;
        if(p1.getColumn().charCodeAt(0) === p2.getColumn().charCodeAt(0)) {
            move = p1.getLine() - p2.getLine();
            if(move === 1 || move === -1){
                testFlag = true;
            }
        }
        return testFlag;
    };

    var moveLeft = function (p1,p2) {
        var testFlag = false;
        var move;
        if (p1.getColumn().charCodeAt(0) < p2.getColumn().charCodeAt(0)) {
            move = p1.getLine() - p2.getLine();
            if (move === 0 || move === -1) {
                testFlag = true;
            }
        }
        return testFlag;
    };

    var moveRight = function (p1,p2) {
        var testFlag = false;
        var move;
        if(p1.getColumn().charCodeAt(0) > p2.getColumn().charCodeAt(0)){
            move = p1.getLine() - p2.getLine();
            if(move === 1 || move === 0){
                testFlag = true;
            }
        }
        return testFlag;
    };



    var changePLayer = function()
    {
        if(actualPlayer === Lyngk.Joueurs.Player1)
            actualPlayer = Lyngk.Joueurs.Player2;
        else
            actualPlayer = Lyngk.Joueurs.Player1;
    };


    this.getActualPlayer = function (){
        return actualPlayer;
    };

    this.getPlayerColors = function (player){
        if(player === Lyngk.Joueurs.Player1){
            return colorsPlayer1;
        }else{
            return colorsPlayer2;
        }
    };

    this.claimColor = function (color){
        if(colorsPlayer1.indexOf(color) < 0 &&
            colorsPlayer2.indexOf(color) < 0) {
            if(actualPlayer === Lyngk.Joueurs.Player1){
                if(colorsPlayer1.length < 2)
                    colorsPlayer1.push(color);
            }else{
                if(colorsPlayer2.length < 2)
                    colorsPlayer2.push(color);
            }
        }
    };

    this.getScore = function(player){
        if(player === Lyngk.Joueurs.Player1)
            return scoreJ1;
        else
            return scoreJ2;
    };


    this.nbOfPieces = function (){
        var nbPieces = 0;
        for(var coordinates in listInter){
            nbPieces += listInter[coordinates].getHauteur();
        }
        return nbPieces;
    };

    this.checkState = function (lastDone)
    {
        var color = listInter[lastDone].getColor();
        if(listInter[lastDone].getState() === Lyngk.State.FULL_STACK &&
            this.getPlayerColors(actualPlayer).indexOf(color) >= 0) {
            if(actualPlayer === Lyngk.Joueurs.Player1)
                scoreJ1++;
            else
                scoreJ2++;

            listInter[lastDone].remove();
        }
    };




    this.onePieceFull = function()
    {
        for (var coordinates in listInter) {
            if (listInter.hasOwnProperty(coordinates))
            {
                if(listInter[coordinates].getState() !== Lyngk.State.ONE_PIECE)
                    return false;
            }
        }
        return true;
    };


    initGame();
};