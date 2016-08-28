
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var FieldScene = function()
{
	this.backgroundUrl = "media/heaven_sky_gradient.png";

	Scene.call(this);
}

FieldScene.prototype = new Scene();

FieldScene.prototype.added = function()
{
	// create characters
	var investor = this.createClickableSprite("johnson15_sprite", -200, -200);
	investor.addAction({
		action: "triggerConversation",
		target: require("../data/investor_conversation.json")
	})
	var damGuy = this.createClickableSprite("johnson15_sprite", -300, -300);
	damGuy.addAction({
		action: "triggerConversation",
		target: require("../data/dam_builder_conversation.json")
	})
	var speakerGuy = this.createClickableSprite("johnson15_sprite", -400, -200);
	speakerGuy.addAction({
		action: "triggerConversation",
		target: require("../data/prophet_conversation.json")
	})
	var cardboardBox = this.createClickableSprite("cardboardbox", 200, 200);
	cardboardBox.addAction({
		action: "collectItem",
		target: "cardboard_box"
	})

	Scene.prototype.added.call(this);
}

FieldScene.prototype.update = function()
{
	Scene.prototype.update.call(this);
}

module.exports = new FieldScene();
