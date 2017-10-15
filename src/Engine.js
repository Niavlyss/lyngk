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
        var colones="ABCDEFGHI";
        var coord;
        var inter;
        var result;

        var blue=8;
        var red=8;
        var green=8;
        var black=8;
        var ivory = 8;
        var white = 3;



        for(var i=0;i<9;i++) {
            for (var j = 0; j < 9; j++) {
                coord = new Lyngk.Coordinates(colones[i], j + 1);
                if (coord.coordVal() == true) {
                    inter = new Lyngk.Intersection(coord);

                    var randColor=this.getRandomColor();
                    while((black+blue+red+green+ivory+white)!==0){
                        if (randColor === Lyngk.Color.BLUE) {
                            if (blue === 0) {
                                randColor = this.getRandomColor();
                            } else {
                                blue--;
                            }
                        } else if (randColor === Lyngk.Color.RED) {
                            if (red === 0) {
                                randColor = this.getRandomColor();
                            } else {
                                red--;
                            }
                        } else if (randColor === Lyngk.Color.GREEN) {
                            if (green === 0) {
                                randColor = this.getRandomColor();
                            } else {
                                green--;
                            }
                        } else if (randColor === Lyngk.Color.BLACK) {
                            if (black === 0) {
                                randColor = this.getRandomColor();
                            } else {
                                black--;
                            }
                        } else if (randColor === Lyngk.Color.IVORY) {
                            if (ivory === 0) {
                                randColor = this.getRandomColor();
                            } else {
                                ivory--;
                            }
                        } else if (randColor === Lyngk.Color.WHITE) {
                            if (white === 0) {
                                randColor = this.getRandomColor();
                            } else {
                                white--;
                            }
                        }
                    }


                    this.placer(randColor, inter);
                    if(inter.getState()===Lyngk.State.ONE_PIECE){
                        result = true;
                    }else{
                        result = false;
                    }
                }
            }
        }
        console.log(red,blue,black,green,ivory,white);
        return {
            res : result,b: blue,r : red,g : green, bl : black, i: ivory, w : white
        };
    }



    this.getRandomColor= function(){
        var rand=Math.random();
        if(rand>=0 && rand<=(1/6)){
            return Lyngk.Color.BLUE;
        }else if(rand>(1/6) && rand<=(2/6)){
            return Lyngk.Color.BLACK;
        }else if(rand>(2/6) && rand<=(3/6)) {
            return Lyngk.Color.RED;
        }else if(rand>(3/6) && rand<=(4/6)) {
            return Lyngk.Color.GREEN;
        }else if(rand>(4/6) && rand<=(5/6)) {
            return Lyngk.Color.IVORY;
        }else if(rand>(5/6) && rand<=(6/6)) {
            return Lyngk.Color.WHITE;
        }

    }
};
