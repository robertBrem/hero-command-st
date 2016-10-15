#!/usr/bin/jjs -fv

var containerName = "hero-command";

var stopHeroCommand = "docker stop " + containerName;
$EXEC(stopHeroCommand);
print($OUT);
print($ERR);

var rmHeroCommand = "docker rm " + containerName;
$EXEC(rmHeroCommand);
print($OUT);
print($ERR);