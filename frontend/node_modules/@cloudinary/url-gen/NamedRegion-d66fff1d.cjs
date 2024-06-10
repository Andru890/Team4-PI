'use strict';

var Action = require('./Action-34aa7481.cjs');

/**
 * @memberOf Qualifiers.Region
 */
class NamedRegion extends Action.Action {
    constructor(type) {
        super();
        this.regionType = type;
        this._actionModel.regionType = type;
    }
}

exports.NamedRegion = NamedRegion;
