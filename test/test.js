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

LyngkTestCase.prototype.testHash6=function(){
    var coord = new Lyngk.Coordinates("A", 3);
    var coord2 = new Lyngk.Coordinates("B", 4);

    if (coord.coordVal() && coord2.coordVal()){
        var h1=coord.hash();
        var h2=coord2.hash();
        assertTrue(h1!=h2 && h1==12);

    }
}


LyngkTestCase.prototype.testVac7=function(){
    var inter= new Lyngk.Intersection();
    assertEquals(inter.getState(),Lyngk.State.VACANT);
}

LyngkTestCase.prototype.test8=function(){
    var engine=new Lyngk.Engine();
    var coord=new Lyngk.Coordinates("A",3);
    var inter=new Lyngk.Intersection(coord);
    engine.placer(Lyngk.Color.BLUE,inter);
    assertTrue(inter.getState()===Lyngk.State.ONE_PIECE && inter.getColor()===Lyngk.Color.BLUE);
}

LyngkTestCase.prototype.test9=function(){
    var engine=new Lyngk.Engine();
    var coord=new Lyngk.Coordinates("A",3);
    var inter=new Lyngk.Intersection(coord);
    engine.placer(Lyngk.Color.BLUE,inter);
    engine.placer(Lyngk.Color.RED,inter);

    assertTrue(inter.getState()===Lyngk.State.STACK && inter.getColor()===Lyngk.Color.RED);
}

LyngkTestCase.prototype.test10=function() {
    var engine=new Lyngk.Engine();
    var coord=new Lyngk.Coordinates("A",3);
    var inter=new Lyngk.Intersection(coord);
    for(var i=0;i<5;i++){
        engine.placer(Lyngk.Color.BLUE,inter);
    }

    assertTrue(inter.getState()===Lyngk.State.FULL_STACK);
}


LyngkTestCase.prototype.test11=function () {
    var engine= new Lyngk.Engine();
    engine.initPartie();
    assertTrue(engine.initPartie().res);
}

LyngkTestCase.prototype.test12=function () {
    var engine= new Lyngk.Engine();
    var total=0;
    engine.initPartie();
    for(var i=0;i<engine.initPartie().tab.length;i++){
        total+=engine.initPartie().tab[i];
    }
    assertTrue(total===0);
}

LyngkTestCase.prototype.test13=function(){
    var engine= new Lyngk.Engine();
    engine.initPartie();
    for(var i=0;i<engine.initPartie().tabInter.length;i++){
        assertTrue(engine.initPartie().tabInter[i].getHauteur()===1);
    }
}

LyngkTestCase.prototype.test14=function(){
    var engine = new Lyngk.Engine();
    engine.initPartie();
    var interPlateau = engine.initPartie().tabInter[1];
    var inter = new Lyngk.Intersection(interPlateau.getCoord());
    engine.placer(Lyngk.Color.BLACK,inter);
    assertTrue(engine.initPartie().tabInter[1].getColor()===Lyngk.Color.BLACK);
}

