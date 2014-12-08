$(document).ready(function() {
  jQuery.extend
  (
      {
        getValues: function(url)
        {
          var result = null;
          $.ajax(
              {
                url: url,
                type: 'get',
                dataType: 'text',
                async: false,
                cache: false,
                success: function(data)
                {
                  result = data;
                }
              });
          return result;
        }
      }
  );
  var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#\$%&\(\)\*\+,\-\.\/:;<=>\?@\[\]\^_`\{\|\}~]/g;
  var spaceRE = /\s+/g;
  var numRE = /\d+/g;
  var lines = $.getValues("/content/tos.txt").split("\n");
  var words = uniques(lines[0].replace(punctRE, '').replace(spaceRE, ' ').replace(numRE, '').split(' '));

  var activeWords = [];
  var lineChanged = true;
  var wordMeteors;
  var fireButton;

  var game = new Phaser.Game(1000, 500, Phaser.AUTO, 'legalese', { preload: preload, create: create, update: update }, true);
  var timeCheck;
  var player;
  var bullets;
  var bulletTime = 0;
  var cursors;
  var score = 0;

  var startLine  = 0;
  var endLine = (lines.length > 11)  ? 11 : lines.length;
  var textDiv = document.getElementById('text');
  var scoreDiv = document.getElementById('scoreUpdate');

  function preload () {

    game.load.image('player', '../images/playerShip2_red.png');
    game.load.image('wordMeteor1', '../images/buttonBlue.png');
    game.load.image('wordMeteor2', '../images/buttonGreen.png');
    game.load.image('wordMeteor3', '../images/buttonRed.png');
    game.load.image('wordMeteor4', '../images/buttonYellow.png');
    game.load.image('bullet', '../images/laserRed01.png');


    //alert(lines);
  }

  function create () {
    this.game.stage.backgroundColor = '#DDDDDD';

    var htmlData = "";
    for (var i = startLine; i < endLine; i++){
      htmlData += lines[i] + "<br />";
    }
    textDiv.innerHTML = htmlData;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;


    player = game.add.sprite(550,450, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.allowGravity = false;
    player.body.velocity.setTo(0, 0);
    player.body.acceleration.setTo(0, 0);
    player.body.collideWorldBounds = true;

    timeCheck = game.time.now;
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // dropping words
    wordMeteors = game.add.group();
    wordMeteors.enableBody = true;
    wordMeteors.physicsBodyType = Phaser.Physics.ARCADE;


  }

  function update() {

    if (lineChanged === true) {
      var htmlData = "";

      // toss the blank line if it's at the top
      while (lines[startLine].replace(punctRE, '').replace(spaceRE, '').replace(numRE, '').trim() === "") {
        startLine++;
        if (endLine < lines.length -1) {
          endLine++;
        }
      }
      for (var i = startLine; i < endLine; i++) {
        htmlData += lines[i] + "<br />";
      }
      textDiv.innerHTML = htmlData;
      scoreDiv.innerHTML = "<h4>"+score+"</h4>";
      words = uniques(lines[startLine].replace(punctRE, '').replace(spaceRE, ' ').replace(numRE, '').split(' '));

      lineChanged = false;
    }
    // minimize word dups on the playing field
    while(activeWords.indexOf(words[0]) !== -1 && words[0].length > 1) {
      words.shift();
    }

    if (wordMeteors.countLiving() < 10 && words.length > 0 && (parseInt(game.time.now) - timeCheck > 600)) {


      var thisWord = words[0];
      words.shift();

      // randomize word background
      var spawn = Math.floor(Math.random()*(4-1+1)+1);
      var spawnImage;
      var spawnX = Math.floor(Math.random()*(game.world.width-0+1)+0);
      switch (spawn) {
        case 1:
          spawnImage = 'wordMeteor1';
          break;
        case 2:
          spawnImage = 'wordMeteor2';
          break;
        case 3:
          spawnImage = 'wordMeteor3';
          break;
        default:
          spawnImage = 'wordMeteor4';
          break;
      }

      // Add another word to the field
      var text = this.add.text(110, 20, thisWord, { font: 'bold 16pt Console', fill: "#555", align: 'center' });
      text.anchor.setTo(0.5);
      var textSprite = this.add.sprite(spawnX  - game.cache.getImage(spawnImage).width /2, 0, spawnImage);
      textSprite.addChild(text);
      textSprite.wordText = thisWord;
      activeWords.push(thisWord);
      words.shift();
      this.physics.enable(textSprite, Phaser.Physics.ARCADE);
      textSprite.body.bounce.y = 1;
      textSprite.body.collideWorldBounds = true;
      wordMeteors.add(textSprite);
      timeCheck = game.time.now;

    }
    if (player.alive)
    {
      //  Reset the player, then check for movement keys
      player.body.velocity.setTo(0, 0);

      if (cursors.left.isDown)
      {
        player.body.velocity.x = -400;
      }
      else if (cursors.right.isDown)
      {
        player.body.velocity.x = 400;
      }

      //  Firing?
      if (fireButton.isDown)
      {
        fireBullet();
      }


      //  Run collision
      game.physics.arcade.overlap(bullets, wordMeteors, collisionHandler, null, this);

    }
    // win condition
    if (endLine < 2) {
      htmlData += "<h1>Awesome! You Win!</h1><br />";
      textDiv.innerHTML = htmlData;
      endLine = 0;
      player.kill();
    }

  }

  function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime && bullets.countLiving() <  4)
    {
      //  Grab the first bullet we can from the pool
      bullet = bullets.getFirstExists(false);

      if (bullet)
      {
        //  And fire it
        bullet.reset(player.x+55, player.y + 8);
        bullet.body.velocity.y = -400;
        bulletTime = game.time.now + 200;
      }
    }

  }
  function resetBullet (bullet) {

    bullet.destroy();

  }
  function collisionHandler (bullet, wordMeteor) {

    //  When a bullet hits an wordMeteor we kill them both
    bullet.kill();
    for (var i = startLine; i < endLine; i++) {
      var str1 = "\\b"+wordMeteor.wordText+"\\b";
      var re = new RegExp(str1, "g");

      lines[i] = lines[i].replace(re, ("       "));

    }
    activeWords.remove(wordMeteor.wordText);
    lineChanged = true;
    wordMeteor.kill();
    //  Increase the score
    score += 20;
  }

  // array maintenance functions
  Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  function uniques(arr) {
    var a = [];
    for (var i=0, l=arr.length; i<l; i++)
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
        a.push(arr[i]);
    return a;
  }
});

