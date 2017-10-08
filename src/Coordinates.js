"use strict";

Lyngk.Coordinates = function (c, l) {
    var colones=c;
    var lignes=l;

     // coord valable="A3","B2-5","C1-7","D2-7","E2-8","F3-8","G3-9","H4-7","I7"


    this.valable=function(){
        if(colones==="A" && lignes===1){
            return false;
        }
    }

};

var grille={"A":[1,9],"B":[1,9],"C":[1,9],"D":[1,9],"E":[1,9],"F":[1,9],"G":[1,9],"H":[1,9],"I":[1,9]};
var coordValables ={"A":[3,3],"B":[2,5],"C":[1,7],"D":[2,7],"E":[2,8],"F":[3,8],"G":[3,9],"H":[4,7],"I":[7,7]};

Lyngk.coordVal=function () {
    

    var cpt=0;

    /*for(var i in grille){
        for(var j=0;j<9;j++){
            alert(grille[i][j]);
            if( (grille[i][j] >= Math.min(coordValables[i])) && (grille[i] <= Math.max(coordValables[i])) ){
                cpt++;
                alert('cpt++');
            }else{
                alert('nope');
            }
        }
    }*/
};