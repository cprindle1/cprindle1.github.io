$(function(){
  $('#playerNav').css('width', '100%');
  var $shipSelect = $('.ships');
  var $currentShipElm;
  var $rotateShip = $('#rotateShip');
  var $placeHover = $('.open');
  var $resetBoard =$('#resetBoard');
  var $playerSelect1=$('#1player');
  var $playerSelect2=$('#2player');
  var $easy = $('#easy');
  var $medium = $('#medium');
  var $hard = $('#hard');
  var $submit=$('#submit');


//listeners====================================================
$placeHover.css('cursor', 'pointer');
$rotateShip.on('click', turn90);
$shipSelect.on('click', shipSelector);
$resetBoard.on('click', completeReset);
$playerSelect1.on('click', closeNav1);
$playerSelect1.css('cursor', 'pointer');
$playerSelect2.on('click', closeNav1);
$playerSelect2.css('cursor', 'pointer');
$easy.on('click', closeNav3);
$easy.css('cursor', 'pointer');
$medium.on('click', closeNav3);
$medium.css('cursor', 'pointer');
$hard.on('click', closeNav3);
$hard.css('cursor', 'pointer');
$submit.on('click', closeNav2);

initializeGame();
})
//variable declaration==========================================
var shipDirection = 'horizontal';
var rounds=0;
var ships = [
  {
    name: 'a_carrier',
    length: 5
  },
  {
    name: 'battleship',
    length: 4
  },
  {
    name: 'cruiser',
    length: 3
  },
  {
    name: 'submarine',
    length: 3
  },
  {
    name: 'destroyer',
    length: 2
  }];
  var huntingShips = [
    {
      name: 'a_carrier',
      length: 5
    },
    {
      name: 'battleship',
      length: 4
    },
    {
      name: 'cruiser',
      length: 3
    },
    {
      name: 'submarine',
      length: 3
    },
    {
      name: 'destroyer',
      length: 2
    }];
  var currentShip = ships[0];
  var twoClicks = false;
  var player = function(name){
    this.aHits=0;
    this.bHits=0;
    this.cHits=0;
    this.sHits=0;
    this.dHits=0;
    this.name = name;
    this.shipsPlaced = 0;
    this.hits=0;
    this.board=[{status:0, ship:""}];
    this.reset = function(){
      this.aHits=0;
      this.bHits=0;
      this.cHits=0;
      this.sHits=0;
      this.dHits=0;
      this.name = name;
      this.shipsPlaced = 0;
      this.hits=0;
      this.board=[{status:0, ship:""}];
    }
    this.colorBoard = function(){
      $('#a_carrier').css('background-image', 'linear-gradient(90deg, darkred, darkred '+ (this.aHits/5)*100 +'%, gray '+ (this.aHits/5)*100 +'%, gray)');
      $('#battleship').css('background-image', 'linear-gradient(90deg, darkred, darkred '+ (this.bHits/4)*100 +'%, gray '+ (this.bHits/4)*100 +'%, gray)');
      $('#cruiser').css('background-image', 'linear-gradient(90deg, darkred, darkred '+ (this.cHits/3)*100 +'%, gray '+ (this.cHits/3)*100 +'%, gray)');
      $('#submarine').css('background-image', 'linear-gradient(90deg, darkred, darkred '+ (this.sHits/3)*100 +'%, gray '+ (this.sHits/3)*100 +'%, gray)');
      $('#destroyer').css('background-image', 'linear-gradient(90deg, darkred, darkred '+ (this.dHits/2)*100 +'%, gray '+ (this.dHits/2)*100 +'%, gray)');
      for(var i=0; i<opponent.board.length; i++){
        for(var j=0; j<opponent.board[i].length; j++){
          if(opponent.board[j][i].status==2){
            $('#'+(String.fromCharCode(i+98))+(j+1)).attr('class','miss');
          }else if(opponent.board[j][i].status==3){
            $('#'+(String.fromCharCode(i+98))+(j+1)).attr('class','hit');
          }
        }
      }
    }
    this.fire=function(){
      var winner=false;
      $('.open').css('cursor', 'default');
      $(this).css('background-color','');
      var x=0;
      var y=0;
      x=$(this).attr('id')[1]-1;
      y=$(this).attr('id')[0].charCodeAt()-98;
      if($(this).attr('id').length==3){
        x=9;
      }
      $('.open').off();
      if(opponent.board[x][y].status==0){
        opponent.board[x][y].status=2;
        $(this).attr('class', 'newmiss');
        $('#bottom').html('<br><br>'+currentPlayer.name+' Fires, MISS!');
        // $(this).css('background-color', 'white');
      }else if(opponent.board[x][y].status==1){
        opponent.board[x][y].status=3;
        currentPlayer.hits++;
        $('#bottom').html('<br><br>'+currentPlayer.name+' Fires, HIT!');
        $(this).attr('class', 'newhit');
        for(var i=0; i<ships.length; i++){
          if(opponent.board[x][y].ship==ships[i].name){
            if(ships[i].name[0]=='a'){
              opponent.aHits++;
              if(opponent.aHits==5){
                $('#bottom').html('<br><br> You sunk '+opponent.name+"'s Aircraft Carrier!");
              }
            }else if(ships[i].name[0]=='b'){
              opponent.bHits++;
              if(opponent.bHits==4){
                $('#bottom').html('<br><br> You sunk '+opponent.name+"'s Battleship!");
              }
            }else if(ships[i].name[0]=='c'){
              opponent.cHits++;
              if(opponent.cHits==3){
                $('#bottom').html('<br><br> You sunk '+opponent.name+"'s Cruiser!");
              }
            }else if(ships[i].name[0]=='d'){
              opponent.dHits++;
              if(opponent.dHits==2){
                $('#bottom').html('<br><br> You sunk '+opponent.name+"'s Destroyer!");
              }
            }else if(ships[i].name[0]=='s'){
              opponent.sHits++;
              if(opponent.sHits==3){
                $('#bottom').html('<br><br> You sunk '+opponent.name+"'s Submarine!");
              }
            }
          }
        }
      }
      if(players=='2player'){
        $('.ships').hide();
        $('#proceed').text('next player')
        $('#proceed').show();
        $('#status').hide();
      }
      if(currentPlayer.hits==17){
        $('#bottom').html('<br><br>'+currentPlayer.name+' Wins!');
        $('.miss').addClass('win');
        $('.open').addClass('win');
        $('.hit') .addClass('win');
        $('.open').off();
        $('#proceed').hide();
        winner=true;
      }
      if(currentPlayer==player1){
        currentPlayer=player2;
        opponent=player1;
      }else if(players!='1player'){
        currentPlayer=player1;
        opponent=player2;
      }
      if(players=='1player' && !winner){
        $('#proceed').show();
        $('.ships').hide();
        $('#status').hide();
        $('#proceed').text("Computer's turn")
        $('#proceed').on('click', computerFire)
      }
    }
  }
  var player1 = new player('player1');
  var player2 = new player('player2');
  var trackBoard = new player('tracker');
  var probBoard=[];
  var currentPlayer = player1;
  var opponent = player2;
  var difficulty='easy';
  var highX=0;
  var highY=0;
  var highestProb=0;
  var compShots=0;
  var compHit=false;
