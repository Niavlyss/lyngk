"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Joueurs = {Joueur1 : 0, Joueur2 : 1};

Lyngk.Engine = function () {
    var listeInter = [];

    var joueurActuel;

    var couleursJoueur1 = [];
    var couleursJoueur2 = [];


    var initPartie = function () {
        joueurActuel = Lyngk.Joueurs.Joueur1;
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
            if(listeInter[p2].getState() !== Lyngk.State.VACANT && validMove(p1,p2)){
                var stack = listeInter[p1].remove();
                for(var i =0; i<stack.length;i++){
                    listeInter[p2].placer(stack[i].getColor());
                }
                changerJoueur();
            }
        }
    }

    var validMove = function (piece1,piece2){
        var testFlag = false;

        if(piece1.getColones().charCodeAt(0) === piece2.getColones().charCodeAt(0)){
            var deplacement = piece1.getlignes() - piece2.getlignes();
            if(deplacement === 1 || deplacement === -1){
                testFlag = true;
            }
        }else if(piece1.getColones().charCodeAt(0) < piece2.getColones().charCodeAt(0)){
            var deplacement = piece1.getlignes() - piece2.getlignes();
            if(deplacement === 0 || deplacement === -1){
                testFlag = true;
            }
        }else if(piece1.getColones().charCodeAt(0) > piece2.getColones().charCodeAt(0)){
            var deplacement = piece1.getlignes() - piece2.getlignes();
            if(deplacement === 1 || deplacement === 0){
                testFlag = true;
            }
        }

        var diffColones = (piece1.getColones().charCodeAt(0)) - (piece2.getColones().charCodeAt(0));

        if(diffColones > 1 || diffColones < -1){
            testFlag = false;
        }

        if(listeInter[piece1].getHauteur() == 0 || listeInter[piece2].getHauteur()==0)
            testFlag = false;

        if(listeInter[piece1].getState() === Lyngk.State.FULL_STACK)
            testFlag = false;

        if(listeInter[piece1].getState() === Lyngk.State.ONE_PIECE && listeInter[piece2].getState() === Lyngk.State.STACK)
            testFlag = false;

        if(listeInter[piece1].getHauteur() < listeInter[piece1].getHauteur())
            testFlag = false;


        var listeP1 = listeInter[piece1].getPieces();
        var tabCpt=[0,0,0,0,0,0];
        for(var i =0;i<listeP1.length;i++){
            if (listeP1[i].getColor()===Lyngk.Color.BLACK){
                tabCpt[0]++;
            }else if (listeP1[i].getColor()===Lyngk.Color.BLUE){
                tabCpt[1]++;
            }else if (listeP1[i].getColor()===Lyngk.Color.RED) {
                tabCpt[2]++;
            }else if (listeP1[i].getColor()===Lyngk.Color.GREEN) {
                tabCpt[3]++;
            }else if (listeP1[i].getColor()===Lyngk.Color.IVORY) {
                tabCpt[4]++;
            }else if (listeP1[i].getColor()===Lyngk.Color.WHITE) {
                tabCpt[5]++;
            }
        }
        for(var j=0;j<tabCpt.length;j++){
            if(j>=0 && j<5){
                if(tabCpt[j]>1){
                    testFlag = false;
                }
            }else if(j===5){
                if(tabCpt[j]>3){
                    testFlag = false;
                }
            }
        }

        if(joueurActuel === Lyngk.Joueurs.Joueur1){
            if(couleursJoueur2.indexOf(listeInter[piece1].getColor()) >= 0)
                testFlag = false;

            if(couleursJoueur1.length === 0 && listeInter[piece1].getColor() === Lyngk.Color.WHITE)
                testFlag = false;
        }else{
            if(couleursJoueur1.indexOf(listeInter[piece1].getColor()) >= 0)
                testFlag = false;

            if(couleursJoueur2.length === 0 && listeInter[piece1].getColor() === Lyngk.Color.WHITE)
                testFlag = false;
        }

        return testFlag;

    }

    var changerJoueur = function()
    {
        if(joueurActuel === Lyngk.Joueurs.Joueur1)
            joueurActuel = Lyngk.Joueurs.Joueur2;
        else
            joueurActuel = Lyngk.Joueurs.Joueur1;
    }


    this.getJoueurCourant = function (){
        return joueurActuel;
    }

    this.getPlayerColors = function (joueur){
        if(joueur === Lyngk.Joueurs.Joueur1){
            return couleursJoueur1;
        }else{
            return couleursJoueur2;
        }
    }

    this.claimColor = function (color){
        if(couleursJoueur1.indexOf(color) < 0 && couleursJoueur2.indexOf(color) < 0) {
            if(joueurActuel === Lyngk.Joueurs.Joueur1){
                if(couleursJoueur1.length < 2)
                    couleursJoueur1.push(color);
            }else{
                if(couleursJoueur2.length < 2)
                    couleursJoueur2.push(color);
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