var upgraderLink = {
    
    run: function() {
        
        let originLink: StructureLink = Game.getObjectById('027b33b340b294c');
        let targetLink: StructureLink = Game.getObjectById('d5dd32eead2962a');
        
        var result = originLink.transferEnergy(targetLink, targetLink.energyCapacity - targetLink.energy);
        
        if (result == ERR_NOT_ENOUGH_ENERGY) {
            originLink.transferEnergy(targetLink, targetLink.energy);
        }
	}
	    
};

module.exports = upgraderLink;