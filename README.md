IDW_server
I use the node.js to build this server which can send a request for getting the IDW result.
This server can be easy to help you use the IDW adn get the IDW result.
Before using it, we can build the environment first.
Step 1. Use Command Line in this folder:
npm install
this can help u install the modules according to the package.json Step 2. build this server:
node ./bin/www
it can help u start this server. Finally, enjoy this tool to get your IDW result.

User guide
User guide
you should let your points like the following format: [[X,Y,Z],[X,Y,Z],[X,Y,Z],[X,Y,Z]......]

coordinate: WGS84
X: Lon
Y: Lat
Z: value

Second,you need to set the cellsize and the weight in the homepage,then you can send the request to get the result.

output is a GeoJSON file
