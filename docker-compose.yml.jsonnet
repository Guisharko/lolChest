local ddb = import 'ddb.docker.libjsonnet';

local domain = std.join('.', [std.extVar("core.domain.sub"), std.extVar("core.domain.ext")]);
local node_workdir = "/app";

ddb.Compose() {
	"services": {
		"node": ddb.Build("node")
		    + ddb.User()
		    + ddb.Binary("ncu", node_workdir, "ncu")
		    + ddb.Binary("npm", node_workdir, "npm")
		    + ddb.Binary("ng", node_workdir, "ng")
		    + ddb.VirtualHost("4200", domain, "app")
		    + {
			"volumes": [
				ddb.path.project + ":" + node_workdir + ":rw",
				"node-cache:/home/node/.cache:rw",
				"node-npm-packages:/home/node/.npm-packages:rw"
			],
		},
	}
}
