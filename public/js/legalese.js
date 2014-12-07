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

  var lines = $.getValues("/content/tos.txt").split("\n");
  var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#\$%&\(\)\*\+,\-\.\/:;<=>\?@\[\]\^_`\{\|\}~]/g;
  var spaceRE = /\s+/g;
  var numRE = /\d+/g;
  var wordRemoved = true;

  var game = new Phaser.Game(1000, 550, Phaser.AUTO, 'legalese', { preload: preload, create: create }, true);


  var startLine  = 0;
  var endLine = (lines.length > 7)  ? 7 : lines.length;
  var textDiv = document.getElementById('text');

  function preload () {

    game.load.image('player', '../images/playerShip2_red.png');


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
    var player = game.add.sprite(550,450, 'player');

  }

  function update() {

    if (wordRemoved === true) {
      var htmlData = "";
      if (lines[startLine].replace(punctRE, '').replace(spaceRE, '').replace(numRE, '').trim() === "") {
        startLine++;
        if (endLine < lines.length -1) {
          endLine++;
        }
      }
      for (var i = startLine; i < endLine; i++) {
        htmlData += lines[i] + "<br />";
      }
      textDiv.innerHTML = htmlData;
      wordRemoved = false;
    }
  }

});

