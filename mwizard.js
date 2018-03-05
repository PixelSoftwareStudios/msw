const remote = require("electron").remote;
const $ = require("jquery");
const serverCreator = require("./servercreator.js");

let serverType;
let serverVersion;
let serverPlugins = [];
let serverMods = [];

var btnChooseFolder = document.getElementById("btnChooseFolder");

var btnNextStep1 = document.getElementById("btnNextStep1");
var btnNextStep2 = document.getElementById("btnNextStep2");
var btnNextStep3 = document.getElementById("btnNextStep3");
var btnNextStep4 = document.getElementById("btnNextStep4");
var btnNextStep5 = document.getElementById("btnNextStep5");
var btnNextStep6 = document.getElementById("btnNextStep6");

var btnGoBack1 = document.getElementById("btnGoBack1");
var btnGoBack2 = document.getElementById("btnGoBack2");
var btnGoBack3 = document.getElementById("btnGoBack3");
var btnGoBack4 = document.getElementById("btnGoBack4");
var btnGoBack5 = document.getElementById("btnGoBack5");

var btnTypeVanilla = document.getElementById("btnTypeVanilla");
var btnTypeSpigot = document.getElementById("btnTypeSpigot");
var btnTypeForge = document.getElementById("btnTypeForge");

var btnSelectAll = document.getElementById("selectAll");
var btnSelectAllMods = document.getElementById("selectAllMods");

var selVersion = document.getElementById("selVersion");
var selVersionValue = selVersion.value;

var path = "/Users/mjolnir/Desktop/Servers and Server stuff/TestServerMSW/";
var pathInput = document.getElementById("pathInput");

var divMainScreen = document.getElementById("mainScreen");
var divSelectType = document.getElementById("selectType");
var divSelectVersion = document.getElementById("selectVersion");
var divSelectPlugins = document.getElementById("selectPlugins");
var divSelectMods = document.getElementById("selectMods");
var divServerProperties = document.getElementById("selectServerProperties");
var divConfirmation = document.getElementById("confirmation");
var divCreatingServer = document.getElementById("creatingServer");
var divDynamicScroll = document.getElementById("dynamicScrollDiv");
var divDynamicScrollLocation = document.getElementById("dynamicScrollLocationDiv");

var tableSpecs = document.getElementById("specsTable");
var thDynamic = document.getElementById("thdynamic");
var tdServerLocation = document.getElementById("tdServerLocation");
var tdServerType = document.getElementById("tdServerType");
var tdServerVersion = document.getElementById("tdServerVersion");
var tdDynamic = document.getElementById("tddynamic")

var checkBoxEssentials = document.getElementById("checkBoxE");
var checkBoxEssentialsChat = document.getElementById("checkBoxEC");
var checkBoxWorldEdit = document.getElementById("checkBoxWE");
var checkBoxFastAsyncWorldEdit = document.getElementById("checkBoxFAWE");
var checkBoxWorldGuard = document.getElementById("checkBoxWG");
var checkBoxPermissionsEx = document.getElementById("checkBoxPEX");
var checkBoxSimpleBackup = document.getElementById("checkBoxSB");
var checkBoxChatColor2 = document.getElementById("checkBoxCC2");
var checkBoxChairs = document.getElementById("checkBoxC");
var checkBoxSuperVanish = document.getElementById("checkBoxSV");
var checkBoxProtocolLib = document.getElementById("checkBoxPL");
var checkBoxEndlessEnchant = document.getElementById("checkBoxEE");
var checkBoxMobStacker = document.getElementById("checkBoxMS");

var checkBoxForgeWorldEdit = document.getElementById("checkBoxFWE");
var checkBoxMrCrayfishsFurnitureMod = document.getElementById("checkBoxCFM");
var checkBoxColorChat = document.getElementById("checkBoxFCC");
var checkBoxLuckyBlock = document.getElementById("checkBoxLB");
var checkBoxBuildingBlocks = document.getElementById("checkBoxBB");
var checkBoxQuarkMod = document.getElementById("checkBoxVQM");
var checkBoxVeinMiner = document.getElementById("checkBoxVM");
var checkBoxBuildCraft = document.getElementById("checkBoxBC");
var checkBoxIronChests = document.getElementById("checkBoxIC");
var checkBoxHarvestCraft = document.getElementById("checkBoxPHC");
var checkBoxFlansMod = document.getElementById("checkBoxFM");
var checkBoxPixelmon = document.getElementById("checkBoxPM");

console.log("Started");

