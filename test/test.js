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

LyngkTestCase.prototype.test3=function(){
    var c="A";
    var l=3;
    var ch=c+l;
    var coord=new Lyngk.Coordinates(c,l);
    assertTrue(coord.toString()==ch);
}

LyngkTestCase.prototype.test4=function(){
    var coord= new Lyngk.Coordinates("A",1);
    assertTrue(coord.toString()=="invalid");
}

LyngkTestCase.prototype.test5=function(){
    var coord=new Lyngk.Coordinates("A",1);
    var coord2=coord.clone();

    assertTrue(coord.getColones()==coord2.getColones() && coord.getlignes()==coord2.getlignes());
}

LyngkTestCase.prototype.testHash=function(){
    var coord = new Lyngk.Coordinates("A", 3);
    var coord2 = new Lyngk.Coordinates("B", 4);

    if (coord.coordVal() && coord2.coordVal()){
        var h1=coord.hash();
        var h2=coord2.hash();
        assertTrue(h1!=h2 && h1==12);

    }
}


LyngkTestCase.prototype.testVac=function(){
    var inter= new Lyngk.Intersection();
    assertEquals(inter.getState(),Lyngk.State.VACANT);
}