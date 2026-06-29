/**
 * Broski - Application Controller
 * Handles State, Navigation, Theme, Charts, Forecaster, SWOT, and Kanban Boards.
 */

class Broski {
  constructor() {
    // Core Application State
    this.activePanel = 'dashboard';
    this.activeTemplate = 'saas';
    this.activePersona = 'Sarah';
    this.theme = 'dark';

    // Business Data Cache (shallow copied from template default, can be modified by user)
    this.kpis = {};
    this.swot = {};
    this.kanban = [];

    // Chat histories mapped by [template][persona] to preserve context
    this.chatHistories = {
      saas: { Sarah: [], Marcus: [], Elena: [] },
      ecommerce: { Sarah: [], Marcus: [], Elena: [] },
      retail: { Sarah: [], Marcus: [], Elena: [] }
    };

    // Chart.js instances
    this.revenueChart = null;
    this.channelChart = null;
    this.forecasterChart = null;
  }

  init() {
    // 1. Initial State Setup
    this.loadTemplateState(this.activeTemplate);
    this.initializeChatGreetings();

    // 2. DOM Elements Bindings & Event Listeners
    this.initNavigation();
    this.initTheme();

    // 3. Chart.js Initialization
    this.initCharts();

    // 4. Initial Render
    this.renderAll();
  }

  // ==========================================
  // State & Template Management
  // ==========================================

  loadTemplateState(templateKey) {
    const defaultData = BUSINESS_TEMPLATES[templateKey];
    this.activeTemplate = templateKey;
    
    // Create copies of the mock data to allow local customization in dashboard
    this.kpis = JSON.parse(JSON.stringify(defaultData.kpis));
    this.swot = JSON.parse(JSON.stringify(defaultData.swot));
    this.kanban = JSON.parse(JSON.stringify(defaultData.kanban));

    // Update Forecaster controls to match template defaults
    const startRevSlider = document.getElementById('forecast-start-rev');
    const growthSlider = document.getElementById('forecast-growth-rate');
    const churnSlider = document.getElementById('forecast-churn-rate');

    if (templateKey === 'saas') {
      startRevSlider.value = 45000;
      growthSlider.value = 12.4;
      churnSlider.value = 2.1;
    } else if (templateKey === 'ecommerce') {
      startRevSlider.value = 89000;
      growthSlider.value = 8.7;
      churnSlider.value = 5.0; // Estimate
    } else if (templateKey === 'retail') {
      startRevSlider.value = 32000;
      growthSlider.value = 4.1;
      churnSlider.value = 8.0; // Estimate
    }

    // Refresh suggested prompts list in Chat
    this.renderPromptSuggestions();
  }

  handleTemplateChange(value) {
    this.loadTemplateState(value);
    this.renderAll();
    
    // If chat is open, force greeting refresh or state reload
    if (this.activePanel === 'chat') {
      this.renderChatHistory();
    }
  }

  // ==========================================
  // Panel Navigation
  // ==========================================

  initNavigation() {
    const panels = ['dashboard', 'chat', 'forecaster', 'swot', 'kanban'];
    panels.forEach(p => {
      const link = document.getElementById(`nav-${p}`);
      if (link) {
        link.addEventListener('click', () => this.switchPanel(p));
      }
    });
  }

  switchPanel(panelId) {
    // 1. Remove active state from current panel & nav link
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    // 2. Activate new panel & highlight link
    document.getElementById(`panel-${panelId}`).classList.add('active');
    document.getElementById(`nav-${panelId}`).classList.add('active');
    this.activePanel = panelId;

    // 3. Update Title Header
    const headerTitles = {
      dashboard: "Executive KPI Dashboard",
      chat: "AI Operations Chatroom",
      forecaster: "Compound Revenue Forecaster",
      swot: "Strategic SWOT Analysis",
      kanban: "Decision Action Planner"
    };
    document.getElementById('page-header-title').textContent = headerTitles[panelId] || "Dashboard";

    // 4. Panel Specific Hooks (e.g. refitting/updating charts inside hidden containers)
    if (panelId === 'dashboard') {
      this.updateCharts();
    } else if (panelId === 'forecaster') {
      this.updateForecaster();
    } else if (panelId === 'chat') {
      this.renderChatHistory();
      this.scrollChatToBottom();
    } else if (panelId === 'swot') {
      this.renderSWOT();
    } else if (panelId === 'kanban') {
      this.renderKanban();
    }
  }

