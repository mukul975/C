var Chart = require("./d3chart.js").Chart

function dnaCharts () {
    //intras
    this.buckle = undefined;
    this.propeller = undefined;
    this.opening = undefined;
    this.shear = undefined;
    this.stretch = undefined;
    this.stagger = undefined;

    //inters
    this.tilt = undefined;
    this.roll = undefined;
    this.twist = undefined;
    this.shift = undefined;
    this.slide = undefined;
    this.rise = undefined;

    //sequences
    this.sequences = [undefined, undefined, undefined, undefined, undefined];

    //options
    this.coords = 'curves+'; //or 'cgDNA'
};

dnaCharts.prototype = {
    init : function () {
        var width = 500;
        var height = 300;

        //================================================================================
        // Intras
        //================================================================================

        this.buckle = new Chart(width, height, 'deg');
        this.buckle.init('#buckle');
        this.buckle.setYLabel('buckle (degrees)');

        this.propeller = new Chart(width, height, 'deg');
        this.propeller.init('#propeller');
        this.propeller.setYLabel('propeller (degrees)');

        this.opening = new Chart(width, height, 'deg');
        this.opening.init('#opening');
        this.opening.setYLabel('opening (degrees)');

        this.shear = new Chart(width, height, '\u212B');
        this.shear.init('#shear');
        this.shear.setYLabel('shear (\u212B)');

        this.stretch = new Chart(width, height, '\u212B');
        this.stretch.init('#stretch');
        this.stretch.setYLabel('stretch (\u212B)');

        this.stagger = new Chart(width, height, '\u212B');
        this.stagger.init('#stagger');
        this.stagger.setYLabel('stagger (\u212B)');

        //================================================================================
        // Inters
        //================================================================================

        this.tilt = new Chart(width, height, 'deg');
        this.tilt.init('#tilt');
        this.tilt.setYLabel('tilt (degrees)');
        this.tilt.setXLabel('basepair step');
        this.tilt.setType('dimer');

        this.roll = new Chart(width, height, 'deg');
        this.roll.init('#roll');
        this.roll.setYLabel('roll (degrees)');
        this.roll.setXLabel('basepair step');
        this.roll.setType('dimer');

        this.twist = new Chart(width, height, 'deg');
        this.twist.init('#twist');
        this.twist.setYLabel('twist (degrees)');
        this.twist.setXLabel('basepair step');
        this.twist.setType('dimer');

        this.shift = new Chart(width, height, '\u212B');
        this.shift.init('#shift');
        this.shift.setYLabel('shift (\u212B)');
        this.shift.setXLabel('basepair step');
        this.shift.setType('dimer');

        this.slide = new Chart(width, height, '\u212B');
        this.slide.init('#slide');
        this.slide.setYLabel('slide (\u212B)');
        this.slide.setXLabel('basepair step');
        this.slide.setType('dimer');

        this.rise = new Chart(width, height, '\u212B');
        this.rise.init('#rise');
        this.rise.setYLabel('rise (\u212B)');
        this.rise.setXLabel('basepair step');
        this.rise.setType('dimer');
    },

    addData : function (DNA_id, seq, data) {
        //add the sequence
        this.sequences[DNA_id-1] = seq;

        //split all data:
        var buckle = [];
        var propeller = [];
        var opening = [];
        var shear = [];
        var stretch = [];
        var stagger = [];

        var tilt = [];
        var roll = [];
        var twist = [];
        var shift = [];
        var slide = [];
        var rise = [];

        for (var i = 0; i < data.length-12; i+=12) {
            buckle.push(data[i+0]);
            propeller.push(data[i+1]);
            opening.push(data[i+2]);
            shear.push(data[i+3]);
            stretch.push(data[i+4]);
            stagger.push(data[i+5]);

            tilt.push(data[i+6]);
            roll.push(data[i+7]);
            twist.push(data[i+8]);
            shift.push(data[i+9]);
            slide.push(data[i+10]);
            rise.push(data[i+11]);
        }
        buckle.push(data[data.length-6]);
        propeller.push(data[data.length-5]);
        opening.push(data[data.length-4]);
        shear.push(data[data.length-3]);
        stretch.push(data[data.length-2]);
        stagger.push(data[data.length-1]);

        //console.log(buckle);
        //console.log(this.buckle);
        //now give it to the appropriate graphs
        console.log(this.coords);
        this.buckle.addData(DNA_id, seq, buckle, this.coords);
        this.propeller.addData(DNA_id, seq, propeller, this.coords);
        this.opening.addData(DNA_id, seq, opening, this.coords);
        this.shear.addData(DNA_id, seq, shear, this.coords);
        this.stretch.addData(DNA_id, seq, stretch, this.coords);
        this.stagger.addData(DNA_id, seq, stagger, this.coords);

        this.tilt.addData(DNA_id, seq, tilt, this.coords);
        this.roll.addData(DNA_id, seq, roll, this.coords);
        this.twist.addData(DNA_id, seq, twist, this.coords);
        this.shift.addData(DNA_id, seq, shift, this.coords);
        this.slide.addData(DNA_id, seq, slide, this.coords);
        this.rise.addData(DNA_id, seq, rise, this.coords);
    },

    removeData : function (DNA_id) {
        this.sequences[DNA_id-1] = undefined;
        this.buckle.removeData(DNA_id);
        this.propeller.removeData(DNA_id);
        this.opening.removeData(DNA_id);
        this.shear.removeData(DNA_id);
        this.stretch.removeData(DNA_id);
        this.stagger.removeData(DNA_id);

        this.tilt.removeData(DNA_id);
        this.roll.removeData(DNA_id);
        this.twist.removeData(DNA_id);
        this.shift.removeData(DNA_id);
        this.slide.removeData(DNA_id);
        this.rise.removeData(DNA_id);
    },

    changeCoords : function (type) {
        console.log("in changeCoords");
        console.log("type:",type);
        console.log("this.coords:",this.coords);
        if (type === 'cgDNA' && this.coords === 'curves+') {
            this.coords = type;

            this.buckle.setYLabel('buckle (rad/5)');
            this.buckle.changeCoordType(type);

            this.propeller.setYLabel('propeller (rad/5)');
            this.propeller.changeCoordType(type);

            this.opening.setYLabel('opening (rad/5)');
            this.opening.changeCoordType(type);

            this.shear.setYLabel('shear (\u212B)');
            this.shear.changeCoordType(type);

            this.stretch.setYLabel('stretch (\u212B)');

            this.stagger.setYLabel('stagger (\u212B)');

            this.tilt.setYLabel('tilt (rad/5)');
            this.tilt.changeCoordType(type);

            this.roll.setYLabel('roll (rad/5)');
            this.roll.changeCoordType(type);

            this.twist.setYLabel('twist (rad/5)');
            this.twist.changeCoordType(type);

            this.shift.setYLabel('shift (\u212B)');

            this.slide.setYLabel('slide (\u212B)');

            this.rise.setYLabel('rise (\u212B)');
        } else if (type === 'curves+' && this.coords === 'cgDNA') {
            this.coords = type;

            this.buckle.setYLabel('buckle (degrees)');
            this.buckle.changeCoordType(type);

            this.propeller.setYLabel('propeller (degrees)');
            this.propeller.changeCoordType(type);

            this.opening.setYLabel('opening (degrees)');
            this.opening.changeCoordType(type);

            this.shear.setYLabel('shear (\u212B)');

            this.stretch.setYLabel('stretch (\u212B)');

            this.stagger.setYLabel('stagger (\u212B)');

            this.tilt.setYLabel('tilt (degrees)');
            this.tilt.changeCoordType(type);

            this.roll.setYLabel('roll (degrees)');
            this.roll.changeCoordType(type);

            this.twist.setYLabel('twist (degrees)');
            this.twist.changeCoordType(type);

            this.shift.setYLabel('shift (\u212B)');

            this.slide.setYLabel('slide (\u212B)');

            this.rise.setYLabel('rise (\u212B)');
        }
    }

};

exports.dnaCharts = dnaCharts;