//end variable declaration==========================================

function closeNav1() {
    players = $(this).attr('id');
    if(players == '1player'){
      $('#p2').hide();
    }
    $('#playerNav').css('width', '0%');
    $('#nameNav').css('width', '100%');

}
function closeNav2() {
    player1.name=$('#p1').val();
    player2.name=$('#p2').val();
    if(players=='1player'){
      player2.name="Computer";
      $('#difficultyNav').css('width', '100%');
    }
    $('#bottom').html("<br><br>"+currentPlayer.name+", place your ships on the board.  You can place them horizontally or vertically.")
    $('#nameNav').css('width', '0%');
}
function closeNav3() {
    difficulty=$(this).attr('id');
    $('#difficultyNav').css('width', '0%');
}
var takeTurns = function(){
  clearBoard();
  if(currentPlayer==player1 || (currentPlayer==player2 && players!='1player')){
    $('.open').css('cursor', 'pointer');
    currentPlayer.colorBoard();
    if(currentPlayer==player1){
      opponent=player2;
      $('html').css('background-color', 'darkblue');
      $('body').css('background-color', 'darkblue');
      $('h1').css('background-color', 'darkblue');
    }else {
      opponent=player1;
      $('html').css('background-color', 'darkred');
      $('body').css('background-color', 'darkred');
      $('h1').css('background-color', 'darkred');

    }
    showShips();
    $('#proceed').hide();
    $('#status').show();
    var $select = $('.ships');
    $select.off();
    $select.css('cursor', 'default');
    $('.open').css('cursor','pointer');
    $('.open').hover(function(){
      $(this).css('background-color', 'darkred')},function(){
        $(this).css('background-color', '')
      });
      $('#bottom').html('<br><br>'+currentPlayer.name+', Fire on your Opponent!');
      $('.open').on('click', currentPlayer.fire);
    }

  }
