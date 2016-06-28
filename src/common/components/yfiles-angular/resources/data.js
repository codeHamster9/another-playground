var nodeData = [{
  "position": "Account",
  "name": "Aws Account 1",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/AWS_Simple_Icons_AWS_Cloud.svg",
  "assistant": true
}, {
  "position": "Region",
  "name": "Region A",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/Networking_AmazonRoute53_hostedzone.svg",
  "assistant": true
}, {
  "position": "Account",
  "name": "Aws Account 2",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/AWS_Simple_Icons_AWS_Cloud.svg",
  "assistant": true
}, {
  "position": "Region",
  "name": "Region C",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/Networking_AmazonRoute53_hostedzone.svg",
  "assistant": true
}, {
  "position": "Region",
  "name": "Region B",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/Networking_AmazonRoute53_hostedzone.svg",
  "assistant": true
}, {
  "position": "Region",
  "name": "Region D",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/Networking_AmazonRoute53_hostedzone.svg",
  "assistant": true
}, {
  "position": "VPC",
  "name": "VPC 1",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/AWS_Simple_Icons_Virtual_Private_Cloud.svg",
  "assistant": true
}, {
  "position": "VPC",
  "name": "VPC 2",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/AWS_Simple_Icons_Virtual_Private_Cloud.svg",
  "assistant": true
}, {
  "position": "VPC",
  "name": "VPC 3",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/AWS_Simple_Icons_Virtual_Private_Cloud.svg",
  "assistant": true
}, {
  "position": "VPC",
  "name": "VPC 4",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/AWS_Simple_Icons_Virtual_Private_Cloud.svg",
  "assistant": true
}, {
  "position": "Instance",
  "name": "Instance 1",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/Compute_AmazonECR.svg",
  "assistant": true
}, {
  "position": "Instance",
  "name": "Instance 2",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/Compute_AmazonECR.svg",
  "assistant": true
}, {
  "position": "Instance",
  "name": "Instance 3",
  "businessUnit": "Accounting",
  "status": "present",
  "icon": "assets/Compute_AmazonECR.svg",
  "assistant": true
}];
var edgeData = [
  { "from": "Aws Account 1", "to": "Region A" },
  { "from": "Aws Account 1", "to": "Region B" },
  { "from": "Aws Account 2", "to": "Region C" },
  { "from": "Aws Account 2", "to": "Region D" },
  { "from": "Region A", "to": "VPC 1" },
  { "from": "Region A", "to": "VPC 3" },
  { "from": "Region B", "to": "VPC 2" },
  { "from": "Region C", "to": "VPC 4" },
  { "from": "VPC 1", "to": "Instance 1" },
  { "from": "VPC 1", "to": "Instance 2" },
  { "from": "VPC 4", "to": "Instance 3" },
];

var groupsData = [
  { id:'Account'},
  { id:'Region', parent: 'Account' },
  { id:'VPC', parent: 'Region' },
  { id:'Instance', parent: 'VPC' }
];
