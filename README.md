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

It pulls much of the baseline structure from the nodejs starter kit which may be found here:
https://github.com/sahat/hackathon-starter

The bootstrap theme in use is Flatly (http://bootswatch.com/flatly/)

Setup on Koding VM
-------
For posterity, this is the setup I did on a clean VM to run this app.

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install nodejs npm mongodb git
sudo service mongodb start
Edited /etc/mongodb.conf to add "smallfiles=true" at the bottom of the file
sudo service mongodb restart

cd Applications
git clone https://github.com/P1xt/legalese.git
cd legalese
npm install
npm install forever

then add the following to the mongo db init file /etc/init/mongodb.conf and reboot(sudo reboot)

post-start script
    forever start /home/p1xt/Applications/legalese/app.js
    iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
end script

```

This app was bootstrapped using the starter kit found here:
https://github.com/sahat/hackathon-starter

The following is the License as found on the starter kit:

License
-------

The MIT License (MIT)

Copyright (c) 2014 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
