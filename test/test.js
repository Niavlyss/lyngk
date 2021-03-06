'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.test1=function() {
    var coord = new Lyngk.Coordinates('A', 1);
    assertFalse(coord.valable());
}



LyngkTestCase.prototype.test2=function(){
    var colones="ABCDEFGHI";
    var cpt=0;
    var coord;
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            coord=new Lyngk.Coordinates(colones[i],j+1);
            if(coord.coordinatesVal()===true){
                cpt++;
            }
        }
    }
    assertTrue(cpt===43);
}

LyngkTestCase.prototype.test3=function(){
    var coord=new Lyngk.Coordinates('A',3);
    assertTrue(coord.toString()==="A3");
}

LyngkTestCase.prototype.test4=function(){
    var coord= new Lyngk.Coordinates("A",1);
    assertTrue(coord.toString()==="invalid");
}

LyngkTestCase.prototype.test5=function(){
    var coord1=new Lyngk.Coordinates("A",1);
    var coord2=coord1.clone();
    assertTrue(coord1.toString() === coord2.toString());
}

LyngkTestCase.prototype.testHash6=function(){
    var coord = new Lyngk.Coordinates("A", 3);
    var coord2 = new Lyngk.Coordinates("B", 4);

    if (coord.coordinatesVal() && coord2.coordinatesVal()){
        var h1=coord.hash();
        var h2=coord2.hash();
        assertTrue(h1!==h2 && h1===12);

    }
}


LyngkTestCase.prototype.testVac7=function(){
    var inter= new Lyngk.Intersection();
    assertEquals(inter.getState(),Lyngk.State.VACANT);
}

LyngkTestCase.prototype.test8=function(){
    var inter=new Lyngk.Intersection();
    inter.placer(Lyngk.Color.BLUE);
    assertTrue(inter.getState()===Lyngk.State.ONE_PIECE && inter.getColor()===Lyngk.Color.BLUE);
}

LyngkTestCase.prototype.test9=function(){
    var inter=new Lyngk.Intersection();
    inter.placer(Lyngk.Color.BLUE);
    inter.placer(Lyngk.Color.RED);
    assertTrue(inter.getState()===Lyngk.State.STACK && inter.getColor()===Lyngk.Color.RED);
}

LyngkTestCase.prototype.test10=function() {
    var inter=new Lyngk.Intersection();
    for(var i=0;i<5;i++){
        inter.placer(Lyngk.Color.BLUE);
    }
    assertTrue(inter.getState()===Lyngk.State.FULL_STACK);
}


LyngkTestCase.prototype.test11=function () {
    var engine= new Lyngk.Engine();
    assertTrue(engine.onePieceFull());
}

LyngkTestCase.prototype.test12=function () {
    var engine= new Lyngk.Engine();
    var plate= engine.plate();

    var nombreCouleurs = [0,0,0,0,0,0];

    for(var coord in plate){
        if(plate.hasOwnProperty(coord)){
            nombreCouleurs[plate[coord].getColor()]++;
        }
    }

    var testFlag = true;

    for(var i=0;i<nombreCouleurs.length;i++){
        if(i<=4 && nombreCouleurs[i] !==8){
            testFlag = false;
        }else if (i===5 && nombreCouleurs[i] !==3){
            testFlag = false;
        }
    }

    assertTrue(testFlag);
}

LyngkTestCase.prototype.test13=function(){
    var engine= new Lyngk.Engine();
    var flag = true ;
    var plate = engine.plate();
    for(var i=0;i<plate.length;i++){
      if(plate[i].getHauteur() !==1)
          flag = false;
    }
    assertTrue(flag);
}

LyngkTestCase.prototype.test14=function(){
   var inter = new Lyngk.Intersection();
   inter.placer(Lyngk.Color.BLUE);
   inter.placer(Lyngk.Color.BLACK);
   assertTrue(inter.getColor() === Lyngk.Color.BLACK);
}

LyngkTestCase.prototype.test15=function(){
    var engine = new Lyngk.Engine();
    var plate = engine.plate();
    var A3color = plate["A3"].getColor();

    engine.move("A3","B3");
    var plate2 = engine.plate();
    assertTrue(plate2["A3"].getHauteur() === 0 && plate2["B3"].getColor() === A3color && plate2["B3"].getHauteur() === 2);
}