var turn90 = function(){
  if(shipDirection == 'horizontal'){
    shipDirection = 'vertical';
  }else{
    shipDirection = 'horizontal';
  }
}
var computerFire = function(){
  clearBoard();
  $('html').css('background-color', 'darkred');
  $('body').css('background-color', 'darkred');
  $('h1').css('background-color', 'darkred');
  currentPlayer.colorBoard();

  for(var i=0; i<opponent.board.length; i++){
    for(var j=0; j<opponent.board[i].length; j++){
      if(opponent.board[i][j].status==1){
        $('#'+String.fromCharCode(j+98)+(i+1)).attr('class', 'placed');
        $('#'+String.fromCharCode(j+98)+(i+1)).text(opponent.board[i][j].ship[0]);
      }else if(opponent.board[i][j].status==3){
        $('#'+String.fromCharCode(j+98)+(i+1)).text(opponent.board[i][j].ship[0]);
      }
    }
  }

  $('#proceed').off();
  var shot=false;
  while(!shot){
    var x=0;
    var y=0;
    if(difficulty=='hard' || difficulty=='medium'){
      x=0;
      y=0;
      if(compShots<5 && !compHit){
        x = Math.floor(Math.random()*5)*2;
        y = Math.floor(Math.random()*5)*2;
      }else{
        mapProb();
        x=highX;
        y=highY;
      }
      compShots++;
    }else if(difficulty=='easy'){
      x = Math.floor((Math.random()*10));
      y = Math.floor((Math.random()*10));
    }
    if(player1.board[x][y].status==1){
      player1.board[x][y].status=3;
      trackBoard.board[x][y].status=3;
      trackBoard.board[x][y].ship=player1.board[x][y].ship;
      currentPlayer.hits++;
      $('#bottom').text('Computer Fires - HIT!');
      $('#'+String.fromCharCode(y+98)+(x+1)).attr('class', 'newhit');
      shot=true;
      compHit++;
    }else if(player1.board[x][y].status==0){
      player1.board[x][y].status=2;
      trackBoard.board[x][y].status=2;
      $('#bottom').text('Computer Fires - MISS!');
      $('#'+String.fromCharCode(y+98)+(x+1)).attr('class', 'newmiss');
      shot=true;
    }
  }
  for(var i=0; i<ships.length; i++){
    if(opponent.board[x][y].ship==ships[i].name){
      if(ships[i].name[0]=='a'){
        opponent.aHits++;
        if(opponent.aHits==5){
          $('#bottom').html('<br><br> Computer sunk '+opponent.name+"'s Aircraft Carrier!");
          for(var z=0; z<huntingShips.length; z++){
            if(huntingShips[z].name[0]=='a'){
              huntingShips.splice(z,1);
            }
          }
          for(var a=0; a<opponent.board.length; a++){
            for(var b=0; b<opponent.board.length; b++){
              if(opponent.board[a][b].ship[0]=='a'){
                trackBoard.board[a][b].status=4;
              }
            }
          }
        }
      }else if(ships[i].name[0]=='b'){
        opponent.bHits++;
        if(opponent.bHits==4){
          $('#bottom').html('<br><br> Computer sunk '+opponent.name+"'s Battleship!");
          for(var z=0; z<huntingShips.length; z++){
            if(huntingShips[z].name[0]=='b'){
              huntingShips.splice(z,1);
            }
          }
          for(var a=0; a<opponent.board.length; a++){
            for(var b=0; b<opponent.board.length; b++){
              if(opponent.board[a][b].ship[0]=='b'){
                trackBoard.board[a][b].status=4;
              }
            }
          }
        }
      }else if(ships[i].name[0]=='c'){
        opponent.cHits++;
        if(opponent.cHits==3){
          $('#bottom').html('<br><br> Computer sunk '+opponent.name+"'s Cruiser!");
          for(var z=0; z<huntingShips.length; z++){
            if(huntingShips[z].name[0]=='c'){
              huntingShips.splice(z,1);
            }
          }
          for(var a=0; a<opponent.board.length; a++){
            for(var b=0; b<opponent.board.length; b++){
              if(opponent.board[a][b].ship[0]=='c'){
                trackBoard.board[a][b].status=4;
              }
            }
          }
        }
      }else if(ships[i].name[0]=='d'){
        opponent.dHits++;
        if(opponent.dHits==2){
          $('#bottom').html('<br><br> Computer sunk '+opponent.name+"'s Destroyer!");
          for(var z=0; z<huntingShips.length; z++){
            if(huntingShips[z].name[0]=='d'){
              huntingShips.splice(z,1);
            }
          }
          for(var a=0; a<opponent.board.length; a++){
            for(var b=0; b<opponent.board.length; b++){
              if(opponent.board[a][b].ship[0]=='d'){
                trackBoard.board[a][b].status=4;
              }
            }
          }
        }
      }else if(ships[i].name[0]=='s'){
        opponent.sHits++;
        if(opponent.sHits==3){
          $('#bottom').html('<br><br> Computer sunk '+opponent.name+"'s Submarine!");
          for(var z=0; z<huntingShips.length; z++){
            if(huntingShips[z].name[0]=='s'){
              huntingShips.splice(z,1);
            }
          }
          for(var a=0; a<opponent.board.length; a++){
            for(var b=0; b<opponent.board.length; b++){
              if(opponent.board[a][b].ship[0]=='s'){
                trackBoard.board[a][b].status=4;
              }
            }
          }
        }
      }
    }
  }
  $('#proceed').text('Your Turn');
  $('#proceed').show();
  $('#proceed').on('click', takeTurns);
if(currentPlayer.hits==17){
  $('#bottom').html('<br><br>'+currentPlayer.name+' Wins!');
  $('.open').addClass('win');
  $('.open').off();
  $('#proceed').hide();
  $('#proceed').off();
}
  currentPlayer=player1;
  opponent=player2;
}
var computerPlace = function(){
  for(var i=0; i<5; i++){
    var placed=false;
    while(!placed){
      var canPlace=true;
      var x = Math.floor((Math.random()*10));
      var y = Math.floor((Math.random()*10));
      var direction = Math.floor((Math.random()*2));
      if(direction == 0){
        for(var j = 0; j<ships[i].length; j++){
          if((x+ships[i].length)>player2.board.length){
            canPlace=false;
          }else if(player2.board[x+j][y].status==1){
              canPlace=false;
            }
        }
        if(canPlace){
          placed=true;
          for(var k=0; k<ships[i].length; k++){
            player2.board[x+k][y].status=1;
            player2.board[x+k][y].ship=ships[i].name;
          }
      }
      }else{
        for(var j = 0; j<ships[i].length; j++){
          if((y+ships[i].length)>player2.board.length){
            canPlace=false;
          }else if(player2.board[x][y+j].status==1){
              canPlace=false;
          }
        }
        if(canPlace){
          placed=true;
          for(var k=0; k<ships[i].length; k++){
            player2.board[x][y+k].status=1;
            player2.board[x][y+k].ship=ships[i].name;
          }
      }
      }
    }
  }
  $('#proceed').off('');
  $('#proceed').on('click', takeTurns);
  $('#proceed').text('Start Game');
  $('#bottom').text('Computer opponent has placed ships');

}

