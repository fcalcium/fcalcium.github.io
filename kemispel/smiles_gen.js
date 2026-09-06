// This is the, like, master function
// This runs whenever the render button is pressed
function update_smiles_from_user_input() {
  let smiles = get_chosen_molecule_smiles();
  document.getElementById("molecule-smiles").innerText = "smiles: " + smiles;

  let length = get_longest_carbon_chain(smiles);
  document.getElementById("molecule-smiles").innerText += " (length:" + length + ")";

  // document.getElementById("molecule-formula").innerText = get_molecular_formula(smiles);

  generate_warnings();

  
  render_smiles(smiles);

  const warnings = document.getElementById("warnings").innerText;
  // Hide the win "screen" if the molecules don't match.
  document.getElementById("win").hidden = true;
  if (warnings == "") {
    // Check if built molecule matches target
    // if (smiles == target_molecule_smiles) {
    //   // You win!
    //   document.getElementById("win").hidden = false;
    // }
    const built_smiles = RDKit.get_mol(smiles).get_smiles();
    const target_smiles = RDKit.get_mol(target_molecule_smiles).get_smiles();
    if (built_smiles == target_smiles) {
      document.getElementById("win").hidden = false;
    }
  }

}

function generate_warnings_from_molecule(molecule) {
  
  let warnings = "";

  // const smiles = get_chosen_molecule_smiles(molecule);
  const smiles = get_smiles_from_molecule(molecule);

  // Warn if longest carbon chain isn't the `stam`
  const length = get_longest_carbon_chain(smiles);
  const carbon_chain_length = molecule.length[0];

  if (carbon_chain_length < length) {
    warnings += "Den längsta kolkedjan är " + length + " kol lång men stammen för kolväten med längd " + carbon_chain_length + " används!\n";
  }

  // Warn if any groups are unused
  for (let i = 0; i < molecule.subs.length; i++) {
    if (molecule.subs[i].carbon_atom > carbon_chain_length) {
      warnings += "Substituent vid kolatom " + molecule.subs[i].carbon_atom + " används inte då kolkedjan är för kort!\n";
    }
    if (molecule.subs[i].carbon_atom == "") {
      warnings += "Substituent utan kolatom!\n";
    }
  }
  for (let i = 0; i < molecule.funs.length; i++) {
    if (molecule.funs[i].carbon_atom > carbon_chain_length) {
      warnings += "Funktionell grupp vid kolatom " + molecule.funs[i].carbon_atom + " används inte då kolkedjan är för kort!\n";
    }
    if (molecule.funs[i].carbon_atom == "") {
      warnings += "Funktionell grupp utan kolatom!\n";
    }
  }
  // Warn if there are two subsequent double bonds
  if (smiles.includes("==")) {
    warnings += "Två dubbelbindingar i rad!\n";
  }

  
  return warnings;

}

// Generates warnings for the built molecule
function generate_warnings() {
  const molecule = get_chosen_molecule();

  const warnings = generate_warnings_from_molecule(molecule);

  document.getElementById("warnings").innerHTML = warnings;
}

function get_smiles_from_molecule(molecule) {
  const num_carbs = molecule.length[0];
  let smiles = "";
  // Start loop at 1, since that's the first carbon atom
  for (var i = 1; i <= num_carbs; i++) {
    smiles += "C";
    for (var j = 0; j < molecule.subs.length; j++) {
      const sub = molecule.subs[j];
      // If this is the correct carbon atom
      if (sub.carbon_atom == i) {
        smiles += "(" + sub.smiles[0] + ")";
      }
    }
    let add_last = "";
    for (var j = 0; j < molecule.funs.length; j++) {
      const fun = molecule.funs[j];
      if (fun.carbon_atom == i) {
        if (fun.smiles[0] == "=" || fun.smiles[0] == "#") {
          add_last += fun.smiles[0];
        } else {
          smiles += fun.smiles[0];
        }
      }
    }
    smiles += add_last;
  }

  return smiles;
}

function get_chosen_molecule_smiles() {
  const molecule = get_chosen_molecule();
  const smiles = get_smiles_from_molecule(molecule);
  return smiles;
}

function get_longest_carbon_chain(smiles) {
  let smiles_left = Array.from(smiles);
  let lengths = [];
  let current_length = 0;

  while (smiles_left != "") {
    let current_symbol = smiles_left[0];
    if (current_symbol == "C" || current_symbol == "c") {
      smiles_left.shift();
      current_length += 1;
    } else if (current_symbol == "(") {
      let paren_end_index = smiles_left.indexOf(")");
      let substring = smiles_left.slice(0,paren_end_index);
      lengths.push(current_length + number_of_carbon(substring));
      if (number_of_carbon(substring) + 1 > current_length) {
        current_length = number_of_carbon(substring) + 1;
      }
      smiles_left = smiles_left.slice(paren_end_index+1);
    // We don't recognise this symbol - it's not carbon and not a parentheses
    } else {
      smiles_left.shift();
    }
  }

  let longest = 0;
  for (var i = 0; i < lengths.length; i++) {
    if (lengths[i] > longest) {
      longest = lengths[i];
    }
  }
  if (current_length > longest) {
    longest = current_length;
  }

  return longest;
}

// input is either an array of strings (chars) or a string
function number_of_carbon(input) {
  // new_str is always a str
  let str;
  if (typeof input == "object") {
    str = input.join("");
  } else {
    str = input;
  }
  // Don't count stuff inside [] and Cl. We will never put carbon in [].
  let str_cleared  = str.replace(/Cl/, "[Cl]").replace(/\[.*?\]/, "[e]");
  let count = 0;
  for (let i = 0; i < str_cleared.length; i++) {
    if (str_cleared[i] == "C" || str_cleared[i] == "c") {
      count += 1;
    }
  }
  return count;
}


function get_chosen_molecule() {
  // Subs
  let sub_div_children = document.getElementById("sub-div").children;

  let chosen_subs = [];
  
  for (var i = 0; i < sub_div_children.length; i++) {
    let current_child = sub_div_children.item(i);
    chosen_subs.push({
      carbon_atom: sub_div_children.item(i).children.item(0).value,
      smiles: sub_div_children.item(i).children.item(1).value.split(","),
    });
  }


  // Carbs
  let carbon_length = document.getElementById("carbon-atoms").value.split(",");


  // Funs
  let fun_div_children = document.getElementById("fun-div").children;

  let chosen_funs = [];
  
  for (var i = 0; i < fun_div_children.length; i++) {
    let current_child = fun_div_children.item(i);
    chosen_funs.push({
      carbon_atom: fun_div_children.item(i).children.item(0).value,
      smiles: fun_div_children.item(i).children.item(1).value.split(","),
    });
  }


  return {
    "subs": chosen_subs,
    "length": carbon_length,
    "funs": chosen_funs,
  };
}

const render_button = document.getElementById("render");

render_button.addEventListener("click", function() {update_smiles_from_user_input();});
