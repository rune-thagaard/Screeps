var roleTowerFeeder = require('role.towerFeeder');

var builderSource = "fde480b7fc7b52d";

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, doBuildConstructionSites) {
        
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length && doBuildConstructionSites) {
            
    	    if(!creep.memory.building && creep.carry.energy > 0) {
    	        creep.memory.building = true;
    	    }
    
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
    	    }
        	    
    	    if(creep.memory.building) {
    	        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
    	    } else {
    	        
    	        var container = Game.getObjectById(builderSource);
    	        
    	        var attemptTransfer = creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity);
    	                
                if(attemptTransfer == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                } else if (attemptTransfer == ERR_NOT_ENOUGH_RESOURCES) {
                    if (container.energy > 0) {
                        creep.withdraw(container, RESOURCE_ENERGY, container.energy);
                    }
                }
                    
    	        /*
    	        var energyContainers = Memory.energyContainers.split(',');
    	        
    	        if (energyContainers.length > 0) {
    	            
    	            var container = null;
    	            
    	            for (var i = 0; i < energyContainers.length; i++) {
    	                var energyContainer = Game.getObjectById(energyContainers[i]);
    	                if (energyContainer.store[RESOURCE_ENERGY] > 0)
                            container = energyContainer;
    	            }
    	            if (container != null) {
    	                var attemptTransfer = creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity);
    	                
                        if(attemptTransfer == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        } else if (attemptTransfer == ERR_NOT_ENOUGH_RESOURCES)
                            creep.withdraw(container, RESOURCE_ENERGY, container.store[RESOURCE_ENERGY]);
                        
    	            } else {
    	                console.log("Energy storage empty");
    	            }
    	        }
    	        */
    	    }
            
        } else {
            
            /*
            // Repair structures
            if(!creep.memory.building && creep.carry.energy > 0) {
    	        creep.memory.building = true;
    	    }
    
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
    	    }
    	    
    	    if (creep.memory.building) {
    	        
    	        var targets = creep.room.find(FIND_STRUCTURES);
                var i = 0;
                var targetFound = false;
                var targetStructureToRepair = null;
                
                while (!targetFound && i < targets.length) {
                    if ((targets[i].structureType == STRUCTURE_ROAD && targets[i].hits < 5000) || (targets[i].structureType == STRUCTURE_CONTAINER && targets[i].hits < 250000))
                    {
                        targetStructureToRepair = targets[i];
                        targetFound = true;
                    }
                    i++;
                }
                if (targetFound) {
                    var result = creep.repair(targetStructureToRepair);
                    
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetStructureToRepair);
                    }
                    
                }
    	    }
    	    else
    	    {
    	        var container = Game.getObjectById(builderSource);
    	        
    	        var attemptTransfer = creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity);
    	                
                if(attemptTransfer == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                } else if (attemptTransfer == ERR_NOT_ENOUGH_RESOURCES)
                    creep.withdraw(container, RESOURCE_ENERGY, container.store[RESOURCE_ENERGY]);
    	    }
            */
        }
	    
	}
};

module.exports = roleBuilder;