LyngkTestCase.prototype.test16= function(){
    var engine = new Lyngk.Engine();
    var plate = engine.plate();
    var A3color = plate["A3"].getColor();

    engine.move("A3","B3");
    var B3color = plate["B3"].getColor();
    engine.move("B3","B2");

    assertTrue(plate["B3"].getHauteur() === 0 && plate["B2"].getColor() === A3color && plate["B2"].getColor() === B3color && plate["B2"].getHauteur() === 3);
}

LyngkTestCase.prototype.test17 = function() {
    var engine = new Lyngk.Engine();
    engine.move("B2","B3");

    var plate = engine.plate();
    var B3color = plate["B3"].getColor();

    engine.move("B3","B2");
    assertTrue(plate["B2"].getState() === Lyngk.State.VACANT && plate["B3"].getColor() === B3color);
}

LyngkTestCase.prototype.test18 = function (){
    var engine = new Lyngk.Engine();
    engine.move("B3","C2");
    var plate = engine.plate();
    assertTrue(plate["B3"].getHauteur() === 1 && plate["C2"].getHauteur() === 1);
}

LyngkTestCase.prototype.test19 = function () {
    var engine = new Lyngk.Engine();
    engine.move("H5","H8");
    var plate = engine.plate();
    assertTrue(plate["H5"].getHauteur() === 1 && plate["H8"].getHauteur() === 1);
}

LyngkTestCase.prototype.test20 = function () {
    var engine = new Lyngk.Engine();
    engine.move("D2","C1");
    engine.move("C1", "C2");
    engine.move("C2","C3");
    engine.move("C3","C4");
    engine.move("C4","B5");
    var plate = engine.plate();

    assertTrue(plate["C4"].getHauteur() === 5 && plate["B5"].getHauteur() === 1);
}

LyngkTestCase.prototype.test21 = function (){
    var engine = new Lyngk.Engine();
    engine.move("I7", "H6");
    //Impossible move because h5 is one_piece and h6 is stack
    engine.move("H5","H6");
    var plate = engine.plate();
    assertTrue(plate["H5"].getHauteur() === 1 && plate["H6"].getHauteur() === 2);
}

LyngkTestCase.prototype.test22 = function (){
    var engine = new Lyngk.Engine();
    engine.move("G4","H5");
    //impossible move because H5 is higher than H6
    engine.move("H6","H5")
    var plate = engine.plate();
    assertTrue(plate["H6"].getHauteur() === 1 && plate["H5"].getHauteur() === 2);
}


LyngkTestCase.prototype.test23 = function () {
    var engine = new Lyngk.Engine();
    var plate = engine.plate();

    var hauteur1 = plate["C1"].getHauteur();
    var hauteur2 = plate["C2"].getHauteur();

    engine.move("C1","C2");
    assertTrue(hauteur1 === plate["C1"].getHauteur() && hauteur2 === plate["C2"].getHauteur());
}

LyngkTestCase.prototype.test24= function () {
    var engine = new Lyngk.Engine();
    assertTrue(engine.getActualPlayer()===Lyngk.Joueurs.Player1);
}

LyngkTestCase.prototype.test25 = function () {
    var engine =  new Lyngk.Engine();
    engine.move("A3","B3");
    assertTrue(engine.getActualPlayer()===Lyngk.Joueurs.Player2);
}

LyngkTestCase.prototype.test26 = function (){
    var engine = new Lyngk.Engine();
    engine.claimColor(Lyngk.Color.RED);
    engine.move("A3","B3");
    engine.claimColor(Lyngk.Color.GREEN);

    var couleursJ1 = engine.getPlayerColors(Lyngk.Joueurs.Player1);
    var couleursJ2 = engine.getPlayerColors(Lyngk.Joueurs.Player2);

    assertTrue(couleursJ1[0] === Lyngk.Color.RED && couleursJ2[0] === Lyngk.Color.GREEN);
}

LyngkTestCase.prototype.test27 = function () {
    var engine = new Lyngk.Engine();
    var plate = engine.plate();

    engine.claimColor(Lyngk.Color.BLUE);
    engine.move("A3","B3");

    engine.claimColor(Lyngk.Color.GREEN);
    engine.move("H6","G5");

    engine.move("B3","C3");
    engine.move("G5","G6");

    engine.move("C3","C2");
    engine.move("G6","H7");

    engine.move("C2","D2");

    assertTrue(engine.getScore(Lyngk.Joueurs.Player1) === 1 && engine.getNbPieces() === 38);
}