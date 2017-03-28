$(function(){
  var $shipSelect = $('.ships');
  var $currentShipElm;
  var $rotateShip = $('#rotateShip');
  var $placeHover = $('.open');
  $placeHover.css('cursor', 'pointer');
  var $resetBoard =$('#resetBoard');
//listeners====================================================
$rotateShip.on('click', turn90);
$shipSelect.on('click', shipSelector);
$resetBoard.on('click', completeReset);
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
        $(this).attr('class', 'miss');
        $('#bottom').html('<br><br>'+currentPlayer.name+', MISS!');
        // $(this).css('background-color', 'white');
      }else if(opponent.board[x][y].status==1){
        opponent.board[x][y].status=3;
        currentPlayer.hits++;
        $('#bottom').html('<br><br>'+currentPlayer.name+', HIT!');
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
      $('.ships').hide();
      $('#proceed').text('next player')
      $('#proceed').show();
      $('#status').hide();
      if(currentPlayer.hits==17){
        $('#bottom').html('<br><br>'+currentPlayer.name+' Wins!');
        $('.open').off();
        $('#proceed').hide();
      }
      if(currentPlayer==player1){
        currentPlayer=player2;
        opponent=player1;
      }else{
        currentPlayer=player1;
        opponent=player2;
      }
    }
  }
  var player1 = new player('player1');
  var player2 = new player('player2');
  var currentPlayer = player1;
  var opponent = player2;
//end variable declaration==========================================
var takeTurns = function(){
  $('.open').css('cursor', 'pointer');
  clearBoard();
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
var turn90 = function(){
  if(shipDirection == 'horizontal'){
    shipDirection = 'vertical';
  }else{
    shipDirection = 'horizontal';
  }
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
    currentPlayer=player2;
    $('#rotateShip').hide();
    $('#proceed').show()
    $('#proceed').on('click', reset);
    rounds++;
    if(rounds==2){
      clearBoard();
      $('#proceed').off('');
      $('#proceed').on('click', takeTurns);
      $('#proceed').text("Start Game");
      currentPlayer=player1;
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
  rounds=0;
  $('.open').remove();
  $('.hit').remove();
  $('.miss').remove();
  $('.placed').remove();
  $('.boardBorder').remove();
  $('#status').hide();
  $('#rotateShip').show();
  $('#proceed').hide();
  $('.ships').css('background-image', '');
  $('#rotateShip').on('click', turn90);
  $('.ships').on('click', shipSelector);
  $('#resetBoard').on('click', completeReset);
  $('.ships').css('cursor', 'pointer');
  player1.reset();
  player2.reset();
  currentPlayer=player1;
  showShips();
  initializeGame();
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
  $('.placed').text("");
  $('.placed').attr('class','open');
  $('.newhit').addClass('hit').removeClass('newhit');
  $('.hit').addClass('open').removeClass('hit');
  $('.miss').addClass('open').removeClass('miss');

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
  generateBoard();
}
