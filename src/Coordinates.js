"use strict";

Lyngk.coordValables =['A3'
    ,'B2','B3','B4','B5'
    ,'C1','C2','C3','C4','C5','C6','C7'
    ,'D2','D3','D4','D5','D6','D7'
    ,'E2','E3','E4','E5','E6','E7','E8'
    ,'F3','F4','F5','F6','F7','F8'
    ,'G3','G4','G5','G6','G7','G8','G9'
    ,'H5','H6','H7','H8'
    ,'I7'];



Lyngk.Coordinates = function (c, l) {
    this.c=c;
    this.l=l;

     // coord valable="A3","B2-5","C1-7","D2-7","E2-8","F3-8","G3-9","H4-7","I7"


    this.valable=function(){
        if(c==="A" && l===1){
            return false;
        }
    }


    this.coordVal=function () {
       return Lyngk.coordValables.indexOf(c+l)>=0;
    }

    this.toString=function(){
        if(this.coordVal()==false){
            return "invalid";
        }else{
            return c+l;
        }
    }

    this.getColones=function(){
        return c;
    }
    this.getlignes=function(){
        return l;
    }


    this.clone=function(){
        return new Lyngk.Coordinates(c,l);
    }

    this.hash=function(){
        return (((c.charCodeAt(0)-64)*9)+l);
    }

};