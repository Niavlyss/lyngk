"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    this.c=new Lyngk.Coordinates();
    var etat=Lyngk.State.VACANT;
    var color=Lyngk.Color.BLUE;

    this.getState=function () {
        return etat;
    }

    this.getColor=function(){
        return color;
    }


    this.placer=function(pionColor){
        etat=Lyngk.State.ONE_PIECE;
        color=pionColor;
    }
};
