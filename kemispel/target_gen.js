function rand_int(start, end) {
  return Math.floor( Math.random() * (end - start) + start );
}

function choose_random(list) {
  let alts = Object.values(list);
  let i = rand_int(0,alts.length);
  return alts[i];
}

var global_target_molecule;

// Gives the target to follow during the game
function generate_target_molecule_smiles() {
  let warnings = "warning!!!";
  let molecule;
  // while (warnings != "") {
  //   molecule = generate_unchecked_target_molecule();
  //   warnings = generate_warnings_from_molecule(molecule);
  //   console.log("warnings: " + warnings);
  // }
  while (true) {
    molecule = generate_unchecked_target_molecule();
    console.log("target molecule: " + JSON.stringify(molecule));
    warnings = generate_warnings_from_molecule(molecule);
    if (warnings == "") {
      break;
    }
  }

  global_target_molecule = molecule;

  return get_smiles_from_molecule(molecule);
}

// Generates a random molecule as a target, and returns its SMILE representation.
function generate_unchecked_target_molecule() {
  // Comments explaining variable names - I love it!
  // no = number of
  const no_carbs = rand_int(1,8+1);
  const no_subs = rand_int(1,no_carbs);
  const no_funs = rand_int(1,no_carbs-no_subs);

  // let carbs_left = range(no_carbs).map(|x| x+1);
  let carbs_left = [...Array(no_carbs+1).keys()].concat([...Array(no_carbs+1).keys()]);
  carbs_left.shift();
  
  let subs = [];
  for (var i = 0; i < no_subs; i++) {
    let target_carbon = choose_random(carbs_left);
    let chosen_sub = choose_random(global_subs);

    let target_carbon_index = carbs_left.indexOf(target_carbon);
    carbs_left.splice(target_carbon_index, 1);
    
    subs.push({"carbon_atom":target_carbon,"smiles":chosen_sub});
  }
  let funs = [];
  for (var i = 0; i < no_funs; i++) {
    let target_carbon = choose_random(carbs_left);
    let chosen_fun = choose_random(global_funs);

    let target_carbon_index = carbs_left.indexOf(target_carbon);
    carbs_left.splice(target_carbon_index, 1);
    
    funs.push({"carbon_atom":target_carbon,"smiles":chosen_fun});
  }
  
  const molecule = {
    "subs": subs,
    "length": [no_carbs, "no-one cares what's written here really"],
    "funs": funs,
  };

  return molecule;
}
