#!/usr/bin/jjs -fv

var containerName = "hero-command";
var startHeroCommand = "docker run -d -p 8282:8080 --name " + containerName + " robertbrem/heros-command:" + $ENV.VERSION;

$EXEC(startHeroCommand);
print($OUT);
print($ERR);


var testUrl = "curl --write-out %{http_code} --silent --output /dev/null http://localhost:8282/hero-command/resources/heros";
$EXEC(testUrl);
while ($OUT != "200") {
    $EXEC("sleep 1");
    $EXEC(testUrl);
    print($OUT);
}