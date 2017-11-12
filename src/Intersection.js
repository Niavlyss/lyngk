"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state=Lyngk.State.VACANT;
    var listPiece = [];
    var lastPieceIndex = 0;

    this.getState=function () {
        return state;
    };

    this.getPieces = function() {
        return listPiece;
    };

    this.getColor=function(){
        if(listPiece.length>0){
            return listPiece[lastPieceIndex-1].getColor();
        }else{
            return -1;
        }
    };


    this.getHauteur =function () {
        return listPiece.length;
    };

    this.placer = function (color){

        if(listPiece.length<=0){
            state = Lyngk.State.ONE_PIECE;
        }else if(listPiece.length >0 && listPiece.length<4){
            state = Lyngk.State.STACK;
        }else if(listPiece.length >= 4){
            state = Lyngk.State.FULL_STACK;
        }

        listPiece.push(new Lyngk.Piece(color));
        lastPieceIndex ++;
    };

    this.remove = function(){
        if(listPiece.length > 0) {
            state = Lyngk.State.VACANT;
            var stack = listPiece;
            state = [];
            return stack;
        }
        return -1;
    };


    this.colorInInter = function (color) {
        var testFlag = false;
        for(var i=0;i<listPiece.length; i++){
            if(listPiece[i].getColor() === color){
                testFlag = true;
            }
        }
        return testFlag;
    };

};
