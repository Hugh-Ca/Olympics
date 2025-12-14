let league = JSON.parse(localStorage.getItem("league")) || {
  teams: [],
  players: [
    { name: "Courtney SARAULT - CAN", points: 15.7 },
    { name: "Corrine STODDARD - USA", points: 13.49 },
    { name: "Xandra VELZEBOER - NED", points: 11.72 },
    { name: "Minjeong CHOI - KOR", points: 10.97 },
    { name: "Gilli KIM - KOR", points: 9.19 }
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
