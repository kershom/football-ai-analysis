import "./App.css";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">⚽</div>
          <div>
            <h2>Football AI</h2>
            <span>Performance Analytics</span>
          </div>
        </div>

        <nav>
          <p className="nav-title">MAIN</p>

          <a className="nav-item active">
            <span>▦</span>
            Dashboard
          </a>

          <a className="nav-item">
            <span>👥</span>
            Teams
          </a>

          <a className="nav-item">
            <span>⚽</span>
            Players
          </a>

          <a className="nav-item">
            <span>📅</span>
            Matches
          </a>

          <p className="nav-title">ANALYSIS</p>

          <a className="nav-item">
            <span>🎥</span>
            Video AI
          </a>

          <a className="nav-item">
            <span>📊</span>
            Analytics
          </a>

          <a className="nav-item">
            <span>🔥</span>
            Heatmaps
          </a>

          <p className="nav-title">SYSTEM</p>

          <a className="nav-item">
            <span>⚙️</span>
            Settings
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="ai-status">
            <span className="status-dot"></span>
            <div>
              <strong>AI Engine</strong>
              <small>System ready</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Football AI / Dashboard</p>
            <h1>Dashboard</h1>
          </div>

          <div className="top-actions">
            <button className="notification">🔔</button>

            <div className="profile">
              <div className="avatar">C</div>
              <div>
                <strong>Coach</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <span className="eyebrow">MATCH ANALYTICS</span>
            <h2>Welcome to Football AI</h2>
            <p>
              Track players, analyse match footage and understand performance
              with AI-powered football analytics.
            </p>
          </div>

          <button className="primary-button">
            + Start New Analysis
          </button>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <span>Teams</span>
              <strong>1</strong>
              <small>Registered teams</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚽</div>
            <div>
              <span>Players</span>
              <strong>3</strong>
              <small>Tracked players</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div>
              <span>Matches</span>
              <strong>0</strong>
              <small>Analysed matches</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎥</div>
            <div>
              <span>Videos</span>
              <strong>0</strong>
              <small>Processed videos</small>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h3>Recent Matches</h3>
                <p>Your latest football analysis sessions</p>
              </div>

              <button className="text-button">View all →</button>
            </div>

            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h4>No matches yet</h4>
              <p>
                Create your first match to start tracking players and
                analysing performance.
              </p>

              <button className="secondary-button">
                Create Match
              </button>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h3>Player Activity</h3>
                <p>Latest player information</p>
              </div>

              <button className="text-button">Players →</button>
            </div>

            <div className="player-list">
              <div className="player-row">
                <div className="player-number">7</div>
                <div className="player-info">
                  <strong>ronald</strong>
                  <span>ST</span>
                </div>
                <span className="team-badge">Team 1</span>
              </div>

              <div className="player-row">
                <div className="player-number">7</div>
                <div className="player-info">
                  <strong>ronaldo</strong>
                  <span>ST</span>
                </div>
                <span className="team-badge">Team 1</span>
              </div>

              <div className="player-row">
                <div className="player-number">11</div>
                <div className="player-info">
                  <strong>Bale</strong>
                  <span>RW</span>
                </div>
                <span className="team-badge">Team 1</span>
              </div>
            </div>
          </div>
        </section>

        <section className="analysis-banner">
          <div className="banner-icon">🤖</div>

          <div>
            <span>AI PLAYER TRACKING</span>
            <h3>Turn match footage into player insights</h3>
            <p>
              Upload a football video and let the AI detect and track players,
              generate movement paths and create performance analytics.
            </p>
          </div>

          <button className="primary-button">
            Upload Match Video →
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;