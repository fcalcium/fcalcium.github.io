// Remove button


function add_remove_button(div) {
  let button_html = document.createElement("button");
  button_html.appendChild(document.createTextNode("[x]"));
  div.appendChild(button_html);
  button_html.onclick = function(e) { this.parentNode.remove(); };
}


// Subs
let add_sub = document.getElementById("add-substituent");
// let sub_sub = document.getElementById("sub-substituent");
let sub_div = document.getElementById("sub-div");

let sub_select = "<select name=\"substituents\">\n";
for (var sub in global_subs) {
  sub_select += "<option value=" + global_subs[sub] + ">" + sub + "</option>\n";
}
sub_select += "</select>";

add_sub.addEventListener("click", function() {
  const node = document.createElement("div");
  node.innerHTML += "kolatom #<input type=number min=1 max=8> substituent ";
  node.innerHTML += sub_select;
  add_remove_button(node);
  sub_div.appendChild(node);
})

// sub_sub.addEventListener("click", function() {
//   sub_div.removeChild(sub_div.lastChild);
// })


// Funs


let add_fun = document.getElementById("add-fun");
// let sub_fun = document.getElementById("sub-fun");
let fun_div = document.getElementById("fun-div");

let fun_select = "<select name=\"fun\">\n";
for (var fun in global_funs) {
  fun_select += "<option value=" + global_funs[fun] + ">" + fun + "</option>\n";
}
fun_select += "</select>";

add_fun.addEventListener("click", function() {
  const node = document.createElement("div");
  node.innerHTML = "kolatom #<input type=number min=1 max=8> funktionell grupp";
  node.innerHTML += fun_select;
  add_remove_button(node);
  fun_div.appendChild(node);
});

// sub_fun.addEventListener("click", function() {
//   fun_div.removeChild(fun_div.lastChild);
// })


// Play again button
let play_again_button = document.getElementById("play-again-button");
play_again_button.addEventListener("click", function() {
  let url = new URL(window.location.href);
  url.searchParams.delete("goal");
  window.location.replace(url);
});
// Restart button
let restart_button = document.getElementById("restart-button");
restart_button.addEventListener("click", function() {
  let url = new URL(window.location.href);
  url.searchParams.delete("goal");
  window.location.replace(url);
});