var placeShip = function(){
  $('.open').css('background-color',"");
  var position = $(this).attr('id');
  var xCoord = position[1];
  var yCoord = position[0];
  if(position[2]!=null){
    xCoord += position[2];
  }
  var canPlace = true;
  //check if can place ship at coordinates
  if(shipDirection=='horizontal'){
    for(var i=0; i<currentShip.length; i++){
      if(parseInt(xCoord)+i > currentPlayer.board.length){
              canPlace=false;
      }else{ if(currentPlayer.board[parseInt(xCoord)-1+i][(yCoord.charCodeAt()-98)].status==1){
        canPlace=false;
      }
      }
        $(this).css("background-color", "");
    }
    //place ship on board
    if(canPlace){
      for(var i=0; i<currentShip.length; i++){
        $('#'+yCoord+(parseInt(xCoord)+parseInt(i)).toString()).attr('class', 'placed');
        $('#'+yCoord+(parseInt(xCoord)+parseInt(i)).toString()).text(currentShip.name[0]);
        currentPlayer.board[parseInt(xCoord)-1+i][(yCoord.charCodeAt()-98)].status=1;
        currentPlayer.board[parseInt(xCoord)-1+i][(yCoord.charCodeAt()-98)].ship=currentShip.name;

      }
      var $open = $('.open');
      $open.off();
      $currentShipElm.hide();
      currentPlayer.shipsPlaced++;
    }
  }else{
    for(var i=0; i<currentShip.length; i++){
      if(((yCoord.charCodeAt()-98)+currentShip.length)>10){
        canPlace=false;
      }else{ if(currentPlayer.board[parseInt(xCoord)-1][(yCoord.charCodeAt()-98)+i].status==1){
        canPlace=false;
      }
    }
      $(this).css("background-color", "");
    }
    //place ship on board
    if(canPlace){
      for(var i=0; i<currentShip.length; i++){
        $('#'+(String.fromCharCode(yCoord.charCodeAt()+i)+xCoord)).attr('class',"placed");
        $('#'+(String.fromCharCode(yCoord.charCodeAt()+i)+xCoord)).text(currentShip.name[0]);
      currentPlayer.board[parseInt(xCoord)-1][(yCoord.charCodeAt()-98)+i].status=1;
      currentPlayer.board[parseInt(xCoord)-1][(yCoord.charCodeAt()-98)+i].ship=currentShip.name;

      }
      var $open = $('.open');
      $open.off();
      $currentShipElm.hide();
      currentPlayer.shipsPlaced++;
    }
  }
  if(currentPlayer.shipsPlaced==5){
    if(players=='1player'){
      $('#rotateShip').hide();
      $('#proceed').off('');
      $('#proceed').on('click', computerPlace);
      $('#proceed').text("Computer Place Ships");
      $('#proceed').show()
    }else{
    currentPlayer=player2;
    $('#rotateShip').hide();
    $('#proceed').show()
    $('#proceed').on('click', reset);
    rounds++;
    if(rounds==2){
      $('#proceed').off('');
      $('#proceed').on('click', takeTurns);
      $('#proceed').text("Start Game");
      currentPlayer=player1;
    }
  }
  }
  twoClicks=false;
  $placeHover.off();
  $placeHover.css('cursor', 'default');
}
var reset = function(){
  $('#bottom').html("<br><br>"+currentPlayer.name+", place your ships on the board.  You can place them horizontally or vertically.")
  if(currentPlayer==player2){
    $('html').css('background-color', 'darkred');
    $('body').css('background-color', 'darkred');
    $('h1').css('background-color', 'darkred');
  }
  shipDirection = 'horizontal';
  clearBoard();
  $('#proceed').hide();
  showShips();
  if(rounds<2){
    $('#rotateShip').show();
  }
}
var completeReset = function(){
  location.reload();
}
//allow user to select ship
var shipSelector = function(){
  if(twoClicks){
    $placeHover.off();
    $placeHover.css('cursor', 'default');
  }
  twoClicks=true;
  var length = 0;
  for(var i=0; i<ships.length; i++){
    if(ships[i].name==$(this).attr('id')){
      length=ships[i].length;
    }
  }
  $placeHover = $('.open');
  $placeHover.css('cursor', 'pointer');
  $placeHover.hover(function(){
    if(shipDirection=='horizontal'){
      var id=$(this).attr('id');
      var x = id[1];
      var y = id[0];
      if(id[2]!= null){
        x+=id[2];
      }
      for(var i=0; i<length; i++){
        $("#"+y+(parseInt(x)+i)).css("background-color", "darkgray");
      }
    }else{
      var id=$(this).attr('id');
      var x = id[1];
      var y = id[0];
      if(id[2]!= null){
        x+=id[2];
      }
      for(var i=0; i<length; i++){
        $("#"+String.fromCharCode(y.charCodeAt()+i)+x).css("background-color", "darkgray");
      }
    }
  }, function(){
    var id=$(this).attr('id');
    var x = id[1];
    var y = id[0];
    if(id[2]!= null){
      x+=id[2];
    }
    for(var i=0; i<length; i++){
      $("#"+y+(parseInt(x)+i)).css("background-color", "");
    }
    for(var i=0; i<length; i++){
      $("#"+String.fromCharCode(y.charCodeAt()+i)+x).css("background-color", "");
    }
    });
  for(var i=0; i<ships.length; i++){
    if(ships[i].name==$(this).attr('id')){
      currentShip=ships[i];
    }
  }
  var $open = $('.open');
  $open.on('click', placeShip);
  $currentShipElm=$(this);
}
var showShips = function(){
  $('.ships').show();
}

