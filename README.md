# cgDNAweb: a web interface to the cgDNA sequence-dependent coarse-grain model of double-stranded DNA.

This repository contains all the files for the front-end of cgDNAweb. This front-end need the back-end located [here](https://github.com/EPFL-FSB-LCVMM/shapes) to function. The back-end should be put in the same folder as the front-end. Meaning that both are put in a top-folder with their respective folder structures intact.


## Running the website

To run the website, use the script *cgdna_web.sh*, e.g. use the commands `cgdna_web.sh start` to start the webserver and `cgdna_web.sh stop` to stop it. The webserver can also be run locally by using the binary `bin/runit`.

## Architecture

The website uses a standard Model-View-Controller (MVC) architecture. All of this is done in Javascript and is located in the `public` subfolder.  This is also where the CSS is located. The HTML is located in the `templates` folder.