  // ==========================================
  // Dark/Light Theme Engine
  // ==========================================

  initTheme() {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(systemPrefersDark ? 'dark' : 'light');
  }

  toggleTheme() {
    const target = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(target);
  }

  setTheme(themeName) {
    this.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);

    const label = document.getElementById('theme-text-label');
    const sunIcon = document.getElementById('theme-sun-icon');
    const moonIcon = document.getElementById('theme-moon-icon');

    if (themeName === 'light') {
      label.textContent = "Light Theme";
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    } else {
      label.textContent = "Dark Theme";
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }

    // Refresh charts to apply updated grid/font colors
    this.initCharts();
    if (this.activePanel === 'dashboard') {
      this.updateCharts();
    } else if (this.activePanel === 'forecaster') {
      this.updateForecaster();
    }
  }

  // ==========================================
  // KPI Calculations & Custom Overrides
  // ==========================================

  renderKPIs() {
    const container = document.getElementById('dashboard-kpis');
    container.innerHTML = '';

    const list = [
      { key: 'primary', accent: '' },
      { key: 'secondary1', accent: 'accent-purple' },
      { key: 'secondary2', accent: 'accent-pink' },
      { key: 'secondary3', accent: 'accent-emerald' },
      { key: 'secondary4', accent: 'accent-amber' }
    ];

    list.forEach(item => {
      const data = this.kpis[item.key];
      if (!data) return;

      const card = document.createElement('div');
      card.className = `glass-card kpi-card ${item.accent}`;

      const trendClass = data.isPositive ? 'positive' : 'negative';
      // Mini trend symbols
      const trendIcon = data.isPositive ? '▲' : '▼';

      card.innerHTML = `
        <span class="kpi-label">${data.label}</span>
        <span class="kpi-value">${data.value}</span>
        <span class="kpi-trend ${trendClass}">${trendIcon} ${data.trend}</span>
      `;
      container.appendChild(card);
    });

    this.renderOverrideInputs();
  }

  renderOverrideInputs() {
    const container = document.getElementById('metrics-override-inputs');
    container.innerHTML = '';

    Object.keys(this.kpis).forEach(key => {
      const kpi = this.kpis[key];
      
      const div = document.createElement('div');
      div.className = 'override-input-group';
      div.innerHTML = `
        <label for="override-${key}">${kpi.label}</label>
        <input type="text" id="override-${key}" value="${kpi.value}" onchange="app.handleMetricOverride('${key}', this.value)">
      `;
      container.appendChild(div);
    });
  }

  handleMetricOverride(key, newValue) {
    this.kpis[key].value = newValue;
    // Calculate simple trend text adjustments if needed, or keep same
    this.kpis[key].trend = "Custom Override";
    this.kpis[key].isPositive = true;

    this.renderKPIs();
  }

  // ==========================================
  // Charting Systems
  // ==========================================

  initCharts() {
    const isDark = this.theme === 'dark';
    const textMutedColor = isDark ? '#64748b' : '#94a3b8';
    const gridLineColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    // Global Font Settings override
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = textMutedColor;

    // Destroy existing instances if refreshing theme
    if (this.revenueChart) this.revenueChart.destroy();
    if (this.channelChart) this.channelChart.destroy();
    if (this.forecasterChart) this.forecasterChart.destroy();

    // 1. Revenue Chart Init
    const revCtx = document.getElementById('revenueTrendChart')?.getContext('2d');
    if (revCtx) {
      this.revenueChart = new Chart(revCtx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: textMutedColor } },
            y: { grid: { color: gridLineColor }, ticks: { color: textMutedColor } }
          }
        }
      });
    }

    // 2. Channel Share Chart Init
    const chCtx = document.getElementById('channelShareChart')?.getContext('2d');
    if (chCtx) {
      this.channelChart = new Chart(chCtx, {
        type: 'doughnut',
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textMutedColor, boxWidth: 12, padding: 12 }
            }
          },
          cutout: '70%'
        }
      });
    }

    // 3. Forecaster Chart Init
    const fcCtx = document.getElementById('forecasterChart')?.getContext('2d');
    if (fcCtx) {
      this.forecasterChart = new Chart(fcCtx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: textMutedColor } },
            y: { grid: { color: gridLineColor }, ticks: { color: textMutedColor } }
          }
        }
      });
    }
  }

  updateCharts() {
    const data = BUSINESS_TEMPLATES[this.activeTemplate].charts;
    if (!data) return;

    // Update Line Chart
    if (this.revenueChart) {
      this.revenueChart.data.labels = data.revenue.labels;
      this.revenueChart.data.datasets = data.revenue.datasets;
      // Adjust color styles based on current theme
      const isDark = this.theme === 'dark';
      this.revenueChart.data.datasets[0].borderColor = this.activeTemplate === 'saas' ? '#6366f1' : this.activeTemplate === 'ecommerce' ? '#a855f7' : '#10b981';
      this.revenueChart.data.datasets[0].backgroundColor = this.activeTemplate === 'saas' ? 'rgba(99, 102, 241, 0.15)' : this.activeTemplate === 'ecommerce' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(16, 185, 129, 0.15)';
      this.revenueChart.update();
    }

    // Update Doughnut Chart
    if (this.channelChart) {
      this.channelChart.data.labels = data.channels.labels;
      this.channelChart.data.datasets = [
        {
          data: data.channels.data,
          backgroundColor: data.channels.colors,
          borderWidth: this.theme === 'dark' ? 2 : 1,
          borderColor: this.theme === 'dark' ? '#161e36' : '#fff'
        }
      ];
      this.channelChart.update();
    }
  }

  // ==========================================
  // Simulated AI Chatroom Engine
  // ==========================================

  initializeChatGreetings() {
    // Add default expert greetings for all models and personas
    const templates = ['saas', 'ecommerce', 'retail'];
    const personas = {
      Sarah: { role: "Financial Analyst", intro: "Hello! I am Sarah, your financial analyst partner. I monitor recurring revenues, unit economics, budgets, and operational burn. How can I help optimize your margins or review channel allocations today?" },
      Marcus: { role: "Growth Strategist", intro: "Hey there, Marcus here! I look at acquisition scaling, conversion loops, email channels, and brand positioning. Let's dig into your traffic distribution and marketing ROI." },
      Elena: { role: "Operations Lead", intro: "Welcome. I am Elena, operations and customer support director. I focus on optimizing onboarding pipelines, logistics, staff schedules, and customer SLAs. What operational bottleneck can we solve today?" }
    };

    templates.forEach(t => {
      Object.keys(personas).forEach(p => {
        this.chatHistories[t][p] = [
          { sender: 'assistant', text: personas[p].intro, timestamp: new Date() }
        ];
      });
    });
  }

  selectPersona(personaName) {
    this.activePersona = personaName;

    // Highlight card
    document.querySelectorAll('.persona-card').forEach(c => c.classList.remove('active'));
    document.getElementById(`persona-${personaName}`).classList.add('active');

    // Update chat active header elements
    const avatar = document.getElementById('active-chat-avatar');
    const nameText = document.getElementById('active-chat-name');

    const avatars = { Sarah: 'SF', Marcus: 'MM', Elena: 'EO' };
    avatar.textContent = avatars[personaName];
    nameText.textContent = personaName === 'Sarah' ? 'Sarah Finance' : personaName === 'Marcus' ? 'Marcus Marketing' : 'Elena Operations';

    // Render corresponding history
    this.renderChatHistory();
    this.scrollChatToBottom();
  }

  renderChatHistory() {
    const scrollContainer = document.getElementById('chat-messages-scroll');
    scrollContainer.innerHTML = '';

    const history = this.chatHistories[this.activeTemplate][this.activePersona];
    
    history.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${msg.sender}`;
      
      const avatarLabel = msg.sender === 'user' ? 'ME' : (this.activePersona === 'Sarah' ? 'SF' : this.activePersona === 'Marcus' ? 'MM' : 'EO');

      bubble.innerHTML = `
        <div class="chat-bubble-avatar">${avatarLabel}</div>
        <div class="chat-bubble-content">${this.formatMarkdown(msg.text)}</div>
      `;
      scrollContainer.appendChild(bubble);
    });
  }

  formatMarkdown(text) {
    // A simple parser for headers, lists, buttons, and tables to render markdown natively in HTML chat bubbles
    let html = text;

    // Headers (e.g. ### Title)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

    // Tables
    // Match basic markdown tables and convert them to HTML <table>
    const tableRegex = /\|(.+)\|[\r\n]\|[-:| ]+\|[\r\n]((?:\|.+|[\r\n])*)/g;
    html = html.replace(tableRegex, (match, headerRow, bodyContent) => {
      const headers = headerRow.split('|').map(h => h.trim()).filter(h => h);
      const rows = bodyContent.split('\n').filter(r => r.trim()).map(r => {
        return r.split('|').map(td => td.trim()).filter(td => td);
      });

      let tableHtml = '<table><thead><tr>';
      headers.forEach(h => tableHtml += `<th>${h}</th>`);
      tableHtml += '</tr></thead><tbody>';
      
      rows.forEach(r => {
        if (r.length === 0) return;
        tableHtml += '<tr>';
        r.forEach(td => tableHtml += `<td>${td}</td>`);
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table>';
      return tableHtml;
    });

    // Bullets (e.g. 1. or - )
    html = html.replace(/^\s*\-\s(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
    // Consolidate adjacent <ul> blocks
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // Bold tags
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Newlines
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  renderPromptSuggestions() {
    const suggestionsBox = document.getElementById('chat-prompt-suggestions');
    suggestionsBox.innerHTML = '';

    const suggestions = {
      saas: [
        { label: "Analyze user retention & churn drivers", key: "retention" },
        { label: "Audit marketing channels & CAC payback", key: "marketing" }
      ],
      ecommerce: [
        { label: "How can we lift repeat customer rates?", key: "retention" },
        { label: "Analyze our conversion funnel & ROAS leak", key: "marketing" }
      ],
      retail: [
        { label: "How do we fix rising labor cost share?", key: "retention" },
        { label: "Optimize local search & acquisition channels", key: "marketing" }
      ]
    };

    const list = suggestions[this.activeTemplate] || [];
    list.forEach(s => {
      const chip = document.createElement('span');
      chip.className = 'suggestion-chip';
      chip.textContent = s.label;
      chip.addEventListener('click', () => this.handleSuggestionClick(s.label, s.key));
      suggestionsBox.appendChild(chip);
    });
  }

  handleSuggestionClick(label, key) {
    this.submitUserMessage(label, key);
  }

  sendChatMessage() {
    const inputBox = document.getElementById('chat-input-box');
    const text = inputBox.value.trim();
    if (!text) return;

    inputBox.value = '';
    this.submitUserMessage(text);
  }

  submitUserMessage(text, intentKey = null) {
    // 1. Push user message
    this.chatHistories[this.activeTemplate][this.activePersona].push({
      sender: 'user',
      text: text,
      timestamp: new Date()
    });
    this.renderChatHistory();
    this.scrollChatToBottom();

    // 2. Render typing indicator
    const scrollContainer = document.getElementById('chat-messages-scroll');
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble assistant typing-temp';
    typingBubble.innerHTML = `
      <div class="chat-bubble-avatar">${this.activePersona === 'Sarah' ? 'SF' : this.activePersona === 'Marcus' ? 'MM' : 'EO'}</div>
      <div class="chat-bubble-content">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    scrollContainer.appendChild(typingBubble);
    this.scrollChatToBottom();

    // 3. Match reply logic (Simulated LLM)
    setTimeout(() => {
      // Remove typing bubble
      document.querySelector('.typing-temp')?.remove();

      let replyText = "";
      const cleanedText = text.toLowerCase();

      // Check if we clicked a predefined suggestion or matches key words
      if (intentKey === 'retention' || cleanedText.includes('retention') || cleanedText.includes('churn') || cleanedText.includes('labor')) {
        replyText = BUSINESS_TEMPLATES[this.activeTemplate].chatResponses.retention[this.activePersona];
      } else if (intentKey === 'marketing' || cleanedText.includes('marketing') || cleanedText.includes('acquisition') || cleanedText.includes('roi') || cleanedText.includes('ad spend') || cleanedText.includes('channels')) {
        replyText = BUSINESS_TEMPLATES[this.activeTemplate].chatResponses.marketing[this.activePersona];
      } else {
        // Build a dynamic generic business reply based on keyword patterns
        replyText = this.generateFallbackResponse(text);
      }

      this.chatHistories[this.activeTemplate][this.activePersona].push({
        sender: 'assistant',
        text: replyText,
        timestamp: new Date()
      });

      this.renderChatHistory();
      this.scrollChatToBottom();
    }, 1200);
  }

  generateFallbackResponse(userInput) {
    const normalizedInput = userInput.toLowerCase();
    let analystType = this.activePersona === 'Sarah' ? 'Finance Advisor' : this.activePersona === 'Marcus' ? 'Growth Specialist' : 'Operations Director';
    
    let focusArea = "business core";
    let listItems = [];
    let actionItem = "Review quarterly planning board";

    if (normalizedInput.includes('price') || normalizedInput.includes('cost') || normalizedInput.includes('margin')) {
      focusArea = "pricing elasticity and gross margin safety";
      listItems = [
        "Audit COGS variance over the past 90 days to identify contract slippage.",
        "Model a 5% price expansion targeting enterprise or bundle configurations.",
        "Transition low-margin customers towards standardized self-serve tiers."
      ];
      actionItem = "Audit margins and model price increase";
    } else if (normalizedInput.includes('competitor') || normalizedInput.includes('market') || normalizedInput.includes('devscale')) {
      focusArea = "market defense and value-add differentiation";
      listItems = [
        "Review feature overlap to double down on product moats (e.g. APIs, speeds).",
        "Launch defensive marketing campaigns focusing on reliability and security SLAs.",
        "Conduct competitive sales audit to identify win-back discounts."
      ];
      actionItem = "Create competitive response checklist";
    } else if (normalizedInput.includes('product') || normalizedInput.includes('feature') || normalizedInput.includes('onboard')) {
      focusArea = "product usability loops and onboarding activation";
      listItems = [
        "Verify user activation metrics inside setup flows.",
        "Construct walkthrough interactive guides to target user drop-offs.",
        "Establish in-app support chat widgets during product configuration."
      ];
      actionItem = "Audit onboarding drop-off funnels";
    } else {
      // General response
      focusArea = "strategic health checks and roadmap execution";
      listItems = [
        "Map this priority against our current SWOT opportunities to verify viability.",
        "Establish clear KPIs and baseline metrics before initiating operational shifts.",
        "Assign test action items on the planner board to gather cohort data."
      ];
      actionItem = "Schedule strategic alignment review";
    }

    return `### Executive Feedback - ${analystType}
Thanks for bringing up this query regarding **"${userInput}"**. From my perspective, we should focus on **${focusArea}** relative to our template metrics:

#### Recommended Actions:
- **Analyze Data Impact:** Ensure we align this decision with current trends.
- **Implement Operational Audits:**
  - ${listItems[0]}
  - ${listItems[1]}
  - ${listItems[2]}

Would you like to log this as a strategic roadmap objective?

<button class="chat-action-btn" onclick="app.addTaskFromChat('${actionItem}', '${this.activePersona === 'Sarah' ? 'Finance' : this.activePersona === 'Marcus' ? 'Marketing' : 'Operations'}')">Log ${actionItem} to Action Planner</button>`;
  }

  addTaskFromChat(title, category) {
    const desc = `Generated recommendation from ${this.activePersona} in Chat Room.`;
    
    // Add to state
    const newId = 'chat-t' + Date.now();
    this.kanban.push({
      id: newId,
      title: title,
      description: desc,
      status: 'todo',
      category: category
    });

    // Notify user with simple custom feedback overlay (simulate premium toast notification)
    alert(`Success: "${title}" has been successfully logged into your Action Planner under "To Do"!`);
    
    // If in planning panel, render
    if (this.activePanel === 'kanban') {
      this.renderKanban();
    }
  }

  scrollChatToBottom() {
    const scrollContainer = document.getElementById('chat-messages-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }

  // ==========================================
  // Financial Forecaster Engine
  // ==========================================

  updateForecaster() {
    // 1. Read values from sliders
    const startRev = parseFloat(document.getElementById('forecast-start-rev').value);
    const growth = parseFloat(document.getElementById('forecast-growth-rate').value) / 100;
    const churn = parseFloat(document.getElementById('forecast-churn-rate').value) / 100;

    // Update labels
    document.getElementById('forecast-start-rev-val').textContent = this.formatCurrency(startRev);
    document.getElementById('forecast-growth-rate-val').textContent = (growth * 100).toFixed(1) + '%';
    document.getElementById('forecast-churn-rate-val').textContent = (churn * 100).toFixed(1) + '%';

    // 2. Perform 12 Month Compounding Calculation
    // Formula: Rev_t = Rev_{t-1} * (1 + net_growth) where net_growth = growth - churn
    const netGrowth = growth - churn;
    let projectionData = [startRev];
    let labels = ["Start"];

    for (let m = 1; m <= 12; m++) {
      const nextRev = projectionData[m - 1] * (1 + netGrowth);
      projectionData.push(nextRev);
      labels.push(`Month ${m}`);
    }

    // 3. Update forecast milestone indicators
    const m12Val = projectionData[12];
    const arrVal = m12Val * 12;
    const profitVal = arrVal * 0.70; // 70% estimated margin

    document.getElementById('forecast-m12-sales').textContent = this.formatCurrency(m12Val);
    document.getElementById('forecast-arr').textContent = this.formatCurrency(arrVal);
    document.getElementById('forecast-profit').textContent = this.formatCurrency(profitVal);

    // 4. Update Projections Chart
    if (this.forecasterChart) {
      this.forecasterChart.data.labels = labels;
      this.forecasterChart.data.datasets = [{
        label: "Projected Sales ($)",
        data: projectionData,
        borderColor: "#a855f7",
        backgroundColor: "rgba(168, 85, 247, 0.15)",
        fill: true,
        tension: 0.35
      }];
      this.forecasterChart.update();
    }
  }

  formatCurrency(value) {
    return '$' + value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  // ==========================================
  // SWOT Matrix Engine
  // ==========================================

  renderSWOT() {
    const quadrants = ['strengths', 'weaknesses', 'opportunities', 'threats'];

    quadrants.forEach(q => {
      const listElement = document.getElementById(`swot-list-${q}`);
      listElement.innerHTML = '';

      const items = this.swot[q] || [];
      items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'swot-item';
        itemDiv.innerHTML = `
          <span>${item}</span>
          <button class="delete-swot-btn" onclick="app.deleteSwotItem('${q}', ${index})">
            <!-- Trash Icon -->
            <svg viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        `;
        listElement.appendChild(itemDiv);
      });
    });
  }

  addSwotItem(quadrant) {
    const inputField = document.getElementById(`swot-input-${quadrant}`);
    const value = inputField.value.trim();
    if (!value) return;

    this.swot[quadrant].push(value);
    inputField.value = '';
    this.renderSWOT();
  }

  deleteSwotItem(quadrant, index) {
    this.swot[quadrant].splice(index, 1);
    this.renderSWOT();
  }

  resetSwotData() {
    const confirmReset = confirm("Are you sure you want to reset the SWOT analysis to the template defaults?");
    if (confirmReset) {
      this.swot = JSON.parse(JSON.stringify(BUSINESS_TEMPLATES[this.activeTemplate].swot));
      this.renderSWOT();
    }
  }

  // ==========================================
  // Kanban Planner Engine
  // ==========================================

  renderKanban() {
    const columns = ['todo', 'inprogress', 'done'];

    columns.forEach(col => {
      const listElement = document.getElementById(`list-${col}`);
      const badgeElement = document.getElementById(`badge-${col}`);
      listElement.innerHTML = '';

      const filteredTasks = this.kanban.filter(t => t.status === col);
      badgeElement.textContent = filteredTasks.length;

      filteredTasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.draggable = true;
        
        // Add drag start listener
        card.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', task.id);
        });

        // HTML building
        let footerControls = '';
        
        if (col === 'todo') {
          footerControls = `
            <button class="card-action-nav-btn" onclick="app.moveCard('${task.id}', 'forward')" title="Move to In Progress">
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          `;
        } else if (col === 'inprogress') {
          footerControls = `
            <button class="card-action-nav-btn" onclick="app.moveCard('${task.id}', 'backward')" title="Move to To Do">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="card-action-nav-btn" onclick="app.moveCard('${task.id}', 'forward')" title="Move to Completed">
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          `;
        } else if (col === 'done') {
          footerControls = `
            <button class="card-action-nav-btn" onclick="app.moveCard('${task.id}', 'backward')" title="Move back to In Progress">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          `;
        }

        card.innerHTML = `
          <span class="card-category">${task.category}</span>
          <h4 class="card-title">${task.title}</h4>
          <p class="card-desc">${task.description}</p>
          <div class="card-footer">
            <button class="delete-card-btn" onclick="app.deleteCard('${task.id}')" title="Delete Task">
              <svg viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
            <div class="card-actions">
              ${footerControls}
            </div>
          </div>
        `;
        listElement.appendChild(card);
      });
    });
  }

  handleCardDrop(event, statusColumn) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const taskIndex = this.kanban.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
      this.kanban[taskIndex].status = statusColumn;
      this.renderKanban();
    }
  }

  moveCard(cardId, direction) {
    const taskIndex = this.kanban.findIndex(t => t.id === cardId);
    if (taskIndex === -1) return;

    const currentStatus = this.kanban[taskIndex].status;
    let nextStatus = currentStatus;

    if (direction === 'forward') {
      if (currentStatus === 'todo') nextStatus = 'inprogress';
      else if (currentStatus === 'inprogress') nextStatus = 'done';
    } else {
      if (currentStatus === 'done') nextStatus = 'inprogress';
      else if (currentStatus === 'inprogress') nextStatus = 'todo';
    }

    this.kanban[taskIndex].status = nextStatus;
    this.renderKanban();
  }

  deleteCard(cardId) {
    this.kanban = this.kanban.filter(t => t.id !== cardId);
    this.renderKanban();
  }

  addQuickTask(statusColumn) {
    const titleInput = document.getElementById(`input-${statusColumn}-title`);
    const descInput = document.getElementById(`input-${statusColumn}-desc`);

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (!title) return;

    const newId = 'task-' + Date.now();
    this.kanban.push({
      id: newId,
      title: title,
      description: desc || "No description provided.",
      status: statusColumn,
      category: "Ad-hoc"
    });

    titleInput.value = '';
    descInput.value = '';
    this.renderKanban();
  }

  resetKanbanData() {
    const confirmReset = confirm("Are you sure you want to reset all tasks back to the template defaults?");
    if (confirmReset) {
      this.kanban = JSON.parse(JSON.stringify(BUSINESS_TEMPLATES[this.activeTemplate].kanban));
      this.renderKanban();
    }
  }

  // ==========================================
  // Render Orchestrator
  // ==========================================

  renderAll() {
    this.renderKPIs();
    this.updateCharts();
    
    // Panel specific updates if currently active
    if (this.activePanel === 'forecaster') {
      this.updateForecaster();
    } else if (this.activePanel === 'chat') {
      this.renderChatHistory();
    } else if (this.activePanel === 'swot') {
      this.renderSWOT();
    } else if (this.activePanel === 'kanban') {
      this.renderKanban();
    }
  }
}

// Global App Instance
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new Broski();
  app.init();
});
