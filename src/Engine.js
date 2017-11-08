"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var listeInter = [];


    var initPartie = function () {
        var goodCoord = Lyngk.coordValables;
        for(var i=0;i<goodCoord.length;i++){
            listeInter[goodCoord[i]]=new Lyngk.Intersection();
        }
        init_one_piece_all();
    }



    var init_one_piece_all = function (){
        var colorDispo = [8, 8, 8, 8, 8, 3];
        for(var coord in listeInter){
            if(listeInter.hasOwnProperty(coord)) {
                var randColor;
                do {
                    randColor = Math.floor(Math.random() * 6);
                } while (colorDispo[randColor] <= 0);
                colorDispo[randColor]--;
                listeInter[coord].placer(randColor);
            }
        }
    }


    this.plate = function (){
        return listeInter;
    }

    this.move = function (piece1,piece2){
        var p1 = new Lyngk.Coordinates(piece1[0],parseInt(piece1[1]));
        var p2 = new Lyngk.Coordinates(piece2[0],parseInt(piece2[1]));

        if(p1.coordVal() && p2.coordVal()) {
            if(listeInter[p2].getState() !== Lyngk.State.VACANT ){
                var stack = listeInter[p1].remove();
                for(var i =0; i<stack.length;i++){
                    listeInter[p2].placer(stack[i].getColor());
                }
            }
        }
    }

    this.one_piece_rempli = function()
    {
        for (var coord in listeInter) {
            if (listeInter.hasOwnProperty(coord))
            {
                if(listeInter[coord].getState() != Lyngk.State.ONE_PIECE)
                    return false;
            }
        }
        return true;
    }


    initPartie();
};