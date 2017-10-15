"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    this.c=new Lyngk.Coordinates();
    var cpt=0;
    var etat=Lyngk.State.VACANT;
    var color;

    this.getState=function () {
        return etat;
    }

    this.getColor=function(){
        return color;
    }

    this.setColor=function(col){
        color=col;
    }

    this.setState=function(state){
        etat=state;
    }



};
