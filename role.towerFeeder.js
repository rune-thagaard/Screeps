var towerFeederSource = "fde480b7fc7b52d";
var towerFeederDestination = "5e023cf9fc4ea90";

var roleTowerFeeder = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        // Fill tower with energy
        var tower = Game.getObjectById(towerFeederDestination);
        
        var tower2 = Game.getObjectById('5dad3f9a248e49e');
        /*
        // Make sure to empty creeps storage, if there are non-energy present
        var creepTotalCarry = _.sum(creep.carry);
        if (creepTotalCarry != creep.carry.energy) {
            var container = Game.getObjectById('578aa00cd5492b1c50499cda');
            var continueLoop = true;
            
            for(var resourceType in creep.carry) {
                if (continueLoop) {
                    var result = creep.transfer(container, resourceType);
                    
                	if(result == ERR_NOT_IN_RANGE) {
                	    creep.moveTo(container);
                	    continueLoop = false;
                	}
                }
            }
            
        }
        */
        
        if (tower2.energy < tower.energy) tower = tower2;
        
        if(tower && tower.energy < tower.energyCapacity) {
            var creepTotalCarry = _.sum(creep.carry);
    	    if(creepTotalCarry == creep.carryCapacity) {
    	        if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
    	    } else {
    	        var droppedRespurces = creep.room.find(FIND_DROPPED_RESOURCES);
    	        if (droppedRespurces.length > 0) {
    	            console.log("Getting dropped resources");
    	            var first = true;
        	        creep.room.find(FIND_DROPPED_RESOURCES).forEach(function(res) {
        	            if(first && creep.pickup(res, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        	                first = false;
                            creep.moveTo(res);
                        }
                    });
    	        } else {
    	            /*
        	        var energyContainers = Memory.energyContainers.split(',');
        	        
        	        if (energyContainers.length > 0) {
        	            
        	            var container = null;
        	            
        	            for (var i = 0; i < energyContainers.length; i++) {
        	                var energyContainer = Game.getObjectById(energyContainers[i]);
        	                if (energyContainer) {
        	                if (energyContainer.store[RESOURCE_ENERGY] > 0)
                                container = energyContainer;
        	                } else {
        	                    console.log("Couldn't get object by ID, from energy contrainer memory: i="+i+" - ID: "+energyContainers[i]);
        	                }
        	            }
        	            
        	            if (container != null) {
        	                var result = creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy);
                            if(result == ERR_NOT_IN_RANGE)
                                creep.moveTo(container);
        	            } else {
        	                console.log("Energy storage empty");
        	            }
        	        }
        	        */
        	        var container = Game.getObjectById(towerFeederSource);
        	        var result = creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy);
                            if(result == ERR_NOT_IN_RANGE)
                                creep.moveTo(container);
    	        }
    	    }
        
        } else {
            
            var droppedRespurces = creep.room.find(FIND_DROPPED_RESOURCES);
	        if (droppedRespurces.length > 0) {
	            var first = true;
    	        creep.room.find(FIND_DROPPED_RESOURCES).forEach(function(res) {
    	            if(first && creep.pickup(res, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    	                first = false;
                        creep.moveTo(res);
                    }
                });
	        }
    	    else {
    	        creep.moveTo(36,21);
    	    }   
            
        }
        
	}
};

module.exports = roleTowerFeeder;