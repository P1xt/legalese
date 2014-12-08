Team Fluffle solution to Theme 3 of the 2014 Koding Hackathon
=======================

:octocat: &nbsp;**Live Demo**: http://p1xt.koding.io/

The concept
-------
Make the legalese on a website engaging, interactive, and fun

The tech
-------
This is a nodejs application
Using the Express.js framework
And, Jade templating
And, the Phaser.io game framework

The document I used in the demo is the terms of use for world of warcraft by Blizzard Entertainment.
I obscured all their identifying information but didn't want to leave off my acknowledgements that
they provide an AMAZING wall of text that 10 million people have agreed to and (maybe) 200 have read.

It pulls much of the baseline structure from the nodejs starter kit which may be found here:
https://github.com/sahat/hackathon-starter

The bootstrap theme in use is Flatly (http://bootswatch.com/flatly/)

The graphics for the ship, powerups, etc were all created by Kenny at www.kenny.nl and downloaded from http://opengameart.org/content/space-shooter-redux

I used the Phaser.io examples (available on  github as part of the Phaser.io download)
extensively as a learning tool as I'd not done any project work in phaser (or any html5
games framework, for that matter) previously.

I watched about a billion videos on Javascript coding and frameworks on codeschool.com in the
past couple weeks. THose dudes are awesome!

Setup on Koding VM
-------
For posterity, this is the setup I did on a clean VM to run this app. \
(Note, I removed a ton of auth and database code from the project when \
I found that running the full starter app with mongodb exceeded the \
disk space available on the koding free vm).

```
sudo apt-get install nodejs npm git

cd Applications
git clone https://github.com/P1xt/legalese.git
cd legalese
npm install
npm install forever

then add the following to an init init file /etc/init/legalese.conf and reboot(sudo reboot)

# legalese
#
# koding hackathon

description     "legalese"

start on startup

forever start /home/p1xt/Applications/legalese/app.js
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

```

This app was bootstrapped using the starter kit found here:
https://github.com/sahat/hackathon-starter

I removed all of the auth and mongodb as it wouldn't fit in the disk size available on Koding VM.
Mongodb was especially huge.

The following is the License as found on the starter kit:

License
-------

The MIT License (MIT)

Copyright (c) 2014 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
