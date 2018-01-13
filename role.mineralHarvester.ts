var functionsCreep = require('functions.creep');

var roleMineralHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, mineralSource, storageContainer) {
        
        if(!creep.memory.returnHarvest &&  _.sum(creep.carry) == creep.carryCapacity) {
	        creep.memory.returnHarvest = true;
	    /*} else if (creep.memory.returnHarvest && creep.carry.energy == 0) {*/
	    } else {
	        creep.memory.returnHarvest = false;
	    }
	    
	    if(!creep.memory.returnHarvest) {
	        
            // Harvest resource
            if (mineralSource) {
                var result = functionsCreep.HarvestResource(creep, mineralSource);
                return;
            }
            
        } else {
            
            // Store resource
            if (storageContainer && storageContainer.storeCapacity > _.sum(storageContainer.store)) {
                var result = functionsCreep.TransferResource(creep, storageContainer, RESOURCE_ENERGY);
                return;
            }
            
        }
        
	}
};

module.exports = roleMineralHarvester;