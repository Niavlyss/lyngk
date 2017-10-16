"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var listePiece = [];


    this.placer = function (pionColor, inter) {
        var piece = new Lyngk.Piece;
        listePiece.push(piece.setColor(pionColor));
        inter.setColor(pionColor);
        if (inter.getState() === Lyngk.State.VACANT) {
            inter.setState(Lyngk.State.ONE_PIECE);
        } else if (inter.getState() === Lyngk.State.ONE_PIECE) {
            inter.setState(Lyngk.State.STACK);
        } else if (listePiece.length === 5) {
            inter.setState(Lyngk.State.FULL_STACK);
        }
    }

    this.initPartie = function () {
        var colones = "ABCDEFGHI";
        var coord;
        var inter;
        var result;

        var colorDispo = [8, 8, 8, 8, 8, 3];


        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                coord = new Lyngk.Coordinates(colones[i], j + 1);
                if (coord.coordVal() === true) {
                    inter = new Lyngk.Intersection(coord);

                    var randColor;
                    do {
                        randColor = Math.floor(Math.random() * 6);
                    } while (colorDispo[randColor] <= 0);
                    colorDispo[randColor]--;

                    this.placer(randColor, inter);
                    if (inter.getState() === Lyngk.State.ONE_PIECE) {
                        result = true;
                    } else {
                        result = false;
                    }
                }
            }
        }

        return {
            res: result, tab: colorDispo
        };
    }
};