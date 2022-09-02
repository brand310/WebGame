const  keyRight = 39;
const keyLeft = 37;
const keySpace = 32;

const gameWidth = 800;
const gameHeight = 600;

const state = {
    x_pos : 0,
    y_pos : 0,
    move_left : false,
    move_right : false,
    lasers: [],
    spaceship_width : 50
}


// General purpose functions
function setPosition($element, x, y) {
    $element.style.transform = `translate(${x}px, ${y}px)`;
  }
  
  function setSize($element, width) {
    $element.style.width = `${width}px`;
    $element.style.height = "auto";
  }
  
function bound (x) {
  if (x >= gameWidth-state.spaceship_width) {
    state.x_pos = gameWidth-state.spaceship_width;
    return state.x_pos
  } if (x <= 0) {
    state.x_pos =  0;
    return state.x_pos;
  }else {
    return x;
  }
}

// Player
function createPlayer($container) {
    state.x_pos = gameWidth / 2;
    state.y_pos = gameHeight - 50;
    const $player = document.createElement("img");
    $player.src = "assets/spaceship.png";
    $player.className = "player";
    $container.appendChild($player);
    setPosition($player, state.x_pos, state.y_pos);
    setSize($player, state.spaceship_width);
  }
  
  function updatePlayer(){
    if (state.move_left){
        state.x_pos -= 3;
    } if (state.move_right) {
        state.x_pos += 3;
    } if (state.shoot){
      createLaser ($container, state.x_pos - state.spaceship_width / 2, state.y_pos);
    }
    const $player = document.querySelector('.player');
    setPosition($player, bound (state.x_pos), state.y_pos)
  }

  //Player laser
  function createLaser ($container, x, y) {
    const $laser = document.createElement('img');
    $laser.src = 'assets/laser.png';
    $laser.className = 'laser';
    $container.appendChild($laser);
    const laser = {x, y, $laser};
    state.lasers.push(laser);
    setPosition($laser, x, y);
  }

  function updateLaser($container){
    const lasers = state.lasers;
      for(let i=0; i<lasers.length; i++) {
        const laser = lasers[i];
        laser.y -=2;
        setPosition(laser.$laser, laser.x, laser.y);
      }

  }

  // Key Presses 
  function keyPress(event) {
    if(event.keyCode === keyRight) {
        state.move_right = true;
        console.log('Right key')
    } else if (event.keyCode === keyLeft) {
        state.move_left = true;
        console.log('Left key')
    } else if (event.keyCode === keySpace){
        state.shoot = true;
    }
 }

 function keyRelease(event) {
    if(event.keyCode === keyRight){
        state.move_right = false;
    } else if (event.keyCode === keyLeft){
        state.move_left = false;
    } else if (event.keyCode === keySpace){
        state.shoot = false;
    }
 }

 //Main update
 function update(){
    updatePlayer();
    updateLaser($container);
    window.requestAnimationFrame(update);
 }

//Initiate Game 
const $container = document.querySelector('.main')
createPlayer($container);

//Event Listeners 
window.addEventListener('keydown', keyPress);
window.addEventListener('keyup', keyRelease)

update();