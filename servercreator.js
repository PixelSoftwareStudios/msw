const $ = require("jquery");
const fs = require("fs");
const os = require("os");
const opn = require("opn");
const exec = require("child_process").exec;
const execSync = require("child_process").execSync;
const spawn = require("child_process").spawn;
const ip = require("ip");
const request = require("request");

var divLog = document.getElementById("log");

var path;
var pathFix;
var serverType;
var serverVersion;
var serverVersionFix;
var serverPlugins;
var serverMods;

var latestForgeVersion;
var latestForgeVersionFix;

var mfVersionFix;
var mfVersion;

var javaCommand;
var scriptExtension;
var serverJarFileName;

var Spigot;

var EULAagreed;

exports.createServer = function(epath, eserverType, eserverVersion, eserverPlugins, eserverMods) {
	writetoLog("Starting...");
	path = epath;
	pathFix = path.replace(/\s/g, "\\ ");
	serverType = eserverType;
	serverVersion = eserverVersion;
	serverVersionFix = "mc" + serverVersion;
	serverPlugins = eserverPlugins;
	serverVersion = eserverMods;
	main();
}

function writetoLog(str) {
	divLog.innerHTML += str + "<br>";
}

function main() {
	writetoLog("Getting server type...");
	switch (serverType) {
		case "Vanilla":
			writetoLog("Found server type Vanilla");
		break;
		case "Spigot":
			writetoLog("Found server type Spigot");
		break;
		case "Forge":
			writetoLog("Found server type Forge");
		break;
	}

	writetoLog("Getting server version...");
	switch (serverVersionFix) {
		case "mc1.11.2":
			writetoLog("Found server version 1.11.2");
		break;

		case "mc1.11.1":
			writetoLog("Found server version 1.11.1");
		break;

		case "mc1.11":
			writetoLog("Found server version 1.11");
		break;

		case "mc1.10.2":
			writetoLog("Found server version 1.10.2");
		break;

		case "mc1.10.1":
			writetoLog("Found server version 1.10.1");
		break;

		case "mc1.10":
			writetoLog("Found server version 1.10");
		break;

		case "mc1.9.4":
			writetoLog("Found server version 1.9.4");
		break;

		case "mc1.9.2":
			writetoLog("Found server version 1.9.2");
		break;

		case "mc1.9":
			writetoLog("Found server version 1.9");
		break;

		case "mc1.8.9":
			writetoLog("Found server version 1.8.9");
		break;

		case "mc1.8.8":
			writetoLog("Found server version 1.8.8");
		break;

		case "mc1.8":
			writetoLog("Found server version 1.8");
		break;

		case "mc1.7.10":
			writetoLog("Found server version 1.7.10");
		break;

		case "mc1.7.4":
			writetoLog("Found server version 1.7.4");
		break;

		case "mc1.7.2":
			writetoLog("Found server version 1.7.2");
		break;
	}

	downloadServerJar();
}

function downloadServerJar() {
	if (serverType == "Vanilla") {
		request("https://s3.amazonaws.com/Minecraft.Download/versions/" + serverVersionFix.replace("mc", "") + "/minecraft_server." + serverVersionFix.replace("mc", "") + ".jar")
			.pipe(fs.createWriteStream(path + "minecraft_server." + serverVersionFix.replace("mc", "") + ".jar"));
		writetoLog("Downloaded vanilla server jar for " + serverVersionFix.replace("mc", ""));
		setupVanillaServer();
	} else if (serverType == "Spigot") {
		request.get("https://hub.spigotmc.org/jenkins/job/BuildTools/lastStableBuild/artifact/target/BuildTools.jar")
			.on("error", function(err) {
				console.error(err);
			})
  			.pipe(fs.createWriteStream(path + "BuildTools.jar"));
		writetoLog("Downloaded BuildTools");
		setupBuildTools();
		setupSpigot();
	} else if (serverType == "Forge") {
		writetoLog("Getting latest Forge version");
		request("http://files.minecraftforge.net/maven/net/minecraftforge/forge/promotions_slim.json", (err, resp, body) => {
			if (err) {
				console.error(err);
			}

			if (resp.statusCode == 200) {
				var body = JSON.parse(body.replace(`{
  "homepage": "http://files.minecraftforge.net/maven/net/minecraftforge/forge/",
  "promos": {`, "{").replace("}", ""));
				switch (serverVersionFix) {
					case "mc1.11.2":
						latestForgeVersion = body["1.11.2-recommended"];
						mfVersion = "1.11.2";
					break;

					case "mc1.11.1":
						latestForgeVersion = body["1.11-recommended"];
						mfVersion = "1.11";
					break;

					case "mc1.11":
						latestForgeVersion = body["1.11-recommended"];
						mfVersion = "1.11";
					break;

					case "mc1.10.2":
						latestForgeVersion = body["1.10.2-recommended"];
						mfVersion = "1.10.2";
					break;

					case "mc1.10.1":
						latestForgeVersion = body["1.10-recommended"];
						mfVersion = "1.10";
					break;

					case "mc1.10":
						latestForgeVersion = body["1.10-recommended"];
						mfVersion = "1.10";
					break;

					case "mc1.9.4":
						latestForgeVersion = body["1.9.4-recommended"];
						mfVersion = "1.9.4";
					break;

					case "mc1.9.2":
						latestForgeVersion = body["1.9-recommended"];
						mfVersion = "1.9";
					break;

					case "mc1.9":
						latestForgeVersion = body["1.9-recommended"];
						mfVersion = "1.9";
					break;

					case "mc1.8.9":
						latestForgeVersion = body["1.8.9-recommended"];
						mfVersion = "1.8.9";
					break;

					case "mc1.8.8":
						latestForgeVersion = body["1.8.8-recommended"];
						mfVersion = "1.8.8";
					break;

					case "mc1.8":
						latestForgeVersion = body["1.8-recommended"];
						mfVersion = "1.8";
					break;

					case "mc1.7.10":
						latestForgeVersion = body["1.7.10-recommended"];
						mfVersion = "1.7.10";
					break;

					case "mc1.7.4":
						latestForgeVersion = body["1.7.2-recommended"];
						mfVersion = "1.7.2";
					break;

					case "mc1.7.2":
						latestForgeVersion = body["1.7.2-recommended"];
						mfVersion = "1.7.2";
					break;
				}

				if (latestForgeVersion !== null && latestForgeVersion !== undefined && !latestForgeVersion.includes('"')) {
					writetoLog("Found latest Forge version " + latestForgeVersion);
					latestForgeVersionFix = "mc" + latestForgeVersion;
					mfVersionFix = "mc" + mfVersion;
					writetoLog("Downloading Forge installer");
					request("http://files.minecraftforge.net/maven/net/minecraftforge/forge/" + mfVersionFix.replace("mc", "") + "-" + latestForgeVersionFix.replace("mc", "") + "/forge-" + mfVersionFix.replace("mc", "") + "-" + latestForgeVersionFix.replace("mc", "") + "-installer.jar")
						.pipe(fs.createWriteStream(path + "forge-" + mfVersionFix.replace("mc", "") + "-" + latestForgeVersionFix.replace("mc", "") + "-installer.jar"));
					writetoLog("Downloaded Forge installer");

					setupForgeInstaller();
				} else {
					console.log("shit", latestForgeVersion);
				}
			}
		});
	}
}

