var dnaModel = require("./dnaModel.js").dnaModel;
var dnaView = require("./dnaView.js").dnaView;
var dnaController = require("./dnaController.js").dnaController;
var dnaCharts = require("./dnaCharts.js").dnaCharts;

//console.log(dnaModel);

function cgDNAweb () {
    this.model = undefined;
    this.view = undefined;
    this.controller = undefined;
    this.charts = undefined;

    var that = this;

    //wait until some button has been pressed to load all of the JS
    document.addEventListener('DOMContentLoaded', function () {
        for (var id = 1; id < 5; id++)
            $("#loading".concat(id.toString())).hide();


        function load_JS () {
            that.init();
        }

        document.getElementById("submit_seq1").addEventListener('click', function handle(event) {
            console.log('initialising cgDNAweb');
            //if it has been pressed, the listener isn't needed anymore

            var ctnt1 = document.getElementById("3dview_content");

            var canvas = document.getElementById('viewer');
            canvas.width = ctnt1.clientWidth;
            canvas.height = ctnt1.clientHeight;
            event.currentTarget.removeEventListener(event.type, handle);
            that.init();

            that.controller.onSubmit(event, 1);
        }, false);

        document.getElementById("seq_input1").addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                document.getElementById("submit_seq1").dispatchEvent(new Event('click'));
                event.currentTarget.removeEventListener(event.type, handle);
            }
        }, false);

        var seq_input1 = document.getElementById("seq_input1");
        var seq_input2 = document.getElementById("seq_input2");
        var seq_input3 = document.getElementById("seq_input3");
        var seq_input4 = document.getElementById("seq_input4");
        var remove_seq_button1 = document.getElementById("remove_seq_button1");
        var remove_seq_button2 = document.getElementById("remove_seq_button2");
        var remove_seq_button3 = document.getElementById("remove_seq_button3");
        var remove_seq_button4 = document.getElementById("remove_seq_button4");

        remove_seq_button1.addEventListener('click', function (event) {
            //remove from model:
            if (that.model)
                that.model.removeConfiguration(1);
            //remove from view:
            if (that.view)
                that.view.removeRenderObject(1);
            //remove from plots:
            if (that.charts)
                that.charts.removeData(1);
            seq_input1.value = "";
            remove_seq_button1.style.opacity = 0;
        }, false);

        remove_seq_button2.addEventListener('click', function (event) {
            //remove from model:
            if (that.model)
            that.model.removeConfiguration(2);
            //remove from view:
            if (that.view)
                that.view.removeRenderObject(2);
            //remove from plots:
            if (that.charts)
                that.charts.removeData(2);
            seq_input2.value = "";
            remove_seq_button2.style.opacity = 0;
        }, false);

        remove_seq_button3.addEventListener('click', function (event) {
            //remove from model:
            if (that.model)
            that.model.removeConfiguration(3);
            //remove from view:
            if (that.view)
                that.view.removeRenderObject(3);
            //remove from plots:
            if (that.charts)
                that.charts.removeData(3);
            seq_input3.value = "";
            remove_seq_button3.style.opacity = 0;
        }, false);

        remove_seq_button4.addEventListener('click', function (event) {
            //remove from model:
            if (that.model)
            that.model.removeConfiguration(4);
            //remove from view:
            if (that.view)
                that.view.removeRenderObject(4);
            //remove from plots:
            if (that.charts)
                that.charts.removeData(4);
            seq_input4.value = "";
            remove_seq_button4.style.opacity = 0;
        }, false);
        seq_input1.addEventListener('input', function (event) {
            event.preventDefault();
            var search_wrapper = document.querySelector("#slide1 > .search_wrapper");
            if (search_wrapper.style.borderTopColor !== "rgb(112,178,233)") {
                search_wrapper.style.borderWidth = "3px";
                search_wrapper.style.borderTopColor = "rgb(112,178,233)";
                search_wrapper.style.borderRightColor = "rgb(112,178,233)";
                search_wrapper.style.borderBottomColor = "rgb(112,178,233)";
                search_wrapper.style.borderLeftColor = "rgb(112,178,233)";
            }

            if (seq_input1.value !== "") {
                remove_seq_button1.style.opacity = 1;
            } else {
                remove_seq_button1.style.opacity = 0;
            }
        }, false);
        seq_input2.addEventListener('input', function (event) {
            event.preventDefault();
            var search_wrapper = document.querySelector("#slide2 > .search_wrapper");
            if (search_wrapper.style.borderTopColor !== "rgb(112,178,233)") {
                search_wrapper.style.borderWidth = "3px";
                search_wrapper.style.borderTopColor = "rgb(112,178,233)";
                search_wrapper.style.borderRightColor = "rgb(112,178,233)";
                search_wrapper.style.borderBottomColor = "rgb(112,178,233)";
                search_wrapper.style.borderLeftColor = "rgb(112,178,233)";
            }

            if (seq_input2.value !== "") {
                remove_seq_button2.style.opacity = 1;
            } else {
                remove_seq_button2.style.opacity = 0;
            }
        }, false);
        seq_input3.addEventListener('input', function (event) {
            event.preventDefault();
            var search_wrapper = document.querySelector("#slide3 > .search_wrapper");
            if (search_wrapper.style.borderTopColor !== "rgb(112,178,233)") {
                search_wrapper.style.borderWidth = "3px";
                search_wrapper.style.borderTopColor = "rgb(112,178,233)";
                search_wrapper.style.borderRightColor = "rgb(112,178,233)";
                search_wrapper.style.borderBottomColor = "rgb(112,178,233)";
                search_wrapper.style.borderLeftColor = "rgb(112,178,233)";
            }

            if (seq_input3.value !== "") {
                remove_seq_button3.style.opacity = 1;
            } else {
                remove_seq_button3.style.opacity = 0;
            }
        }, false);
        seq_input4.addEventListener('input', function (event) {
            var search_wrapper = document.querySelector("#slide4 > .search_wrapper");
            if (search_wrapper.style.borderTopColor !== "rgb(112,178,233)") {
                search_wrapper.style.borderWidth = "3px";
                search_wrapper.style.borderTopColor = "rgb(112,178,233)";
                search_wrapper.style.borderRightColor = "rgb(112,178,233)";
                search_wrapper.style.borderBottomColor = "rgb(112,178,233)";
                search_wrapper.style.borderLeftColor = "rgb(112,178,233)";
            }

            event.preventDefault();
            if (seq_input4.value !== "") {
                remove_seq_button4.style.opacity = 1;
            } else {
                remove_seq_button4.style.opacity = 0;
            }
        }, false);


    });
}


