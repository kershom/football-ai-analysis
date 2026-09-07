import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  // ================= TEAMS =================

  const [teams, setTeams] = useState([]);

  const [teamName, setTeamName] = useState("");
  const [shortName, setShortName] = useState("");
  const [teamColor, setTeamColor] = useState("#b6ff3b");

  // ================= PLAYERS =================

  const [players, setPlayers] = useState([]);

  const [playerName, setPlayerName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [position, setPosition] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  // ================= MESSAGES =================

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // ================= LOAD TEAMS =================

  const loadTeams = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/teams/"
      );

      if (!response.ok) {
        throw new Error("Failed to load teams");
      }

      const data = await response.json();

      setTeams(data);
    } catch (error) {
      console.error("Error loading teams:", error);
    }
  };

  // ================= LOAD PLAYERS =================

  const loadPlayers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/players/"
      );

      if (!response.ok) {
        throw new Error("Failed to load players");
      }

      const data = await response.json();

      setPlayers(data);
    } catch (error) {
      console.error("Error loading players:", error);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    loadTeams();
    loadPlayers();
  }, []);

  // ================= CREATE TEAM =================

  const handleCreateTeam = async () => {
    setMessage("");
    setMessageType("");

    if (!teamName.trim()) {
      setMessage("Please enter a team name.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/teams/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: teamName.trim(),
            short_name: shortName.trim(),
            color: teamColor,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.detail || "Failed to create team"
        );
      }

      const newTeam = await response.json();

      setTeams((previousTeams) => [
        ...previousTeams,
        newTeam,
      ]);

      setTeamName("");
      setShortName("");
      setTeamColor("#b6ff3b");

      setMessage("Team created successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error creating team:", error);

      setMessage(
        "Could not save team. Make sure the backend is running."
      );

      setMessageType("error");
    }
  };

  // ================= CREATE PLAYER =================

  const handleCreatePlayer = async () => {
    setMessage("");
    setMessageType("");

    if (!playerName.trim()) {
      setMessage("Please enter a player name.");
      setMessageType("error");
      return;
    }

    if (!selectedTeam) {
      setMessage("Please select a team.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/players/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: playerName.trim(),

            jersey_number: jerseyNumber
              ? Number(jerseyNumber)
              : null,

            position: position || null,

            team_id: Number(selectedTeam),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.detail || "Failed to create player"
        );
      }

      const newPlayer = await response.json();

      setPlayers((previousPlayers) => [
        ...previousPlayers,
        newPlayer,
      ]);

      setPlayerName("");
      setJerseyNumber("");
      setPosition("");
      setSelectedTeam("");

      setMessage("Player created successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error creating player:", error);

      setMessage(
        "Could not save player. Make sure the backend is running."
      );

      setMessageType("error");
    }
  };

  // ================= GET TEAM NAME =================

  const getTeamName = (teamId) => {
    const team = teams.find(
      (item) => item.id === teamId
    );

    return team ? team.name : "Unknown Team";
  };

  // ================= UI =================

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            ⚽
          </div>

          <div>
            <h2>Football AI</h2>
            <span>
              Performance Analytics
            </span>
          </div>

        </div>

        <nav>

          <p className="nav-title">
            MAIN
          </p>

          <button
            className={`nav-item ${currentPage === "dashboard"
              ? "active"
              : ""
              }`}
            onClick={() =>
              setCurrentPage("dashboard")
            }
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className={`nav-item ${currentPage === "teams"
              ? "active"
              : ""
              }`}
            onClick={() =>
              setCurrentPage("teams")
            }
          >
            <span>👥</span>
            Teams
          </button>

          <button
            className={`nav-item ${currentPage === "players"
              ? "active"
              : ""
              }`}
            onClick={() =>
              setCurrentPage("players")
            }
          >
            <span>⚽</span>
            Players
          </button>

          <button className="nav-item">
            <span>📅</span>
            Matches
          </button>

          <p className="nav-title">
            ANALYSIS
          </p>

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

          <p className="nav-title">
            SYSTEM
          </p>

          <button className="nav-item">
            <span>⚙️</span>
            Settings
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="ai-status">

            <span className="status-dot"></span>

            <div>
              <strong>
                AI Engine
              </strong>

              <small>
                System ready
              </small>
            </div>

          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="main">

        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        {currentPage === "dashboard" && (
          <>

            <header className="topbar">

              <div>

                <p className="breadcrumb">
                  Football AI / Dashboard
                </p>

                <h1>
                  Dashboard
                </h1>

              </div>

              <div className="top-actions">

                <button className="notification">
                  🔔
                </button>

                <div className="profile">

                  <div className="avatar">
                    C
                  </div>

                  <div>
                    <strong>
                      Coach
                    </strong>

                    <span>
                      Administrator
                    </span>
                  </div>

                </div>

              </div>

            </header>

            <section className="welcome">

              <div>

                <span className="eyebrow">
                  MATCH ANALYTICS
                </span>

                <h2>
                  Welcome to Football AI
                </h2>

                <p>
                  Track players, analyse match footage
                  and understand performance with
                  AI-powered football analytics.
                </p>

              </div>

              <button className="primary-button">
                + Start New Analysis
              </button>

            </section>

            <section className="stats-grid">

              <div className="stat-card">

                <div className="stat-icon">
                  👥
                </div>

                <div>

                  <span>
                    Teams
                  </span>

                  <strong>
                    {teams.length}
                  </strong>

                  <small>
                    Registered teams
                  </small>

                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon">
                  ⚽
                </div>

                <div>

                  <span>
                    Players
                  </span>

                  <strong>
                    {players.length}
                  </strong>

                  <small>
                    Registered players
                  </small>

                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon">
                  📅
                </div>

                <div>

                  <span>
                    Matches
                  </span>

                  <strong>
                    0
                  </strong>

                  <small>
                    Analysed matches
                  </small>

                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon">
                  🎥
                </div>

                <div>

                  <span>
                    Videos
                  </span>

                  <strong>
                    0
                  </strong>

                  <small>
                    Processed videos
                  </small>

                </div>

              </div>

            </section>

            <section className="content-grid">

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h3>
                      Recent Matches
                    </h3>

                    <p>
                      Your latest football
                      analysis sessions
                    </p>

                  </div>

                  <button className="text-button">
                    View all →
                  </button>

                </div>

                <div className="empty-state">

                  <div className="empty-icon">
                    📅
                  </div>

                  <h4>
                    No matches yet
                  </h4>

                  <p>
                    Create your first match to start
                    tracking players and analysing
                    performance.
                  </p>

                  <button className="secondary-button">
                    Create Match
                  </button>

                </div>

              </div>

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h3>
                      Player Activity
                    </h3>

                    <p>
                      Latest player information
                    </p>

                  </div>

                  <button
                    className="text-button"
                    onClick={() =>
                      setCurrentPage("players")
                    }
                  >
                    Players →
                  </button>

                </div>

                <div className="player-list">

                  {players.length === 0 ? (

                    <div className="empty-state">

                      <div className="empty-icon">
                        ⚽
                      </div>

                      <h4>
                        No players yet
                      </h4>

                    </div>

                  ) : (

                    players.slice(0, 5).map(
                      (player) => (

                        <div
                          className="player-row"
                          key={player.id}
                        >

                          <div className="player-number">
                            {player.jersey_number ||
                              "-"}
                          </div>

                          <div className="player-info">

                            <strong>
                              {player.name}
                            </strong>

                            <span>
                              {player.position ||
                                "Position not set"}
                            </span>

                          </div>

                          <span className="team-badge">
                            {getTeamName(
                              player.team_id
                            )}
                          </span>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

            </section>

            <section className="analysis-banner">

              <div className="banner-icon">
                🤖
              </div>

              <div>

                <span>
                  AI PLAYER TRACKING
                </span>

                <h3>
                  Turn match footage into
                  player insights
                </h3>

                <p>
                  Upload a football video and let the
                  AI detect and track players,
                  generate movement paths and create
                  performance analytics.
                </p>

              </div>

              <button className="primary-button">
                Upload Match Video →
              </button>

            </section>

          </>
        )}

        {/* ================================================= */}
        {/* TEAMS */}
        {/* ================================================= */}

        {currentPage === "teams" && (
          <>

            <header className="topbar">

              <div>

                <p className="breadcrumb">
                  Football AI / Teams
                </p>

                <h1>
                  Teams
                </h1>

              </div>

              <div className="top-actions">

                <button className="notification">
                  🔔
                </button>

                <div className="profile">

                  <div className="avatar">
                    C
                  </div>

                  <div>
                    <strong>
                      Coach
                    </strong>

                    <span>
                      Administrator
                    </span>
                  </div>

                </div>

              </div>

            </header>

            <section className="welcome">

              <div>

                <span className="eyebrow">
                  TEAM MANAGEMENT
                </span>

                <h2>
                  Manage Your Teams
                </h2>

                <p>
                  Create teams and manage squad
                  information for football match
                  analysis.
                </p>

              </div>

              <button
                className="primary-button"
                onClick={() => {
                  document
                    .getElementById(
                      "team-name-input"
                    )
                    ?.focus();
                }}
              >
                + Create Team
              </button>

            </section>

            <section className="content-grid">

              {/* CREATE TEAM */}

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h3>
                      Create Team
                    </h3>

                    <p>
                      Add a new football team
                    </p>

                  </div>

                </div>

                <div
                  className="team-form"
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >

                  <label
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: "8px",
                    }}
                  >

                    Team Name

                    <input
                      id="team-name-input"
                      type="text"
                      placeholder="e.g. Manchester United"
                      value={teamName}
                      onChange={(event) =>
                        setTeamName(
                          event.target.value
                        )
                      }
                    />

                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: "8px",
                    }}
                  >

                    Short Name

                    <input
                      type="text"
                      placeholder="e.g. MUN"
                      value={shortName}
                      onChange={(event) =>
                        setShortName(
                          event.target.value
                        )
                      }
                    />

                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: "8px",
                    }}
                  >

                    Team Colour

                    <input
                      type="color"
                      value={teamColor}
                      onChange={(event) =>
                        setTeamColor(
                          event.target.value
                        )
                      }
                      style={{
                        width: "70px",
                        height: "45px",
                        cursor: "pointer",
                      }}
                    />

                  </label>

                  <button
                    className="primary-button"
                    onClick={
                      handleCreateTeam
                    }
                  >
                    Save Team
                  </button>

                  {message && (
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "600",
                        color:
                          messageType ===
                            "success"
                            ? "#b6ff3b"
                            : "#ff6b6b",
                      }}
                    >
                      {message}
                    </p>
                  )}

                </div>

              </div>

              {/* TEAM LIST */}

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h3>
                      Your Teams
                    </h3>

                    <p>
                      Registered football teams
                    </p>

                  </div>

                </div>

                {teams.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      👥
                    </div>

                    <h4>
                      No teams displayed
                    </h4>

                    <p>
                      Your registered teams will
                      appear here.
                    </p>

                  </div>

                ) : (

                  <div className="player-list">

                    {teams.map((team) => (

                      <div
                        className="player-row"
                        key={team.id}
                      >

                        <div
                          className="player-number"
                          style={{
                            backgroundColor:
                              team.color ||
                              "#b6ff3b",
                          }}
                        >
                          ⚽
                        </div>

                        <div className="player-info">

                          <strong>
                            {team.name}
                          </strong>

                          <span>
                            {team.short_name ||
                              "No short name"}
                          </span>

                        </div>

                        <span className="team-badge">
                          Team #{team.id}
                        </span>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </section>

          </>
        )}

        {/* ================================================= */}
        {/* PLAYERS */}
        {/* ================================================= */}

        {currentPage === "players" && (
          <>

            <header className="topbar">

              <div>

                <p className="breadcrumb">
                  Football AI / Players
                </p>

                <h1>
                  Players
                </h1>

              </div>

              <div className="top-actions">

                <button className="notification">
                  🔔
                </button>

                <div className="profile">

                  <div className="avatar">
                    C
                  </div>

                  <div>
                    <strong>
                      Coach
                    </strong>

                    <span>
                      Administrator
                    </span>
                  </div>

                </div>

              </div>

            </header>

            <section className="welcome">

              <div>

                <span className="eyebrow">
                  PLAYER MANAGEMENT
                </span>

                <h2>
                  Manage Your Players
                </h2>

                <p>
                  Add players to your teams and
                  prepare them for match tracking
                  and performance analysis.
                </p>

              </div>

              <button
                className="primary-button"
                onClick={() => {
                  document
                    .getElementById(
                      "player-name-input"
                    )
                    ?.focus();
                }}
              >
                + Add Player
              </button>

            </section>

            <section className="content-grid">

              {/* ADD PLAYER */}

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h3>
                      Add Player
                    </h3>

                    <p>
                      Register a player
                    </p>

                  </div>

                </div>

                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >

                  <label
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: "8px",
                    }}
                  >

                    Player Name

                    <input
                      id="player-name-input"
                      type="text"
                      placeholder="e.g. Lionel Messi"
                      value={playerName}
                      onChange={(event) =>
                        setPlayerName(
                          event.target.value
                        )
                      }
                    />

                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: "8px",
                    }}
                  >

                    Jersey Number

                    <input
                      type="number"
                      min="1"
                      max="99"
                      placeholder="e.g. 10"
                      value={jerseyNumber}
                      onChange={(event) =>
                        setJerseyNumber(
                          event.target.value
                        )
                      }
                    />

                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: "8px",
                    }}
                  >

                    Position

                    <select
                      value={position}
                      onChange={(event) =>
                        setPosition(
                          event.target.value
                        )
                      }
                    >

                      <option value="">
                        Select position
                      </option>

                      <option value="GK">
                        Goalkeeper
                      </option>

                      <option value="CB">
                        Centre Back
                      </option>

                      <option value="LB">
                        Left Back
                      </option>

                      <option value="RB">
                        Right Back
                      </option>

                      <option value="CM">
                        Central Midfielder
                      </option>

                      <option value="LM">
                        Left Midfielder
                      </option>

                      <option value="RM">
                        Right Midfielder
                      </option>

                      <option value="LW">
                        Left Winger
                      </option>

                      <option value="RW">
                        Right Winger
                      </option>

                      <option value="CAM">
                        Attacking Midfielder
                      </option>

                      <option value="ST">
                        Striker
                      </option>

                    </select>

                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: "8px",
                    }}
                  >

                    Team

                    <select
                      value={selectedTeam}
                      onChange={(event) =>
                        setSelectedTeam(
                          event.target.value
                        )
                      }
                    >

                      <option value="">
                        Select team
                      </option>

                      {teams.map((team) => (

                        <option
                          key={team.id}
                          value={team.id}
                        >
                          {team.name}
                        </option>

                      ))}

                    </select>

                    {teams.length === 0 && (
                      <small>
                        Create a team first.
                      </small>
                    )}

                  </label>

                  <button
                    className="primary-button"
                    onClick={
                      handleCreatePlayer
                    }
                  >
                    Save Player
                  </button>

                  {message && (
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "600",
                        color:
                          messageType ===
                            "success"
                            ? "#b6ff3b"
                            : "#ff6b6b",
                      }}
                    >
                      {message}
                    </p>
                  )}

                </div>

              </div>

              {/* PLAYER LIST */}

              <div className="panel">

                <div className="panel-header">

                  <div>

                    <h3>
                      Player Squad
                    </h3>

                    <p>
                      Registered players
                    </p>

                  </div>

                </div>

                {players.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ⚽
                    </div>

                    <h4>
                      No players yet
                    </h4>

                    <p>
                      Add your first player to
                      build your squad.
                    </p>

                  </div>

                ) : (

                  <div className="player-list">

                    {players.map((player) => (

                      <div
                        className="player-row"
                        key={player.id}
                      >

                        <div className="player-number">
                          {player.jersey_number ||
                            "-"}
                        </div>

                        <div className="player-info">

                          <strong>
                            {player.name}
                          </strong>

                          <span>
                            {player.position ||
                              "Position not set"}
                          </span>

                        </div>

                        <span className="team-badge">
                          {getTeamName(
                            player.team_id
                          )}
                        </span>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </section>

          </>
        )}

      </main>
    </div>
  );
}

export default App;