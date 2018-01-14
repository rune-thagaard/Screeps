export = class Creeper {
    creep: Creep;
    role: string;

    constructor(creep: Creep) {
        this.creep = creep;
    }

    transferResource(target: Structure<StructureConstant>, resource: ResourceConstant)
    {
        var result = this.creep.transfer(target, resource);
        switch (result) {
            case ERR_NOT_IN_RANGE: {
                creep.moveTo(target);
                break;
            }
            case ERR_NOT_OWNER: // -1 You are not the owner of this creep.
            case ERR_BUSY: // -4 The creep is still being spawned.
            case ERR_NOT_ENOUGH_RESOURCES: // -6 The creep does not have the given amount of resources.
            case ERR_INVALID_TARGET: // -7 The target is not a valid object which can contain the specified resource.
            case ERR_FULL: // -8 The target cannot receive any more resources.
            case ERR_INVALID_ARGS:// -10 The resources amount is incorrect.
                Game.notify("TransferResource failed with following result: " + result + " - Target: " + target.id);
                break;
        }
        return result;
    }

    harvest(harvestSource: Mineral<MineralConstant>, targetEnergyStorage: Structure<StructureConstant>)
    {
        // If creeps energy capacity is empty, go harvest
        if(this.creep.carry.energy == 0)
            if(this.creep.harvest(harvestSource) != OK)
                this.creep.moveTo(harvestSource);

        // If creeps energy capacity is full, deliver energy to storage unit
        if(this.creep.carry.energy == this.creep.carryCapacity)
            this.transferResource(targetEnergyStorage, RESOURCE_ENERGY)
    }
}