setInterval(function() {
	if (selVersion.value == selVersionValue) {

	} else if (selVersion.value !== selVersionValue) {
		selVersionValue = selVersion.value;
		onVersionChange();
	}
}, 500);

function onVersionChange() {
	var defaultState = false;
	switch (selVersion.value) {
		case "mc1112":
			serverVersion = "1.11.2";
			defaultState = false;
		break;

		case "mc1111":
			serverVersion = "1.11.1";
			defaultState = false;
		break;

		case "mc111":
			serverVersion = "1.11";
			defaultState = false;
		break;

		case "mc1102":
			serverVersion = "1.10.2";
			defaultState = false;
		break;

		case "mc1101":
			serverVersion = "1.10.1";
			defaultState = false;
		break;

		case "mc110":
			serverVersion = "1.10";
			defaultState = false;
		break;

		case "mc194":
			serverVersion = "1.9.4";
			defaultState = false;
		break;

		case "mc192":
			serverVersion = "1.9.2";
			defaultState = false;
		break;

		case "mc19":
			serverVersion = "1.9";
			defaultState = false;
		break;

		case "mc189":
			serverVersion = "1.8.9";
			defaultState = false;
		break;

		case "mc188":
			serverVersion = "1.8.8";
			defaultState = false;
		break;

		case "mc18":
			serverVersion = "1.8";
			defaultState = false;
		break;

		case "mc1710":
			serverVersion = "1.7.10";
			defaultState = false;
		break;

		case "mc174":
			serverVersion = "1.7.4";
			defaultState = false;
		break;

		case "mc172":
			serverVersion = "1.7.2";
			defaultState = false;
		break;

		case "mcversion":
			defaultState = true;
		break;
	}

	if (!defaultState) {
		btnNextStep3.disabled = false;
	}
}

$(btnChooseFolder).click(function() {
	remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
		properties: ["openDirectory", "createDirectory"]
	}, (filePaths) => {
		if (filePaths !== undefined) {
			path = filePaths[0];
			pathInput.value = path;
			btnNextStep1.disabled = false;
		}
	});
});

$(btnNextStep1).click(function() {
	$(divMainScreen).css("display", "none");
	$("html").css("padding-left", "0");
	$("body").css("padding-left", "0");
	$(divSelectType).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
});

$(btnNextStep2).click(function() {
	$(divSelectType).css("display", "none");
	$(divSelectVersion).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
});

$(btnNextStep3).click(function() {
	$(divSelectVersion).css("display", "none");
	divDynamicScrollLocation.innerHTML = path.replace(/ /g, "");
	tdServerVersion.innerHTML = serverVersion;
	tdServerType.innerHTML = serverType;
	if (serverType == "Spigot") {
		$(divSelectPlugins).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
	} else if (serverType == "Forge") {
		// switch (serverVersion) {
		//
		// }
		$(divSelectMods).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
	} else if (serverType == "Vanilla") {
		$(divConfirmation).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
	}
});

$(btnNextStep4).click(function() {
	$(divConfirmation).css("display", "none");
	$(divCreatingServer).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
	serverCreator.createServer(path, serverType, serverVersion, serverPlugins, serverMods);
});

$(btnNextStep5).click(function() {
	thDynamic.innerHTML = "Server Plugins";
	$(thDynamic).css("display", "table-cell");
	$(tdDynamic).css("display", "table-cell");

	if (serverPlugins.length) {
		divDynamicScroll.innerHTML = serverPlugins;
	} else {
		tdDynamic.innerHTML = "None, or downloading by hand";
	}
	$(divSelectPlugins).css("display", "none");
	$(divConfirmation).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
});

$(btnNextStep6).click(function() {
	thDynamic.innerHTML = "Server Mods";
	$(thDynamic).css("display", "table-cell");
	$(tdDynamic).css("display", "table-cell");

	if (serverMods.length) {
		divDynamicScroll.innerHTML = serverMods;
	} else {
		tdDynamic.innerHTML = "None, or downloading by hand";
	}
	$(divSelectMods).css("display", "none");
	$(divConfirmation).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
});

$(btnGoBack1).click(function() {
	$(divSelectType).css("display", "none");
	$("html").css("padding-left", "2px");
	$("body").css("padding-left", "2px");
	$(divMainScreen).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
});

$(btnGoBack2).click(function() {
	$(divSelectVersion).css("display", "none");
	$(divSelectType).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
});

$(btnGoBack3).click(function() {
	$(divConfirmation).css("display", "none");
	if (serverType == "Vanilla") {
		$(divSelectVersion).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
	} else if (serverType == "Spigot") {
		$(divSelectPlugins).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
	} else if (serverType == "Forge") {
		$(divSelectMods).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
	}
});

