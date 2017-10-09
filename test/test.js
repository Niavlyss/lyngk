'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.test1=function() {
    var coord = new Lyngk.Coordinates("A", 1);
    assertTrue(coord.valable()==false);
}



LyngkTestCase.prototype.test2=function(){
    var colones="ABCDEFGHI";
    var cpt=0;
    var coord;
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            coord=new Lyngk.Coordinates(colones[i],j+1);
            if(coord.coordVal()==true){
                cpt++;
            }
        }
    }
    assertTrue(cpt==43);
}