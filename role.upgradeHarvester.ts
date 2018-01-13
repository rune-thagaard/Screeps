var upgraderHarvesterSource = "59f1a60c82100e1594f3f6e5";
var upgraderHarvesterDestination = "59f1a60c82100e1594f3f6e6";

var roleUpgradeHarvester = {


    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.returnHarvest && creep.carry.energy == 0) {
            creep.memory.returnHarvest = false;
	    }
	    if(!creep.memory.returnHarvest && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.returnHarvest = true;
	    }
	    
	    if(!creep.memory.returnHarvest) {
	        
	        var source = Game.getObjectById(upgraderHarvesterSource);
	        
            // Send creep to closest source
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            
        } else {
            
            var upgraderLink = Game.getObjectById(upgraderHarvesterDestination);
            var upgraderLinkSpace = upgraderLink.storeCapacity - upgraderLink.store;
            var transferAmount;
            
            if (upgraderLinkSpace < creep.carry.energy)
                transferAmount = upgraderLinkSpace;
            else
                transferAmount = creep.carry.energy;
            
            if(creep.transfer(upgraderLink, RESOURCE_ENERGY, transferAmount)) {
                creep.moveTo(upgraderLink);
            }
        }
        
	}
};

module.exports = roleUpgradeHarvester;