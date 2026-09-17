var players = [];

function rename_player(edit_button) {
  var name = edit_button.parentNode.querySelector(".name");

  // Remove old_name from players
  const old_name = name.innerHTML;
  players = players.filter(item => item !== old_name);

  // Prompt for new name
  var new_name = "";
  new_name = prompt("Enter name of player");
  while (players.includes(new_name) || new_name === "") {
    new_name = prompt("Enter name of player");
    // alert("Name already in use!")
  }

  // Add new name to list
  players.push(new_name);
  // Update display name
  name.innerHTML = new_name;
  return;
}

function delete_player(delete_button) {
  const player_div = delete_button.parentNode;
  player_div.remove();

  const name = delete_button.parentNode.querySelector(".name").innerHTML;
  players = players.filter(item => item !== name);
}

function add_player() {
  var players_div = document.getElementById("poker-players-grid");
  // I love having to use HTML comments inside JS code.
  players_div.innerHTML += (`
			<div>
				<span class="name">namn</span>
				<button onclick="rename_player(this)">✏️</button>
				<button onclick="delete_player(this)">🗑️</button>
				<br>
				<span class="value">900</span>
				(
				<span class="potted">40</span>
				)
				<br>
				<button onclick="check(this)">check</button>
				<button onclick="bet(this)">bet</button>
				<br>
				<button onclick="win(this)">win</button>
				<!--<button onclick="fold(this)">fold</button>-->
			</div>
  `);
  players.push("namn");
}

function get_highest_potted() {
  const players = document.getElementById("poker-players-grid");

  var highest = 0;

  for (let i = 0; i < players.children.length; i++) {
    const current_potted = Number(players.children[i].querySelector(".potted").innerHTML);
      if (current_potted > highest) {
      highest = current_potted;
    }
  }

  return highest;
}

function bet(bet_button) {
  const parent = bet_button.parentNode;
  var total = parent.querySelector(".value");
  var potted = parent.querySelector(".potted");

  const betted_value = Number(prompt("Amount to bet"));

  total.innerHTML = Number(total.innerHTML) -Number(betted_value);
  potted.innerHTML = Number(potted.innerHTML) + Number(betted_value);
}

function fold(fold_button) {
  const parent = fold_button.parentNode;
  var potted = parent.querySelector(".potted");
  potted.innerHTML = 0;
}

function check(check_button) {
  const parent = check_button.parentNode;
  const highest = get_highest_potted();

  var potted = parent.querySelector(".potted");
  var total = parent.querySelector(".value");

  // Bet enough to get up to what has to be betted.
  const betted_value = highest - potted.innerHTML;

  total.innerHTML = Number(total.innerHTML) -Number(betted_value);
  potted.innerHTML = Number(potted.innerHTML) + Number(betted_value);
}

function win(win_button) {
  var total_pot = 0;
  const players_div = document.getElementById("poker-players-grid");

  for (let i = 0; i < players_div.children.length; i++) {
    var current_child = players_div.children[i];
    total_pot += Number(current_child.querySelector(".potted").innerHTML);
    current_child.querySelector(".potted").innerHTML = "0";
  }

  win_button.parentNode.querySelector(".value").innerHTML = Number(win_button.parentNode.querySelector(".value").innerHTML) + total_pot;
}
