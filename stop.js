#!/usr/bin/jjs -fv

var kubernetesName = "hero-command-test";

var deleteDeployment = "kubectl delete deployment " + kubernetesName;
$EXEC(deleteDeployment);
print($OUT);
print($ERR);

var deleteService = "kubectl delete service " + kubernetesName;
$EXEC(deleteService);
print($OUT);
print($ERR);