$(btnGoBack4).click(function() {
	$(divSelectPlugins).css("display", "none");
	$(divSelectVersion).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
});

$(btnGoBack5).click(function() {
	$(divSelectMods).css("display", "none");
	$(divSelectVersion).css({"display": "block", "margin": 0, "padding": 0, "width": "100%", "height": "100%"});
});

$(btnTypeVanilla).click(function() {
	serverType = "Vanilla";
	btnNextStep2.disabled = false;

	$(btnTypeSpigot).css("border-color", "buttonface");
	$(btnTypeSpigot).css("border-style", "outset");
	$(btnTypeForge).css("border-color", "buttonface");
	$(btnTypeForge).css("border-style", "outset");
	$(btnTypeVanilla).css("border-style", "solid");
	$(btnTypeVanilla).css("border-color", "green");
});

$(btnTypeSpigot).click(function() {
	serverType = "Spigot";
	btnNextStep2.disabled = false;

	$(btnTypeVanilla).css("border-color", "buttonface");
	$(btnTypeVanilla).css("border-style", "outset");
	$(btnTypeForge).css("border-color", "buttonface");
	$(btnTypeForge).css("border-style", "outset");
	$(btnTypeSpigot).css("border-style", "solid");
	$(btnTypeSpigot).css("border-color", "green");
});

$(btnTypeForge).click(function() {
	serverType = "Forge";
	btnNextStep2.disabled = false;

	$(btnTypeVanilla).css("border-color", "buttonface");
	$(btnTypeVanilla).css("border-style", "outset");
	$(btnTypeSpigot).css("border-color", "buttonface");
	$(btnTypeSpigot).css("border-style", "outset");
	$(btnTypeForge).css("border-style", "solid");
	$(btnTypeForge).css("border-color", "green");
});

$(btnSelectAll).click(function() {
	$(checkBoxEssentials).prop("checked", true).trigger("change");
	$(checkBoxEssentialsChat).prop("checked", true).trigger("change");
	$(checkBoxWorldEdit).prop("checked", true).trigger("change");
	$(checkBoxFastAsyncWorldEdit).prop("checked", true).trigger("change");
	$(checkBoxWorldGuard).prop("checked", true).trigger("change");
	$(checkBoxPermissionsEx).prop("checked", true).trigger("change");
	$(checkBoxSimpleBackup).prop("checked", true).trigger("change");
	$(checkBoxChatColor2).prop("checked", true).trigger("change");
	$(checkBoxChairs).prop("checked", true).trigger("change");
	$(checkBoxSuperVanish).prop("checked", true).trigger("change");
	$(checkBoxProtocolLib).prop("checked", true).trigger("change");
	$(checkBoxEndlessEnchant).prop("checked", true).trigger("change");
	$(checkBoxMobStacker).prop("checked", true).trigger("change");
});

$(btnSelectAllMods).click(function() {
	$(checkBoxForgeWorldEdit).prop("checked", true).trigger("change");
	$(checkBoxMrCrayfishsFurnitureMod).prop("checked", true).trigger("change");
	$(checkBoxColorChat).prop("checked", true).trigger("change");
	$(checkBoxLuckyBlock).prop("checked", true).trigger("change");
	$(checkBoxBuildingBlocks).prop("checked", true).trigger("change");
	$(checkBoxQuarkMod).prop("checked", true).trigger("change");
	$(checkBoxVeinMiner).prop("checked", true).trigger("change");
	$(checkBoxBuildCraft).prop("checked", true).trigger("change");
	$(checkBoxIronChests).prop("checked", true).trigger("change");
	$(checkBoxHarvestCraft).prop("checked", true).trigger("change");
	$(checkBoxFlansMod).prop("checked", true).trigger("change");
	$(checkBoxPixelmon).prop("checked", true).trigger("change");
});

$(checkBoxEssentials).change(function() {
	if (checkBoxEssentials.checked) {
		if (serverPlugins[0] == "Essentials"){

		} else {
			serverPlugins[0] = "Essentials";
		}
	} else {
		if (serverPlugins[0] == "Essentials"){
			delete serverPlugins[0];
		} else {

		}
	}
	console.log(serverPlugins);
});

$(checkBoxEssentialsChat).change(function() {
	if (checkBoxEssentialsChat.checked) {
		if (serverPlugins[1] == "EssentialsChat"){

		} else {
			serverPlugins[1] = "EssentialsChat";
		}
	} else {
		if (serverPlugins[1] == "EssentialsChat"){
			delete serverPlugins[1];
		} else {

		}
	}
	console.log(serverPlugins);
});

