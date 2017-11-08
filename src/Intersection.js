"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var etat=Lyngk.State.VACANT;
    var listePiece = [];
    var indiceDernierePiece = 0;

    this.getState=function () {
        return etat;
    }

    this.getPieces = function() {
        return listePiece;
    }

    this.getColor=function(){
        if(listePiece.length>0){
            return listePiece[indiceDernierePiece-1].getColor();
        }else{
            return -1;
        }
    }


    this.getHauteur =function () {
        return listePiece.length;
    }

    this.placer = function (color){
        if(listePiece.length<=0){
            etat = Lyngk.State.ONE_PIECE;
        }else if(listePiece.length >0 && listePiece.length<4){
            etat = Lyngk.State.STACK;
        }else if(listePiece.length >= 4){
            etat = Lyngk.State.FULL_STACK;
        }

        listePiece.push(new Lyngk.Piece(color));
        indiceDernierePiece ++;
    }

    this.remove = function()
    {
        if(listePiece.length > 0) {
            etat = Lyngk.State.VACANT;
            var stack = listePiece;
            etat = [];
            return stack;
        }
        return -1;
    }

};
