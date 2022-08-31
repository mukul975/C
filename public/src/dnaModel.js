const DNA = require("./DNA.js").DNA;

//TODO CHECK WHETHER ALL MakeMatrix3_row/col  ARE THE RIGHT ONES!!
//AND ALSO JUST CHECK ROTATIONS, DNA LOOKS SHEARED SOMETIMES!!!!
function coordinateFrame (orientation, position) {
    if (orientation === undefined || position === undefined) {
        console.log("CoordinateFrame parameters undefined! Exiting");
        return;
    }

    this.or = orientation;
    this.pos = position;
}

function dnaModel () {
    "use strict";
    this.dna_molecules = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
}

dnaModel.prototype = {
    clear : function () {
        for (var i = 0; i < this.dna_molecules.length; i++) {
            this.dna_molecules[i].empty();
            delete this.dna_molecules[i];
            this.dna_molecules.pop();
        }
    },

    loadConfigurationFromJSON : function (config, id) {
        "use strict";
        this.dna_molecules[id] = null;

        var dna = new DNA();
        dna.sequence = config.sequence;
        dna.center = parseInt(config.center);
	    dna.shapes = config.shapes;
        for (var i = 0; i < config.sequence.length; i++) {
            var bp = config.coords[i];
            //the configurations are in column-major format, and should be in row-major, so transpose them:
            var R = makeMatrix3_col(bp.D);
            var Rc = makeMatrix3_col(bp.Dc);
            R = flattenMat3_col(R);
            Rc = flattenMat3_col(Rc);

            //then add them to the model:
            dna.baseFramesWatson.push(new coordinateFrame(R, bp.r));
            dna.baseFramesCrick.push(new coordinateFrame(Rc, bp.rc));
        }
        dna.calculateBpFrames();
        dna.calculateBpsFrames();
	    //dna.calculatePhosphates();

        this.dna_molecules[id] = dna;
    },

    removeConfiguration : function (id) {
        this.dna_molecules[id] = null;
    }

};
function calculateRelRotMat(D1,D2) {
    if (D1 === undefined || D2 === undefined) {
        console.log("rel rot mat: D1 or D2 undefined");
        return;
    }
    return numeric.dot(numeric.transpose(D2),D1);
}

function calculateHalfRotMat (R) {
    var eta = calculateRotVec(R);
    var nrm = 0.2*numeric.norm2(eta);

    var factor = 2.0/(2.0 + Math.sqrt(4.0 + nrm*nrm));

    var half = numeric.dot(factor, eta);
    return calculateRotMat(half);
}

function calculateRotVec (R) {
    var tr = R[0][0] + R[1][1] + R[2][2];
    var frac = 10.0/(tr + 1.0);
    return [frac*(R[2][1]-R[1][2]),
            frac*(R[0][2]-R[2][0]),
            frac*(R[1][0]-R[0][1])];
}

function calculateRotMat(v) {
    var eta = [0.2*v[0], 0.2*v[1], 0.2*v[2]];
    var nrm = numeric.norm2(eta);

    var I = new numeric.identity(3);

    var factor = (4.0/(4.0 +nrm*nrm));
    var X = new makeAsymMat(eta);
    var X2 = ScMat3Mult(0.5, numeric.dot(X,X));
    return numeric.add(I, ScMat3Mult(factor, numeric.add(X,X2)));
}

function makeAsymMat (v) {
    return [[     0, -v[2],  v[1]],
            [  v[2],     0, -v[0]],
            [ -v[1],  v[0],    0]];
}

function makeMatrix3_row (a) {
    if (a === undefined) {
        console.log("makeMatrix3: array undefined");
        return;
    }
    return [[ a[0], a[1], a[2]],
            [ a[3], a[4], a[5]],
            [ a[6], a[7], a[8]]];
}

function makeMatrix3_col (a) {
    if (a === undefined) {
        console.log("makeMatrix3: array undefined");
        return;
    }
    return [[ a[0], a[3], a[6]],
            [ a[1], a[4], a[7]],
            [ a[2], a[5], a[8]]];
}

function ScMat3Mult(sc, M) {
    return [[sc*M[0][0], sc*M[0][1], sc*M[0][2]],
            [sc*M[1][0], sc*M[1][1], sc*M[1][2]],
            [sc*M[2][0], sc*M[2][1], sc*M[2][2]]];
}

function ScVec3Mult(sc, v) {
    return [sc*v[0], sc*v[1], sc*v[2]];
}

function flattenMat3_row (M) {
    return [ M[0][0], M[0][1], M[0][2], M[1][0], M[1][1], M[1][2], M[2][0], M[2][1], M[2][2]];
}

function flattenMat3_col (M) {
    return [ M[0][0], M[1][0], M[2][0], M[0][1], M[1][1], M[2][1], M[0][2], M[1][2], M[2][2]];
}


exports.dnaModel = dnaModel;