var clearBoard = function(){
  //mark board letters/numbers/change class for formatting
  $('.placed').text('');
  $('.placed').attr('class','open');
  $('.newhit').addClass('hit').removeClass('newhit');
  $('.newmiss').addClass('miss').removeClass('newmiss');
  $('.hit').addClass('open').removeClass('hit');
  $('.miss').addClass('open').removeClass('miss');
  $('.open').text('');
}
var generateBoard = function(){
  //generate divs for board spaces.
  for(var i=0; i<11; i++){
    for(var j=0; j<11; j++){
      var $space = $('<div>').addClass('open');
      $space.attr('id',(String.fromCharCode(97+i)+j.toString()));
      $('#board').append($space);
    }
  }
  //mark board letters/numbers/change class for formatting
  $('#a0').attr('class', 'boardBorder');
  for(var i=1; i<11; i++){
    var $num = $('#a'+i);
    $num.text(i);
    $num.attr('class', 'boardBorder');
  }
  for(var i=1; i<11; i++){
    var $letter = $('#'+String.fromCharCode(97+i)+"0");
    $letter.text(String.fromCharCode(96+i));
    $letter.attr('class', 'boardBorder');
  }
}
var initializeGame = function(){
  currentPlayer = player1;
    $('#bottom').html("<br><br>"+currentPlayer.name+", place your ships on the board.  You can place them horizontally or vertically.")
  //build initial player boards

  for(var i=0; i<10; i++){
    temp=[];
    for(var j=0; j<10; j++){
      temp[j]={status:0,
                ship:""}
    }
    player1.board[i]=temp.slice();
  }
  for(var i=0; i<10; i++){
    temp=[];
    for(var j=0; j<10; j++){
      temp[j]={status:0,
                ship:""}
    }
    player2.board[i]=temp.slice();
  }
  for(var i=0; i<10; i++){
    temp=[];
    for(var j=0; j<10; j++){
      temp[j]={status:0,
                ship:""}
    }
    trackBoard.board[i]=temp.slice();
  }

  generateBoard();
  generateBoard2();

}




