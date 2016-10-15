#!/usr/bin/jjs -fv

var containerName = "hero-command";
var startHeroCommand = "docker run -d -p 8282:8080 --name " + containerName + " robertbrem/heros-command:" + $ENV.VERSION;

$EXEC(startHeroCommand);
print($OUT);
print($ERR);