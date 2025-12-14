let league = JSON.parse(localStorage.getItem("league")) || {
  teams: [],
  players: [
    { name: "Patrick Mahomes", points: 25 },
    { name: "Christian McCaffrey", points: 22 },
    { name: "Tyreek Hill", points: 18 },
    { name: "Josh Allen", points: 24 },
    { name: "Justin Jefferson", points: 20 }
  ]
};

function save() {
  localStorage.setItem("league", JSON.stringify(league));
}

function addTeam() {
  const name = document.getElementById("teamName").value;
  if (!name) return;

  league.teams.push({
    name,
    points: 0,
    players: []
  });

  document.getElementById("teamName").value = "";
  save();
  render();
}

function addPlayerToTeam(playerIndex) {
  const teamIndex = document.getElementById("teamSelect").value;
  if (teamIndex === "") {
    alert("Select a team first");
    return;
  }

  const team = league.teams[teamIndex];
  const player = league.players[playerIndex];

  // Prevent same team from adding same player twice
  if (team.players.includes(player.name)) {
    alert("This team already has that player");
    return;
  }

  team.players.push(player.name);
  team.points += player.points;

  save();
  render();
}

function render() {
  const teamSelect = document.getElementById("teamSelect");
  const playerPool = document.getElementById("playerPool");
  const standings = document.getElementById("standings");

  teamSelect.innerHTML = "";
  playerPool.innerHTML = "";
  standings.innerHTML = "";

  league.teams.forEach((team, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = team.name;
    teamSelect.appendChild(option);
  });

  league.players.forEach((player, index) => {
    const li = document.createElement("li");
    li.textContent = `${player.name} (${player.points} pts)`;
    li.onclick = () => addPlayerToTeam(index);
    playerPool.appendChild(li);
  });

  league.teams
    .slice()
    .sort((a, b) => b.points - a.points)
    .forEach(team => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${team.name}</td><td>${team.points}</td>`;
      standings.appendChild(row);
    });
}

render();