var mapProb = function(){
  for(var i=0; i<10; i++){
    temp=[];
    for(var j=0; j<10; j++){
      temp[j]=0;
    }
    probBoard[i]=temp.slice();
  }
  for(var l=0; l<huntingShips.length; l++){
    for(var x=0; x<probBoard.length; x++){
      for(var y=0; y<probBoard.length; y++){
        var canPlace=true;
        for(var s=0; s<huntingShips[l].length; s++){
          if(x+huntingShips[l].length-1>=probBoard.length){
            canPlace=false;
          }else if(trackBoard.board[x+s][y].status!=0 && trackBoard.board[x+s][y].status!=3){
            if(trackBoard.board[x+s][y].status==4){
              probBoard[x+s][y]=-500;
            }
            canPlace=false;
          }else if(trackBoard.board[x+s][y].status==3){
            probBoard[x+s][y]=-500;
            if(x+s+1<probBoard.length){
              if(trackBoard.board[x+s+1][y].status==0){
                probBoard[x+s+1][y]+=25;

                if(difficulty=='hard'){
                for(var trackBack=0; trackBack<x+s; trackBack++){
                  if(x+s-trackBack<0){
                    break;
                  }else if(trackBoard.board[x+s-trackBack][y].status!=3){
                    break;
                  }else{
                    console.log('trackBack');
                    probBoard[x+s+1][y]+=25;
                  }
                }
              }
              }
            }
            if(y+1<probBoard.length){
              if(trackBoard.board[x+s][y+1].status==0){
                probBoard[x+s][y+1]+=25;
                if(difficulty=='hard'){
                  for(var trackBack=0; trackBack<x+s; trackBack++){
                    if(y-trackBack<0){
                      break;
                    }else if(trackBoard.board[x+s][y-trackBack].status!=3){
                      break;
                    }else{
                      console.log('trackBack');
                      probBoard[x+s][y+1]+=25;
                    }
                  }
                }

              }
            }
            if(x+s-1>=0){
              if(trackBoard.board[x+s-1][y].status==0){
                probBoard[x+s-1][y]+=25;
                if(difficulty=='hard'){
                for(var trackBack=0; trackBack<x+s; trackBack++){
                  if(x+s+trackBack>=probBoard.length){
                    break;
                  }else if(trackBoard.board[x+s+trackBack][y].status!=3){
                    break;
                  }else{
                    console.log('trackBack');
                    probBoard[x+s-1][y]+=25;
                  }
                }
              }
              }
            }
            if(y-1>=0){
              if(trackBoard.board[x+s][y-1].status==0){
                probBoard[x+s][y-1]+=25;
                if(difficulty=='hard'){
                for(var trackBack=0; trackBack<x+s; trackBack++){
                  if(y+trackBack>=probBoard.length){
                    break;
                  }else if(trackBoard.board[x+s][y+trackBack].status!=3){
                    break;
                  }else{
                    probBoard[x+s][y-1]+=25;
                  }
                }
              }
              }
            }
          }
        }
        if(canPlace){
          for(var ix=0; ix<huntingShips[l].length; ix++){
            probBoard[x+ix][y]++;
          }
        }
        canPlace=true;
        for(var s=0; s<huntingShips[l].length; s++){
          if(y+huntingShips[l].length-1>=probBoard.length){
            canPlace=false;
          }else if(trackBoard.board[x][y+s].status !=0 && trackBoard.board[x][y+s].status!=3){
            if(trackBoard.board[x][y+s].status==4){
              probBoard[x][y+s]=-500;
            }
            canPlace=false;
          }else if(trackBoard.board[x][y+s].status==3){
            probBoard[x][y+s]=-500;
            if(x+1<probBoard.length){
              if(trackBoard.board[x+1][y+s].status==0){
                probBoard[x+1][y+s]+=25;
              }
            }
            if(y+s+1<probBoard.length){
              if(trackBoard.board[x][y+s+1].status==0){
                probBoard[x][y+s+1]+=25;
              }
            }
            if(x-1>=0){
              if(trackBoard.board[x-1][y+s].status==0){
                probBoard[x-1][y+s]+=25;
              }
            }
            if(y+s-1>=0){
              if(trackBoard.board[x][y+s-1].status==0){
                probBoard[x][y+s-1]+=25;
              }
            }
          }
        }
        if(canPlace){
          for(var iy=0; iy<huntingShips[l].length; iy++){
            probBoard[x][y+iy]++;
          }

        }
      }

    }
  }

for(var i=0; i<probBoard.length; i++){
  for(var j=0; j<probBoard[i].length; j++){
    $('#'+i+'-'+j).text(probBoard[i][j]);
  }
}

  highestProb=0;
  highX=0;
  highY=0;
  for(var i=0; i<probBoard.length; i++){
    for(var j=0; j<probBoard[i].length; j++){
      if(parseInt(probBoard[i][j])>highestProb){
        highestProb=probBoard[i][j];
        highX=i;
        highY=j;
      }
    }
  }
  for(var i=0; i<probBoard.length; i++){
    for(var j=0; j<probBoard[i].length; j++){
      $('#'+j+'-'+i).text(probBoard[i][j]);
    }
  }

}
var generateBoard2 = function(){
  //generate divs for board spaces.
  for(var i=0; i<10; i++){
    for(var j=0; j<10; j++){
      var $space = $('<div>').addClass('open');
      $space.attr('id',(i+'-'+j));
      $('#board2').append($space);
    }
  }
  //mark board letters/numbers/change class for formatting
}