function setupForgeInstaller() {
	writetoLog("Opening Forge installer");
	exec(`java -jar "forge-${mfVersionFix.replace("mc", "")}-${latestForgeVersionFix.replace("mc", "")}-installer.jar" --path `, {"cwd": path}, (error, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
		console.log(error);
	});
}

function setupBuildTools() {
	writetoLog("Setting up BuildTools");
	console.log(pathFix);
	var buildTools = exec(`java -jar BuildTools.jar --rev ${serverVersionFix.replace("mc", "")}`, {"cwd": path, "maxBuffer": 1000 * 1000}, (error, stdout, stderr) => {
		console.log(error);
		console.log(stderr);

		if (!error) {
			writetoLog("Finished setting up BuildTools");
			createStartFile();
			startSpigot();
		}
	});
	buildTools.stdout.on("data", data => {
		console.log(data.toString());
	});
}

function setupVanillaServer() {
	writetoLog("Setting up Vanilla server");
	createStartFile();
	fs.readFile(path + serverJarFileName + ".jar", (err, data) => {
	});
	exec(javaCommand, {"cwd": path}, (error, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
		console.log(error);
	});
}

function startSpigot(kill) {
	if (kill) {
		Spigot.kill();
	} else {
	 	Spigot = exec(`java -Xms1G -Xmx1G -jar spigot-${serverVersionFix.replace("mc", "")}.jar`, {"cwd": path});

		Spigot.stdout.on("data", data => {
			console.log(data.toString());
		});
	}
}

function setupSpigot() {
	startSpigot();
	writeEULA();
	startSpigot();
}

function writeEULA() {
	if (EULAagreed) {
		return false;
	} else {
		fs.readFile(path + "eula.txt", {"encoding": "utf-8"}, (err, data) => {
			if (err) {
				console.log(err);
			} else {
				var eulaTrue = data.replace("false", "true");
				fs.writeFile(path + "eula.txt", eulaTrue, "utf-8", err => {
					if (err) {
						console.log(err);
					} else {
						EULAagreed = true;
					}
				});
			}
		});
	}
}

function createStartFile() {
	if (serverType == "Vanilla") {
		serverJarFileName = `minecraft_server.${serverVersionFix.replace("mc", "")}`;
	} else if (serverType == "Spigot") {
		serverJarFileName = `spigot-${serverVersionFix.replace("mc", "")}.jar`;
	} else if (serverType == "Forge") {
		serverJarFileName = `forge-${serverVersionFix.replace("mc", "")}-${latestForgeVersionFix.replace("mc", "")}-universal`;
	}

	javaCommand = `java -Xms1G -Xmx1G -jar ${serverJarFileName} pause`;

	switch (os.platform()) {
		case "win32":
			fs.writeFileSync(path + "start.bat", javaCommand);
			writetoLog("Created a batch file for starting the server");
			scriptExtension = ".bat";
		break;

		case "darwin":
			fs.writeFileSync(path + "start.command", `#!/bin/bash\ncd "$(dirname "$0")"\n${javaCommand}`);
			fs.chmodSync(path + "start.command", 0755);
			writetoLog("Created a command file for starting the server");
			scriptExtension = ".command";
		break;

		case "linux":
			fs.writeFileSync(path + "start.sh", javaCommand);
			fs.chmodSync(path + "start.sh", 0755);
			writetoLog("Created a shell script for starting the server");
			scriptExtension = ".sh";
		break;
	}
}
