import { useState } from 'react'
import './App.css'

function App() {
  const [activeNav, setActiveNav] = useState('earn')
  const [activeTab, setActiveTab] = useState('vaults')
  const [v2Enabled, setV2Enabled] = useState(true)

  const vaults = [
    {
      name: 'Steakhouse USDC',
      deposits: { amount: '448.80M', token: 'USDC', usd: '$448.67M' },
      liquidity: { amount: '130.33M', token: 'USDC', usd: '$130.30M' },
      curator: 'Gauntlet',
      exposure: ['WBTC', 'WETH', 'USDC'],
      apy: '3.23%'
    },
    {
      name: 'Gauntlet USDC Prime',
      deposits: { amount: '139.38M', token: 'USDC', usd: '$139.34M' },
      liquidity: { amount: '55.68M', token: 'USDC', usd: '$55.66M' },
      curator: 'Gauntlet',
      exposure: ['WBTC', 'WETH', 'USDC'],
      apy: '3.56%'
    },
    {
      name: 'Gauntlet USDT Core',
      deposits: { amount: '133.76M', token: 'USDT', usd: '$133.70M' },
      liquidity: { amount: '32.32M', token: 'USDT', usd: '$32.30M' },
      curator: 'Gauntlet',
      exposure: ['WBTC', 'WETH', 'USDC', 'USDT', 'DAI'],
      apy: '4.45%'
    },
    {
      name: 'Smokehouse USDC',
      deposits: { amount: '120.32M', token: 'USDC', usd: '$120.29M' },
      liquidity: { amount: '48.29M', token: 'USDC', usd: '$48.28M' },
      curator: 'Smokehouse',
      exposure: ['WBTC', 'WETH', 'USDC', 'USDT', 'DAI'],
      apy: '6.45%'
    },
    {
      name: 'Steakhouse USDT',
      deposits: { amount: '82.08M', token: 'USDT', usd: '$82.04M' },
      liquidity: { amount: '24.21M', token: 'USDT', usd: '$24.20M' },
      curator: 'Steakhouse',
      exposure: ['WBTC', 'WETH', 'USDC', 'USDT'],
      apy: '4.72%'
    }
  ]

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-icon">🦋</div>
              <span className="logo-text">Morpho</span>
              <span className="chevron">▼</span>
            </div>
            <nav className="nav">
              <button 
                className={`nav-link ${activeNav === 'earn' ? 'active' : ''}`}
                onClick={() => setActiveNav('earn')}
              >
                Earn
              </button>
              <button 
                className={`nav-link ${activeNav === 'leaderboard' ? 'active' : ''}`}
                onClick={() => setActiveNav('leaderboard')}
              >
                Leaderboard
              </button>
              <button 
                className={`nav-link ${activeNav === 'arena' ? 'active' : ''}`}
                onClick={() => setActiveNav('arena')}
              >
                Arena
              </button>
            </nav>
          </div>
          <div className="header-right">
            <button className="network-selector">
              <span className="eth-icon">⟠</span>
              <span>Ethereum</span>
              <span className="chevron">▼</span>
            </button>
            <button className="connect-wallet-btn">Connect Wallet</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-left">
              <div className="stats-card">
                <div className="stats-label">Total Deposits</div>
                <div className="stats-value">$8,513,689,816</div>
              </div>
              <div className="hero-heading">
                <h1 className="heading-line">Earn on</h1>
                <h1 className="heading-line">your terms</h1>
              </div>
              <button className="hero-connect-btn">Connect Wallet</button>
            </div>
            <div className="hero-right">
              <div className="isometric-graphic">
                <div className="iso-shape iso-shape-1"></div>
                <div className="iso-shape iso-shape-2"></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'positions' ? 'active' : ''}`}
                onClick={() => setActiveTab('positions')}
              >
                Your positions
              </button>
              <button 
                className={`tab ${activeTab === 'vaults' ? 'active' : ''}`}
                onClick={() => setActiveTab('vaults')}
              >
                Vaults
              </button>
            </div>

            {/* Filters and Search */}
            <div className="filters-section">
              <div className="filters-left">
                <div className="filter-group">
                  <span className="filter-label">V2</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={v2Enabled}
                      onChange={(e) => setV2Enabled(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="filter-group">
                  <span className="filter-label">Deposit:</span>
                  <button className="filter-btn">
                    <span>All</span>
                    <span className="chevron">▼</span>
                  </button>
                </div>
                <div className="filter-group">
                  <span className="filter-label">Curator:</span>
                  <button className="filter-btn">
                    <span>All</span>
                    <span className="chevron">▼</span>
                  </button>
                </div>
                <button className="filter-icon-btn">⚙️</button>
              </div>
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Filter vaults" 
                  className="search-input"
                />
              </div>
            </div>

            {/* Vaults Table */}
            <div className="table-container">
              <table className="vaults-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        Vault
                        <span className="sort-icon">⇅</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        Deposits
                        <span className="sort-icon">⇅</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        Liquidity
                        <span className="sort-icon">⇅</span>
                      </div>
                    </th>
                    <th>Curator</th>
                    <th>Exposure</th>
                    <th>
                      <div className="th-content">
                        APY
                        <span className="sort-icon">⇅</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vaults.map((vault, index) => (
                    <tr key={index} className="vault-row">
                      <td>
                        <div className="vault-cell">
                          <div className="vault-avatar">🪙</div>
                          <span className="vault-name">{vault.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="amount-cell">
                          <div className="amount-primary">
                            {vault.deposits.amount} {vault.deposits.token}
                          </div>
                          <div className="amount-secondary">{vault.deposits.usd}</div>
                        </div>
                      </td>
                      <td>
                        <div className="amount-cell">
                          <div className="amount-primary">
                            {vault.liquidity.amount} {vault.liquidity.token}
                          </div>
                          <div className="amount-secondary">{vault.liquidity.usd}</div>
                        </div>
                      </td>
                      <td>
                        <div className="curator-cell">
                          <div className="curator-avatar">👤</div>
                        </div>
                      </td>
                      <td>
                        <div className="exposure-cell">
                          {vault.exposure.slice(0, 3).map((token, i) => (
                            <div key={i} className="exposure-token">{token}</div>
                          ))}
                          {vault.exposure.length > 3 && (
                            <div className="exposure-more">+{vault.exposure.length - 3}</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="apy-cell">
                          <span>{vault.apy}</span>
                          <span className="info-icon">ℹ️</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="pagination-btn" disabled>←</button>
              <div className="pagination-info">
                <input type="text" className="page-input" defaultValue="1" />
                <span>of {vaults.length}</span>
              </div>
              <button className="pagination-btn">→</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
