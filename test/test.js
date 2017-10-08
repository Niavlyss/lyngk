'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.test1=function() {
    var coord = new Lyngk.Coordinates("A", 1);
    assertTrue(coord.valable()==false);
}



LyngkTestCase.prototype.test2=function(){
    var test=Lyngk.coordVal();
    assertTrue(test==43);
}