cgDNAweb.prototype = {
    init : function () {
        this.model = new dnaModel();
        this.view = new dnaView(this.model, "viewer");
        this.charts = new dnaCharts();
        this.controller = new dnaController(this.model, this.view, this.charts);

        this.view.init();
        this.controller.init();
        this.controller.initControls();
        this.charts.init();
    }
};

dnaController.prototype.onSubmit = function (event, id) {
        //event.preventDefault();
        var seq = document.getElementById("seq_input".concat(id.toString())).value;
        var param_query = "#slide".concat(id.toString())+" .search_wrapper .params_dd_label";
        //console.log(param_query);
        var param = window.getComputedStyle(document.querySelector("#slide".concat(id.toString())+" .search_wrapper .params_dd_label"), ':before').content;

        //console.log(param);
        //console.log(seq);
        //console.log("id:", "loading"+id.toString());

        var that = this;
        $( "#loading"+id.toString() ).show();
        $.ajax({
           'async': true,
           'type': "POST",
           'global': false,
           'dataType': 'JSON',
           'url': "/data2",
           'data': { 'seq_input': seq,
                     'param_input': param},
           'success': function (data) {
                if( data.error === 'none' ) {
                    that.model.loadConfigurationFromJSON(data, id);
                    that.view.buildRenderObject(that.model.dna_molecules[id], id);
                    that.charts.addData(id, data.sequence, data.shapes);
                } else {
                    var search_wrapper = document.querySelector("#slide".concat(id.toString())+" > .search_wrapper");
                    search_wrapper.style.borderWidth = "3px";
                    search_wrapper.style.borderTopColor = "rgb(255,0,0)";
                    search_wrapper.style.borderRightColor = "rgb(255,0,0)";
                    search_wrapper.style.borderBottomColor = "rgb(255,0,0)";
                    search_wrapper.style.borderLeftColor = "rgb(255,0,0)";
                }
               $("#loading".concat(id.toString())).hide();
           },
           'error': function (response) {
               $("#loading".concat(id.toString())).hide();
           }
        });

        return false;
};
var program = new cgDNAweb();

//document.addEventListener('DOMContentLoaded', function () {
    /*
document.getElementById("submit_seq1").addEventListener('click', function (event) {
    console.log('initialising cgDNAweb');
    program.init();

    var ctnt1 = document.getElementById("3dview_content");
    var ctnt2 = document.getElementById("plots_content");

    var canvas = document.getElementById('viewer');
    canvas.width = Math.max(ctnt1.clientWidth, ctnt2.clientWidth);
    canvas.height = Math.max(ctnt1.clientHeight, ctnt2.clientHeight);
}, false);
*/

/*
window.onload = function () {
    //program.init();

    $("#loading1").hide();
    $("#loading2").hide();
    $("#loading3").hide();
    $("#loading4").hide();
}
*/


