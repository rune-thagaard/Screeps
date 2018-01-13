var upgraderSource = "fde480b7fc7b52d";

var roleUpgrader = {
    
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }
	    
	    if(creep.memory.upgrading) {
	           var response = creep.upgradeController(creep.room.controller); 
	        if(response == ERR_NOT_IN_RANGE) {
                var response2 = creep.moveTo(creep.room.controller);
                
            }
	    }
	    else {
	        
	        var upgraderLink = Game.getObjectById(upgraderSource);
	        var result = creep.withdraw(upgraderLink, RESOURCE_ENERGY, creep.carryCapacity - creep.carry);
	        
            if(result == ERR_NOT_IN_RANGE)
                creep.moveTo(upgraderLink);
	        else if (result == ERR_NOT_ENOUGH_RESOURCES)
                creep.withdraw(upgraderLink, RESOURCE_ENERGY, upgraderLink.store[RESOURCE_ENERGY]);
	    }
	}
};

module.exports = roleUpgrader;