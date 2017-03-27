$(function(){
  var $shipSelect = $('.ships');
  var $currentShipElm;
  var $rotateShip = $('#rotateShip');
  var $placeHover = $('.open');


//listeners====================================================
$rotateShip.on('click', turn90);
$shipSelect.on('click', shipSelector);
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
    this.name = name;
    this.shipsPlaced = 0;
    this.hits=0;
    this.board=[{status:0, ship:""}];
    this.colorBoard = function(){
      console.log("board should be cleared");
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
      $(this).css('background-color','');
      var x=0;
      var y=0;
      x=$(this).attr('id')[1]-1;
      y=$(this).attr('id')[0].charCodeAt()-98;
      console.log(x);
      console.log(y);
      $('.open').off();
      if(opponent.board[x][y].status==0){
        opponent.board[x][y].status=2;
        $(this).attr('class', 'miss');
        // $(this).css('background-color', 'white');
      }else if(opponent.board[x][y].status==1){
        opponent.board[x][y].status=3;
        // $(this).css('background-color', 'darkred');
        $(this).attr('class', 'hit');

      }else{
      }
      $('.ships').hide();
      $('#proceed').text('next player')
      $('#proceed').show();
      $('#status').hide();
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
  clearBoard();
  currentPlayer.colorBoard();
  if(currentPlayer==player1){
    opponent=player2;
  }else {
    opponent=player1;
  }
  if(currentPlayer.hits<17){
    showShips();
    $('#proceed').hide();
    $('#status').show();
    var $select = $('.ships');
    $select.off();
    $select.css('cursor', 'default');
    $('.open').hover(function(){
      $(this).css('background-color', 'darkred')},function(){
      $(this).css('background-color', '')
    });
    $('#bottom').html('<br><br>'+currentPlayer.name+' Fire on your Opponent!');
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
}

var reset = function(){
  shipDirection = 'horizontal';
  clearBoard();
  $('#proceed').hide();
  showShips();
  if(rounds<2){
    $('#rotateShip').show();
  }
  // else{
  //   $('#status').show();
  //   var $select = $('.ships');
  //   $select.off();
  //   $select.css('cursor', 'default');
  //   $('.open').hover(function(){
  //     $(this).css('background-color', 'darkred')},function(){
  //     $(this).css('background-color', '')
  //   });
  //   // $('#topBox').text('Fleet Status');
  //   $('#bottom').html('<br><br>Fire on your Opponent!');
  //   $('.open').on('click', takeTurns);
  // }
}
//allow user to select ship
var shipSelector = function(){
  if(twoClicks){
    $placeHover.off();
  }
  twoClicks=true;
  var length = 0;
  for(var i=0; i<ships.length; i++){
    if(ships[i].name==$(this).attr('id')){
      length=ships[i].length;
    }
  }
  $placeHover = $('.open');
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
  console.log('clearing');
  $('.placed').text("");
  $('.placed').attr('class','open');
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
