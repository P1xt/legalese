var os = require('os');
var blessed = require('blessed');


if (os.platform() === 'win32') {
  console.log('**************************************************************');
  console.log('Hackathon Starter Generator has been disabled on Windows until');
  console.log('https://github.com/chjj/blessed is fixed or until I find a');
  console.log('better CLI module.');
  console.log('**************************************************************');
  process.exit();
}
var screen = blessed.screen({
  autoPadding: true
});

screen.key('q', function() {
  process.exit(0);
});

var home = blessed.list({
  parent: screen,
  padding: { top: 2 },
  mouse: true,
  keys: true,
  fg: 'white',
  bg: 'blue',
  selectedFg: 'blue',
  selectedBg: 'white',
  items: [
    '» REMOVE AUTHENTICATION PROVIDER',
    '» CHANGE EMAIL SERVICE',
    '» ADD NODE.JS CLUSTER SUPPORT',
    '» EXIT'
  ]
});


var footer = blessed.text({
  parent: screen,
  bottom: 0,
  fg: 'white',
  bg: 'blue',
  tags: true,
  content: ' {cyan-fg}<Up/Down>{/cyan-fg} moves | {cyan-fg}<Enter>{/cyan-fg} selects | {cyan-fg}<q>{/cyan-fg} exits'
});

var inner = blessed.form({
  top: 'center',
  left: 'center',
  mouse: true,
  keys: true,
  width: 33,
  height: 10,
  border: {
    type: 'line',
    fg: 'white',
    bg: 'red'
  },
  fg: 'white',
  bg: 'red'
});

var success = blessed.box({
  top: 'center',
  left: 'center',
  mouse: true,
  keys: true,
  tags: true,
  width: '50%',
  height: '40%',
  border: {
    type: 'line',
    fg: 'white',
    bg: 'green'
  },
  fg: 'white',
  bg: 'green',
  padding: 1
});

success.on('keypress', function() {
  home.focus();
  home.remove(success);
});



var cancel = blessed.button({
  parent: inner,
  bottom: 0,
  left: 21,
  mouse: true,
  shrink: true,
  name: 'cancel',
  content: ' CANCEL ',
  border: {
    type: 'line',
    fg: 'white',
    bg: 'red'
  },
  style: {
    fg: 'white',
    bg: 'red',
    focus: {
      fg: 'red',
      bg: 'white'
    }
  }
});

cancel.on('press', function() {
  home.focus();
  home.remove(inner);
  screen.render();

});


screen.render();



