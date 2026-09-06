var compact_options = {
	scale: 0,
	width: 550,
	height: 450,
	bondLength: 19,
	bondThickness: 1.1,
	shortBondLength: 0.6,
	bondSpacing: 3.2,
	fontSizeLarge: 6.3,
	explicitHydrogens: true,
	compactDrawing: true,
	terminalCarbons: true,
	atomVisualization: "default",
};
var default_options = {
	scale: 0,
	width: 550,
	height: 450,
	bondLength: 19,
	bondThickness: 1.1,
	shortBondLength: 0.6,
	bondSpacing: 3.2,
	fontSizeLarge: 6.3,
	explicitHydrogens: true,
	compactDrawing: false,
	terminalCarbons: true,
	atomVisualization: "default",
};
var standard_options = {
	scale: 0,
	width: 550,
	height: 450,
	bondLength: 19,
	bondThickness: 1.1,
	shortBondLength: 0.6,
	bondSpacing: 3.2,
	fontSizeLarge: 6.3,
	explicitHydrogens: false,
	compactDrawing: false,
	terminalCarbons: false,
	atomVisualization: "default",
};
var allballs_options = {
	scale: 0,
	width: 550,
	height: 450,
	bondLength: 19,
	bondThickness: 1.1,
	shortBondLength: 0.6,
	bondSpacing: 3.2,
	fontSizeLarge: 6.3,
	explicitHydrogens: true,
	compactDrawing: false,
	terminalCarbons: true,
	atomVisualization: "allballs",
};
	
let compactDrawer = new SmilesDrawer.Drawer(compact_options);
let defaultDrawer = new SmilesDrawer.Drawer(default_options);
let standardDrawer = new SmilesDrawer.Drawer(standard_options);
let allballsDrawer = new SmilesDrawer.Drawer(allballs_options);
	
function render_smiles(smiles) {
	let render_mode = document.getElementById("render-mode").value;

	let smilesDrawer;
	if (render_mode == "compact") {
		smilesDrawer = compactDrawer;
	} else if (render_mode == "default") {
		smilesDrawer = defaultDrawer;
	} else if (render_mode == "standard") {
		smilesDrawer = standardDrawer;
	} else if (render_mode == "allballs") {
		smilesDrawer = allballsDrawer;
	} // else {unreachable!()}
	
	// Draw built molecule
	SmilesDrawer.parse(smiles, function(tree) {
		smilesDrawer.draw(tree, "mol-canvas", "light", false);
		});
	// Draw target molecule
	SmilesDrawer.parse(target_molecule_smiles, function(tree) {
		smilesDrawer.draw(tree, "target-canvas", "light", false);
	});
}

function get_molecular_formula(smiles) {
	return defaultDrawer.getMolecularFormula(smiles);
}
		
// let input = document.getElementById("mol-input");
// ...
// input.addEventListener("input", function() {
// 	render_smiles(input.value)
// });
			
// render_smiles(input.value);


// var target_molecule_smiles = "C(Cl)=C";
let url = new URL(window.location.href);

var target_molecule_smiles = url.searchParams.get("goal");

if (target_molecule_smiles == null) {
	// target_molecule_smiles = "C(Cl)=C";
	target_molecule_smiles = generate_target_molecule_smiles();
	url.searchParams.append("goal", target_molecule_smiles);
	window.history.pushState("","",url);
}

// Render target molecule
let chosen = get_chosen_molecule_smiles();
render_smiles(chosen);