$(checkBoxWorldEdit).change(function() {
	if (checkBoxWorldEdit.checked) {
		if (serverPlugins[2] == "WorldEdit"){

		} else {
			serverPlugins[2] = "WorldEdit";
		}
	} else {
		if (serverPlugins[2] == "WorldEdit"){
			delete serverPlugins[2];
		} else {

		}
	}
	console.log(serverPlugins);
});

$(checkBoxFastAsyncWorldEdit).change(function() {
	if (checkBoxFastAsyncWorldEdit.checked) {
		if (serverPlugins[3] == "FastAsyncWorldEdit"){

		} else {
			serverPlugins[3] = "FastAsyncWorldEdit";
		}
	} else {
		if (serverPlugins[3] == "FastAsyncWorldEdit"){
			delete serverPlugins[3];
		} else {

		}
	}
	console.log(serverPlugins);
});

$(checkBoxWorldGuard).change(function() {
	if (checkBoxWorldGuard.checked) {
		if (serverPlugins[4] == "WorldGuard"){

		} else {
			serverPlugins[4] = "WorldGuard";
		}
	} else {
		if (serverPlugins[4] == "WorldGuard"){
			delete serverPlugins[4];
		} else {

		}
	}
	console.log(serverPlugins);
});

$(checkBoxPermissionsEx).change(function() {
	if (checkBoxPermissionsEx.checked) {
		if (serverPlugins[5] == "PermissionsEx"){

		} else {
			serverPlugins[5] = "PermissionsEx";
		}
	} else {
		if (serverPlugins[5] == "PermissionsEx"){
			delete serverPlugins[5];
		} else {

		}
	}
	console.log(serverPlugins);
});

$(checkBoxSimpleBackup).change(function() {
	if (checkBoxSimpleBackup.checked) {
		if (serverPlugins[6] == "SimpleBackup"){

		} else {
			serverPlugins[6] = "SimpleBackup";
		}
	} else {
		if (serverPlugins[6] == "SimpleBackup"){
			delete serverPlugins[6];
		} else {

		}
	}
	console.log(serverPlugins);
});

$(checkBoxChatColor2).change(function() {
	if (checkBoxChatColor2.checked) {
		if (serverPlugins[7] == "ChatColor2"){
		} else {
			serverPlugins[7] = "ChatColor2";
		}
	} else {
		if (serverPlugins[7] == "ChatColor2"){
			delete serverPlugins[7];
		} else {
		}
	}
	console.log(serverPlugins);
});

$(checkBoxChairs).change(function() {
	if (checkBoxChairs.checked) {
		if (serverPlugins[8] == "Chairs"){
		} else {
			serverPlugins[8] = "Chairs";
		}
	} else {
		if (serverPlugins[8] == "Chairs"){
			delete serverPlugins[8];
		} else {
		}
	}
	console.log(serverPlugins);
});

$(checkBoxSuperVanish).change(function() {
	if (checkBoxSuperVanish.checked) {
		if (serverPlugins[9] == "SuperVanish"){
		} else {
			serverPlugins[9] = "SuperVanish";
		}
	} else {
		if (serverPlugins[9] == "SuperVanish"){
			delete serverPlugins[9];
		} else {
		}
	}
	console.log(serverPlugins);
});

$(checkBoxProtocolLib).change(function() {
	if (checkBoxProtocolLib.checked) {
		if (serverPlugins[10] == "ProtocolLib"){
		} else {
			serverPlugins[10] = "ProtocolLib";
		}
	} else {
		if (serverPlugins[10] == "ProtocolLib"){
			delete serverPlugins[10];
		} else {
		}
	}
	console.log(serverPlugins);
});

$(checkBoxEndlessEnchant).change(function() {
	if (checkBoxEndlessEnchant.checked) {
		if (serverPlugins[11] == "EndlessEnchant"){
		} else {
			serverPlugins[11] = "EndlessEnchant";
		}
	} else {
		if (serverPlugins[11] == "EndlessEnchant"){
			delete serverPlugins[11];
		} else {
		}
	}
	console.log(serverPlugins);
});

