import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  // =========================
  // Teams
  // =========================

  const [teams, setTeams] = useState([]);

  const [teamName, setTeamName] = useState("");
  const [shortName, setShortName] = useState("");
  const [teamColor, setTeamColor] = useState("#22c55e");

  // =========================
  // Players
  // =========================

  const [players, setPlayers] = useState([]);

  const [playerName, setPlayerName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [position, setPosition] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  // =========================
  // Matches
  // =========================

  const [matches, setMatches] = useState([]);

  const [matchName, setMatchName] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");
  const [matchFormat, setMatchFormat] = useState("11-a-side");
  const [duration, setDuration] = useState(90);
  const [halves, setHalves] = useState(2);
  const [rules, setRules] = useState("");
  const [homeColor, setHomeColor] = useState("#ef4444");
  const [awayColor, setAwayColor] = useState("#3b82f6");

  // =========================
  // Messages
  // =========================

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // =========================
  // Load data
  // =========================

  useEffect(() => {
    loadTeams();
    loadPlayers();
    loadMatches();
  }, []);

  const loadTeams = async () => {
    try {
      const response = await fetch(`${API_URL}/teams/`);

      if (!response.ok) {
        throw new Error("Failed to load teams");
      }

      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPlayers = async () => {
    try {
      const response = await fetch(`${API_URL}/players/`);

      if (!response.ok) {
        throw new Error("Failed to load players");
      }

      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMatches = async () => {
    try {
      const response = await fetch(`${API_URL}/matches/`);

      if (!response.ok) {
        throw new Error("Failed to load matches");
      }

      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // Helper functions
  // =========================

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const getTeamName = (teamId) => {
    const team = teams.find((team) => team.id === Number(teamId));

    return team ? team.name : "Unknown Team";
  };

  // =========================
  // Create Team
  // =========================

  const handleCreateTeam = async (event) => {
    event.preventDefault();

    if (!teamName.trim()) {
      showMessage("Please enter a team name.", "error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/teams/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teamName,
          short_name: shortName || null,
          color: teamColor,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      await loadTeams();

      setTeamName("");
      setShortName("");
      setTeamColor("#22c55e");

      showMessage("Team created successfully.");
    } catch (error) {
      console.error(error);
      showMessage("Could not create team.", "error");
    }
  };

  // =========================
  // Create Player
  // =========================

  const handleCreatePlayer = async (event) => {
    event.preventDefault();

    if (!playerName.trim()) {
      showMessage("Please enter a player name.", "error");
      return;
    }

    if (!selectedTeam) {
      showMessage("Please select a team.", "error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/players/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName,
          jersey_number: jerseyNumber ? Number(jerseyNumber) : null,
          position: position || null,
          team_id: Number(selectedTeam),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create player");
      }

      await loadPlayers();

      setPlayerName("");
      setJerseyNumber("");
      setPosition("");
      setSelectedTeam("");

      showMessage("Player added successfully.");
    } catch (error) {
      console.error(error);
      showMessage("Could not add player.", "error");
    }
  };

  // =========================
  // Create Match
  // =========================

  const handleCreateMatch = async (event) => {
    event.preventDefault();

    if (!matchName.trim()) {
      showMessage("Please enter a match name.", "error");
      return;
    }

    if (!matchDate) {
      showMessage("Please select a match date.", "error");
      return;
    }

    if (!homeTeamId || !awayTeamId) {
      showMessage("Please select both teams.", "error");
      return;
    }

    if (homeTeamId === awayTeamId) {
      showMessage(
        "Home team and away team must be different.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/matches/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: matchName,
          match_date: matchDate,
          home_team_id: Number(homeTeamId),
          away_team_id: Number(awayTeamId),
          format: matchFormat,
          duration: Number(duration),
          halves: Number(halves),
          rules: rules || null,
          home_color: homeColor,
          away_color: awayColor,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to create match"
        );
      }

      await loadMatches();

      setMatchName("");
      setMatchDate("");
      setHomeTeamId("");
      setAwayTeamId("");
      setMatchFormat("11-a-side");
      setDuration(90);
      setHalves(2);
      setRules("");
      setHomeColor("#ef4444");
      setAwayColor("#3b82f6");

      showMessage("Match created successfully.");
    } catch (error) {
      console.error(error);
      showMessage(error.message || "Could not create match.", "error");
    }
  };

  // =========================
  // Dashboard
  // =========================

  const renderDashboard = () => {
    return (
      <>
        <div className="page-header">
          <div>
            <h1>Football AI Dashboard</h1>
            <p>
              Manage your football teams, players and matches.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <p>Teams</p>
              <h2>{teams.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚽</div>
            <div>
              <p>Players</p>
              <h2>{players.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div>
              <p>Matches</p>
              <h2>{matches.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🤖</div>
            <div>
              <p>AI Status</p>
              <h2>Ready</h2>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="content-card">
            <h2>Getting Started</h2>

            <p>
              Start by creating your teams and adding players.
              Then configure a match before uploading football
              footage for AI analysis.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <button
                className="primary-button"
                onClick={() => setCurrentPage("teams")}
              >
                Manage Teams
              </button>

              <button
                className="primary-button"
                onClick={() => setCurrentPage("players")}
              >
                Manage Players
              </button>

              <button
                className="primary-button"
                onClick={() => setCurrentPage("matches")}
              >
                Configure Match
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  // =========================
  // Teams Page
  // =========================

  const renderTeams = () => {
    return (
      <>
        <div className="page-header">
          <div>
            <h1>Teams</h1>
            <p>Create and manage football teams.</p>
          </div>
        </div>

        <div className="content-card">
          <h2>Create New Team</h2>

          <form onSubmit={handleCreateTeam}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              <div>
                <label>Team Name</label>

                <input
                  type="text"
                  placeholder="e.g. Manchester United"
                  value={teamName}
                  onChange={(event) =>
                    setTeamName(event.target.value)
                  }
                />
              </div>

              <div>
                <label>Short Name</label>

                <input
                  type="text"
                  placeholder="e.g. MUN"
                  value={shortName}
                  onChange={(event) =>
                    setShortName(event.target.value)
                  }
                />
              </div>

              <div>
                <label>Team Colour</label>

                <input
                  type="color"
                  value={teamColor}
                  onChange={(event) =>
                    setTeamColor(event.target.value)
                  }
                  style={{
                    width: "100%",
                    height: "42px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="primary-button"
              style={{ marginTop: "20px" }}
            >
              + Create Team
            </button>
          </form>
        </div>

        <div className="content-card">
          <h2>Existing Teams</h2>

          {teams.length === 0 ? (
            <p style={{ marginTop: "15px" }}>
              No teams created yet.
            </p>
          ) : (
            <div style={{ marginTop: "20px" }}>
              {teams.map((team) => (
                <div
                  key={team.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px",
                    marginBottom: "10px",
                    border: "1px solid #263241",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <strong>{team.name}</strong>

                    <div
                      style={{
                        fontSize: "13px",
                        opacity: 0.7,
                        marginTop: "4px",
                      }}
                    >
                      {team.short_name || "No short name"}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor:
                        team.color || "#22c55e",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  // =========================
  // Players Page
  // =========================

  const renderPlayers = () => {
    return (
      <>
        <div className="page-header">
          <div>
            <h1>Players</h1>
            <p>Add players and assign them to teams.</p>
          </div>
        </div>

        <div className="content-card">
          <h2>Add New Player</h2>

          <form onSubmit={handleCreatePlayer}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              <div>
                <label>Player Name</label>

                <input
                  type="text"
                  placeholder="e.g. Erling Haaland"
                  value={playerName}
                  onChange={(event) =>
                    setPlayerName(event.target.value)
                  }
                />
              </div>

              <div>
                <label>Jersey Number</label>

                <input
                  type="number"
                  placeholder="9"
                  value={jerseyNumber}
                  onChange={(event) =>
                    setJerseyNumber(event.target.value)
                  }
                />
              </div>

              <div>
                <label>Position</label>

                <select
                  value={position}
                  onChange={(event) =>
                    setPosition(event.target.value)
                  }
                >
                  <option value="">Select position</option>
                  <option value="GK">Goalkeeper</option>
                  <option value="CB">Centre Back</option>
                  <option value="LB">Left Back</option>
                  <option value="RB">Right Back</option>
                  <option value="CM">Central Midfielder</option>
                  <option value="LM">Left Midfielder</option>
                  <option value="RM">Right Midfielder</option>
                  <option value="CAM">Attacking Midfielder</option>
                  <option value="LW">Left Wing</option>
                  <option value="RW">Right Wing</option>
                  <option value="ST">Striker</option>
                </select>
              </div>

              <div>
                <label>Team</label>

                <select
                  value={selectedTeam}
                  onChange={(event) =>
                    setSelectedTeam(event.target.value)
                  }
                >
                  <option value="">Select team</option>

                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="primary-button"
              style={{ marginTop: "20px" }}
            >
              + Add Player
            </button>
          </form>
        </div>

        <div className="content-card">
          <h2>Players</h2>

          {players.length === 0 ? (
            <p style={{ marginTop: "15px" }}>
              No players added yet.
            </p>
          ) : (
            <div style={{ marginTop: "20px" }}>
              {players.map((player) => (
                <div
                  key={player.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px",
                    marginBottom: "10px",
                    border: "1px solid #263241",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <strong>
                      {player.name}
                      {player.jersey_number
                        ? ` (#${player.jersey_number})`
                        : ""}
                    </strong>

                    <div
                      style={{
                        fontSize: "13px",
                        opacity: 0.7,
                        marginTop: "4px",
                      }}
                    >
                      {player.position || "Position not set"} •{" "}
                      {getTeamName(player.team_id)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  // =========================
  // Matches Page
  // =========================

  const renderMatches = () => {
    return (
      <>
        <div className="page-header">
          <div>
            <h1>Matches</h1>
            <p>
              Configure a football match before AI video
              analysis.
            </p>
          </div>
        </div>

        <div className="content-card">
          <h2>Configure New Match</h2>

          <form onSubmit={handleCreateMatch}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              {/* Match Name */}
              <div>
                <label>Match Name</label>

                <input
                  type="text"
                  placeholder="e.g. College Final"
                  value={matchName}
                  onChange={(event) =>
                    setMatchName(event.target.value)
                  }
                />
              </div>

              {/* Match Date */}
              <div>
                <label>Match Date</label>

                <input
                  type="date"
                  value={matchDate}
                  onChange={(event) =>
                    setMatchDate(event.target.value)
                  }
                />
              </div>

              {/* Home Team */}
              <div>
                <label>Home Team</label>

                <select
                  value={homeTeamId}
                  onChange={(event) =>
                    setHomeTeamId(event.target.value)
                  }
                >
                  <option value="">Select home team</option>

                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Away Team */}
              <div>
                <label>Away Team</label>

                <select
                  value={awayTeamId}
                  onChange={(event) =>
                    setAwayTeamId(event.target.value)
                  }
                >
                  <option value="">Select away team</option>

                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format */}
              <div>
                <label>Game Format</label>

                <select
                  value={matchFormat}
                  onChange={(event) =>
                    setMatchFormat(event.target.value)
                  }
                >
                  <option value="5-a-side">5-a-side</option>
                  <option value="7-a-side">7-a-side</option>
                  <option value="9-a-side">9-a-side</option>
                  <option value="11-a-side">11-a-side</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label>Duration (minutes)</label>

                <input
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(event) =>
                    setDuration(event.target.value)
                  }
                />
              </div>

              {/* Halves */}
              <div>
                <label>Number of Halves</label>

                <select
                  value={halves}
                  onChange={(event) =>
                    setHalves(event.target.value)
                  }
                >
                  <option value="1">1 Half</option>
                  <option value="2">2 Halves</option>
                  <option value="4">4 Quarters</option>
                </select>
              </div>

              {/* Home Colour */}
              <div>
                <label>Home Team Colour</label>

                <input
                  type="color"
                  value={homeColor}
                  onChange={(event) =>
                    setHomeColor(event.target.value)
                  }
                  style={{
                    width: "100%",
                    height: "42px",
                    cursor: "pointer",
                  }}
                />
              </div>

              {/* Away Colour */}
              <div>
                <label>Away Team Colour</label>

                <input
                  type="color"
                  value={awayColor}
                  onChange={(event) =>
                    setAwayColor(event.target.value)
                  }
                  style={{
                    width: "100%",
                    height: "42px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>

            {/* Rules */}
            <div style={{ marginTop: "16px" }}>
              <label>Rules / Match Notes</label>

              <textarea
                placeholder="Enter match rules, special conditions or notes..."
                value={rules}
                onChange={(event) =>
                  setRules(event.target.value)
                }
                rows="5"
                style={{
                  width: "100%",
                  resize: "vertical",
                  marginTop: "8px",
                }}
              />
            </div>

            <button
              type="submit"
              className="primary-button"
              style={{ marginTop: "20px" }}
            >
              💾 Save Match
            </button>
          </form>
        </div>

        {/* Saved Matches */}

        <div className="content-card">
          <h2>Saved Matches</h2>

          {matches.length === 0 ? (
            <p style={{ marginTop: "15px" }}>
              No matches configured yet.
            </p>
          ) : (
            <div style={{ marginTop: "20px" }}>
              {matches.map((match) => (
                <div
                  key={match.id}
                  style={{
                    padding: "18px",
                    marginBottom: "12px",
                    border: "1px solid #263241",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0 }}>
                        {match.name}
                      </h3>

                      <p
                        style={{
                          marginTop: "6px",
                          opacity: 0.7,
                        }}
                      >
                        {match.match_date}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "7px 12px",
                        borderRadius: "20px",
                        border: "1px solid #334155",
                        fontSize: "13px",
                      }}
                    >
                      {match.format}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "12px",
                      marginTop: "16px",
                    }}
                  >
                    <div>
                      <span style={{ opacity: 0.6 }}>
                        Home
                      </span>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginTop: "5px",
                        }}
                      >
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            backgroundColor:
                              match.home_color ||
                              "#ef4444",
                          }}
                        />

                        <strong>
                          {getTeamName(match.home_team_id)}
                        </strong>
                      </div>
                    </div>

                    <div>
                      <span style={{ opacity: 0.6 }}>
                        Away
                      </span>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginTop: "5px",
                        }}
                      >
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            backgroundColor:
                              match.away_color ||
                              "#3b82f6",
                          }}
                        />

                        <strong>
                          {getTeamName(match.away_team_id)}
                        </strong>
                      </div>
                    </div>

                    <div>
                      <span style={{ opacity: 0.6 }}>
                        Duration
                      </span>

                      <div style={{ marginTop: "5px" }}>
                        {match.duration} minutes
                      </div>
                    </div>

                    <div>
                      <span style={{ opacity: 0.6 }}>
                        Structure
                      </span>

                      <div style={{ marginTop: "5px" }}>
                        {match.halves === 4
                          ? "4 quarters"
                          : `${match.halves} ${match.halves === 1
                            ? "half"
                            : "halves"
                          }`}
                      </div>
                    </div>
                  </div>

                  {match.rules && (
                    <div
                      style={{
                        marginTop: "15px",
                        padding: "12px",
                        borderRadius: "8px",
                        background: "#111827",
                        fontSize: "14px",
                      }}
                    >
                      <strong>Rules / Notes:</strong>{" "}
                      {match.rules}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  // =========================
  // Main page renderer
  // =========================

  const renderPage = () => {
    if (currentPage === "teams") {
      return renderTeams();
    }

    if (currentPage === "players") {
      return renderPlayers();
    }

    if (currentPage === "matches") {
      return renderMatches();
    }

    return renderDashboard();
  };

  // =========================
  // App Layout
  // =========================

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">⚽</div>

          <div>
            <h2>Football AI</h2>
            <span>Performance Analytics</span>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-title">MAIN</div>

          <button
            className={`nav-item ${currentPage === "dashboard" ? "active" : ""
              }`}
            onClick={() => setCurrentPage("dashboard")}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className={`nav-item ${currentPage === "teams" ? "active" : ""
              }`}
            onClick={() => setCurrentPage("teams")}
          >
            <span>👥</span>
            Teams
          </button>

          <button
            className={`nav-item ${currentPage === "players" ? "active" : ""
              }`}
            onClick={() => setCurrentPage("players")}
          >
            <span>⚽</span>
            Players
          </button>

          <button
            className={`nav-item ${currentPage === "matches" ? "active" : ""
              }`}
            onClick={() => setCurrentPage("matches")}
          >
            <span>📅</span>
            Matches
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-title">ANALYSIS</div>

          <button className="nav-item">
            <span>🎥</span>
            Video AI
          </button>

          <button className="nav-item">
            <span>📊</span>
            Analytics
          </button>

          <button className="nav-item">
            <span>🔥</span>
            Heatmaps
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-title">SYSTEM</div>

          <button className="nav-item">
            <span>⚙️</span>
            Settings
          </button>
        </div>

        <div className="ai-status">
          <div className="status-dot"></div>

          <div>
            <strong>AI Engine</strong>
            <span>System ready</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="topbar-title">
              Football Performance Platform
            </span>
          </div>
        </header>

        <div className="content">
          {message && (
            <div
              className={`message-banner ${messageType === "error"
                ? "error"
                : "success"
                }`}
            >
              {message}
            </div>
          )}

          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;