"use strict";

Lyngk.Coordinates = function (c, l) {
    var colones=c;
    var lignes=l;

    //var estvalable="A3","B2-5","C1-7","D2-7","E2-8","F3-8","G3-9","H4-7","I7"

    this.valable=function(){
        if(colones=="A" && lignes==1){
            return false;
        }
    }
};