$(checkBoxMobStacker).change(function() {
	// if (checkBoxMobStacker.checked) {
	// 	serverPlugins.push("MobStacker");
	// } else {
	// 	if (serverPlugins[12] == "MobStacker") {
	// 		delete serverPlugins[12];
	// 	} else {
	// 		for (var i = 0; i < serverPlugins; i++) {
	// 			if (serverPlugins[i] == "MobStacker") {
	// 				delete serverPlugins[i];
	// 				break;
	// 			}
	// 		}
	// 	}
	// }
	if (checkBoxMobStacker.checked) {
		if (serverPlugins[12] == "MobStacker"){
		} else {
			serverPlugins[12] = "MobStacker";
		}
	} else {
		if (serverPlugins[12] == "MobStacker"){
			delete serverPlugins[12];
		} else {
		}
	}
	console.log(serverPlugins);
});


$(checkBoxForgeWorldEdit).change(function() {
	if (checkBoxForgeWorldEdit.checked) {
		if (serverMods[0] == "WorldEdit"){
		} else {
			serverMods[0] = "WorldEdit";
		}
	} else {
		if (serverMods[0] == "WorldEdit"){
			delete serverMods[0];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxMrCrayfishsFurnitureMod).change(function() {
	if (checkBoxMrCrayfishsFurnitureMod.checked) {
		if (serverMods[1] == "MrCrayfish'sFurnitureMod"){
		} else {
			serverMods[1] = "MrCrayfish'sFurnitureMod";
		}
	} else {
		if (serverMods[1] == "MrCrayfish'sFurnitureMod"){
			delete serverMods[1];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxColorChat).change(function() {
	if (checkBoxColorChat.checked) {
		if (serverMods[2] == "ColorChat"){
		} else {
			serverMods[2] = "ColorChat";
		}
	} else {
		if (serverMods[2] == "ColorChat"){
			delete serverMods[2];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxLuckyBlock).change(function() {
	if (checkBoxLuckyBlock.checked) {
		if (serverMods[3] == "LuckyBlocks"){
		} else {
			serverMods[3] = "LuckyBlocks";
		}
	} else {
		if (serverMods[3] == "LuckyBlocks"){
			delete serverMods[3];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxBuildingBlocks).change(function() {
	if (checkBoxBuildingBlocks.checked) {
		if (serverMods[4] == "BuildingBlocks"){
		} else {
			serverMods[4] = "BuildingBlocks";
		}
	} else {
		if (serverMods[4] == "BuildingBlocks"){
			delete serverMods[4];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxQuarkMod).change(function() {
	if (checkBoxQuarkMod.checked) {
		if (serverMods[5] == "Vazkii'sQuarkMod"){
		} else {
			serverMods[5] = "Vazkii'sQuarkMod";
		}
	} else {
		if (serverMods[5] == "Vazkii'sQuarkMod"){
			delete serverMods[5];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxVeinMiner).change(function() {
	if (checkBoxVeinMiner.checked) {
		if (serverMods[6] == "VeinMiner"){
		} else {
			serverMods[6] = "VeinMiner";
		}
	} else {
		if (serverMods[6] == "VeinMiner"){
			delete serverMods[6];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxBuildCraft).change(function() {
	if (checkBoxBuildCraft.checked) {
		if (serverMods[7] == "BuildCraft"){
		} else {
			serverMods[7] = "BuildCraft";
		}
	} else {
		if (serverMods[7] == "BuildCraft"){
			delete serverMods[7];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxIronChests).change(function() {
	if (checkBoxIronChests.checked) {
		if (serverMods[8] == "IronChests"){
		} else {
			serverMods[8] = "IronChests";
		}
	} else {
		//<--Hail Satan
		if (serverMods[8] == "IronChests"){
			delete serverMods[8];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxHarvestCraft).change(function() {
	if (checkBoxHarvestCraft.checked) {
		if (serverMods[9] == "Pam'sHarvestCraftMod"){
		} else {
			serverMods[9] = "Pam'sHarvestCraftMod";
		}
	} else {
		if (serverMods[9] == "Pam'sHarvestCraftMod"){
			delete serverMods[9];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxFlansMod).change(function() {
	if (checkBoxFlansMod.checked) {
		if (serverMods[10] == "FlansMod"){
		} else {
			serverMods[10] = "FlansMod";
		}
	} else {
		if (serverMods[10] == "FlansMod"){
			delete serverMods[10];
		} else {
		}
	}
	console.log(serverMods);
});

$(checkBoxPixelmon).change(function() {
	if (checkBoxPixelmon.checked) {
		if (serverMods[11] == "Pixelmon"){
		} else {
			serverMods[11] = "Pixelmon";
		}
	} else {
		if (serverMods[11] == "Pixelmon"){
			delete serverMods[11];
		} else {
		}
	}
	console.log(serverMods);
});
