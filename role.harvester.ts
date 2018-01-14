///<reference path="Creeper.ts" />
var roleBuilder = require('role.builder');

var harvesterSource = "59f1a60c82100e1594f3f6e4";
var harvesterDestination = "5a5a44db111a065fc1c92308";

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let creeper = new Creeper(creep);
        creeper.harvest();
	}
};

module.exports = roleHarvester;