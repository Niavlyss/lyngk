"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var listePiece= [];


    this.placer=function(pionColor,inter) {
        var piece=new Lyngk.Piece;
        listePiece.push(piece.setColor(pionColor));
        inter.setColor(pionColor);
        if(inter.getState()===Lyngk.State.VACANT){
            inter.setState(Lyngk.State.ONE_PIECE);
        }else if(inter.getState()===Lyngk.State.ONE_PIECE){
            inter.setState(Lyngk.State.STACK);
        }else if(listePiece.length===5){
            inter.setState(Lyngk.State.FULL_STACK);
        }
    }



    this.initPartie=function(){
        
    }
};
