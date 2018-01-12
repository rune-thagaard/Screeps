var functionsCreep = require('functions.creep');

var spawnFeeder = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.carry.energy > 0) {
	        var tower = Game.getObjectById("5dad3f9a248e49e");
	        var tower2 = Game.getObjectById("5e023cf9fc4ea90");
	        
	        // Find and fill spawn and extensions with energy
	        var target = functionsCreep.CheckForMissingEnergyInSpawn(creep);
            if(target) {
                var result = functionsCreep.TransferResource(creep, target, RESOURCE_ENERGY);
                return;
            } 
            
            // Fill towers with energy
            if (tower || tower2)
            {
                var target;
                if (tower && tower.energy < tower.energyCapacity - 100)
                    target = tower;
                else if (tower2 && tower2.energy < tower2.energyCapacity - 100)
                    target = tower2;
                
                if (target)
                {
                    functionsCreep.TransferResource(creep, target, RESOURCE_ENERGY);
                    return;
                }
            }
            
            // Dumb energy to storage container
            if (creep.room.storage && creep.room.storage.storeCapacity > _.sum(creep.room.storage.store)) {
                var result = functionsCreep.TransferResource(creep, creep.room.storage, RESOURCE_ENERGY);
                return;
            }
            
	    } else {
	        
            var energyStorageLink = Game.getObjectById("d5dd32eead2962a");
            var harvesterContainer = Game.getObjectById("5b662f1ee3b1a96");

	        // Get energy from link
	        if (energyStorageLink && energyStorageLink.energy > 500) {
	            var result = functionsCreep.WithdrawResource(creep, energyStorageLink, RESOURCE_ENERGY);
                return;
	        }
	        
	        // Get energy from harvester container
	        if (harvesterContainer && harvesterContainer.store.energy > 0) {
	            var result = functionsCreep.WithdrawResource(creep, harvesterContainer, RESOURCE_ENERGY);
                return;
	        }
	        
	        // Get energy from storage
	        if (creep.room.storage && creep.room.storage.store.energy > 0) {
	            var result = functionsCreep.WithdrawResource(creep, creep.room.storage, RESOURCE_ENERGY);
                return;
	        }
	        
	    }
	    
	}

};

module.exports = spawnFeeder;