
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get over a pit filled with spikes and other less sensible things

var PrisonScene7 = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	PrisonScene.call(this);
}

PrisonScene7.prototype = new PrisonScene();

PrisonScene7.prototype.added = function()
{
	this.ffx = -800;
	this.ffy = -88;
	this.crystalSprite = this.createClickableSprite("crystal", this.ffx, this.ffy);
	this.crystalBob = 0;
	this.crystalSprite.addAction({
		action: "showInfoBox",
		target: "crystal7",
		continue: true
	})

	// create door
	var doorClickTarget = this.createClickableRegion(
		GameEngine.screenWidth/2-150, 0, 300, GameEngine.screenHeight);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "pitDoor",
		continue: true
	})
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison8",
		globalIsTrue: ["MAGNETS_PLACED","CARDBOARD_PLACED"]
	})

	var edge_left = this.createClickableSprite("pit_edge", -800, 450);
	var edge_right = this.createClickableSprite("pit_edge", 800, 450);
	var pitClickTarget = this.createClickableRegion(0, 450, 1600, 300);
	pitClickTarget.addAction({
		action: "interact",
		target: "magnets",
		setGlobals: ["MAGNETS_PLACED"],
		continue: true
	})
	pitClickTarget.addAction({
		action: "interact",
		target: "cardboard",
		setGlobals: ["CARDBOARD_PLACED"],
		globalIsTrue: ["MAGNETS_PLACED"],
		continue: true
	})
	pitClickTarget.addAction({
		action: "showInfoBox",
		target: "pit",
	})

	var pitMagnets = this.createClickableSprite("pit_magnets", 0, 450);
	pitMagnets.addTrue("MAGNETS_PLACED");
	pitMagnets.addFalse("CARDBOARD_PLACED");

	var pitBridge = this.createClickableSprite("pit_bridge", 0, 450);
	pitBridge.addTrue("CARDBOARD_PLACED");

	PrisonScene.prototype.added.call(this);
	this.removeFloor();

}

PrisonScene7.prototype.update = function()
{
	this.crystalBob += bmacSdk.deltaSec;
	this.crystalSprite.mesh.position.y = this.ffy + Math.cos(this.crystalBob) * 20 - 10;
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene7();
