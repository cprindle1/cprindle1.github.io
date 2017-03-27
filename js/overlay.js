$(function(){
  var $playerSelect=$('.playerSelect');
  $playerSelect.on('click', closeNav);
  $playerSelect.css('cursor', 'pointer');
})
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
