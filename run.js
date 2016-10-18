#!/usr/bin/jjs -fv

var containerName = "hero-command";
var kubernetesName = "hero-command-test";
var FileWriter = Java.type("java.io.FileWriter");

var setEnvVariable = "KUBERNETES_HOST_NAME=" + kubernetesName;
$EXEC(setEnvVariable);
print($OUT);
print($ERR);

var deploymentPath = containerName + "-deployment.yml";
var fw = new FileWriter(deploymentPath);
fw.write("apiVersion: extensions/v1beta1\n");
fw.write("kind: Deployment\n");
fw.write("metadata:\n");
fw.write("  name: hero-command-test\n");
fw.write("spec:\n");
fw.write("  replicas: 1\n");
fw.write("  template:\n");
fw.write("    metadata:\n");
fw.write("      labels:\n");
fw.write("        name: hero-command-test\n");
fw.write("    spec:\n");
fw.write("      containers:\n");
fw.write("      - name: hero-command-test\n");
fw.write("        image: robertbrem/heros-command:" + $ENV.VERSION + "\n");
fw.write("        ports:\n");
fw.write("          - containerPort: 8080\n");
fw.close();

var startHeroCommand = "kubectl create -f " + deploymentPath;
$EXEC(startHeroCommand);
print($OUT);
print($ERR);

var servicePath = containerName + "-service.yml";
var fw = new FileWriter(servicePath);
fw.write("apiVersion: v1\n");
fw.write("kind: Service\n");
fw.write("metadata:\n");
fw.write("  name: hero-command-test\n");
fw.write("  labels:\n");
fw.write("    name: hero-command-test\n");
fw.write("spec:\n");
fw.write("  ports:\n");
fw.write("  - name: main\n");
fw.write("    port: 8282\n");
fw.write("    targetPort: 8080\n");
fw.write("    nodePort: 31080\n");
fw.write("  selector:\n");
fw.write("    name: hero-command-test\n");
fw.write("  type: NodePort\n");
fw.close();

var startService = "kubectl create -f " + servicePath;
$EXEC(startService);
print($OUT);
print($ERR);

var testUrl = "curl --write-out %{http_code} --silent --output /dev/null http://hero-command-test:8282/hero-command/resources/heros";
$EXEC(testUrl);
while ($OUT != "200") {
    $EXEC("sleep 1");
    $EXEC(testUrl);
    print($OUT);
}