// Load RDKit
window
  .initRDKitModule()
  .then(function (RDKit) {
    // console.log("RDKit version: " + RDKit.version());
    window.RDKit = RDKit;
  })
  .catch(() => {
    
  });


const global_funs = {
  // an: "[H]", // Not a part, it's if there are no functional groups.
  en: ["=","en"],
  // yn: ["#", "yn"], // Hard, implement later
  ol: ["(O)", "ol"],
}

const global_subs = {
  Klor: ["Cl", "klor"],
  Metyl: ["C", "metyl"],
  Etyl: ["CC", "etyl"],
  Fluor: ["F", "fluor"],
}

