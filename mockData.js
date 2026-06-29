const BUSINESS_TEMPLATES = {
  saas: {
    name: "SaaS Platform (CloudScale)",
    type: "saas",
    kpis: {
      primary: { label: "Monthly Recurring Revenue (MRR)", value: "$45,200", trend: "+12.4% MoM", isPositive: true },
      secondary1: { label: "User Churn Rate", value: "2.1%", trend: "-0.4% Improvement", isPositive: true },
      secondary2: { label: "Customer Lifetime Value (LTV)", value: "$2,150", trend: "+$120", isPositive: true },
      secondary3: { label: "Customer Acquisition Cost (CAC)", value: "$180", trend: "+$5 Increase", isPositive: false },
      secondary4: { label: "LTV : CAC Ratio", value: "11.9x", trend: "Excellent Health", isPositive: true }
    },
    charts: {
      revenue: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "MRR ($)",
            data: [32000, 34500, 37200, 40100, 42800, 45200],
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            fill: true,
            tension: 0.4
          }
        ]
      },
      channels: {
        labels: ["Google Search", "Content Marketing", "Cold Outreach", "Affiliates", "Referral Program"],
        data: [42, 25, 15, 10, 8],
        colors: ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#10b981"]
      }
    },
    swot: {
      strengths: [
        "High LTV to CAC ratio (11.9x)",
        "Consistent 12% MoM MRR growth",
        "Robust developer API & integration ecosystem"
      ],
      weaknesses: [
        "Heavy reliance on paid Google Ads for lead generation",
        "Onboarding drop-off is high (35% user exit during setup)",
        "Mobile application rating has dropped to 3.2 stars"
      ],
      opportunities: [
        "Expansion into European enterprise markets",
        "Launch AI-powered workflow automation add-on",
        "Create developer certification program to drive integrations"
      ],
      threats: [
        "Competitor 'DevScale' just raised Series B funding",
        "Upcoming GDPR compliance audit in EU market",
        "Increasing cost-per-click rates on target search terms"
      ]
    },
    kanban: [
      { id: "s-t1", title: "Optimize Google Ads campaigns", description: "Review keyword bids to bring down high target search CPC and improve acquisition margins.", status: "todo", category: "Marketing" },
      { id: "s-t2", title: "Redesign user onboarding walkthrough", description: "Create an interactive product tour to address the 35% drop-off rate during setup.", status: "inprogress", category: "Product" },
      { id: "s-t3", title: "Conduct customer feedback interviews", description: "Talk to users who canceled in the last 30 days to understand MRR churn drivers.", status: "done", category: "Research" }
    ],
    chatResponses: {
      retention: {
        Sarah: `### Churn & Retention Analysis - Financial Perspective
Our **User Churn Rate is at 2.1%**, which is healthy for an early-stage B2B SaaS, but presents a leak in our recurring revenue engine.

#### Key Findings:
1. **MRR Drag:** At our current size of **$45,200 MRR**, a 2.1% churn represents roughly **$950/month** in lost MRR. Over 12 months, compounding, this reduces our growth trajectory by ~**$18,000**.
2. **Onboarding Funnel Loss:** Our largest drop-off occurs within the first 7 days (35% drop-off rate).

| Cohort Time | Drop-off | Primary Driver |
|---|---|---|
| Day 1 | 15% | Complex API keys setup |
| Day 3 | 12% | Lack of demo data templates |
| Day 7 | 8% | No core value realization |

#### Financial Recommendations:
- **Implement a self-serve setup wizard:** Reducing onboarding drop-off by 10% can boost new active users by ~50 per month, translating to an estimated **$2,500/month** in additional MRR.
- **Incentivize annual plans:** Offer a 15% discount for annual commitments to lock in users and lower churn volatility.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Create annual plan upgrade pricing model', 'Finance')">Add Plan to Action Board</button>`,
        Marcus: `### Retention Strategy - Growth & Brand Perspective
Retention is the ultimate marketing engine! It costs **$180 (CAC)** to acquire a new customer. Keeping them longer increases our LTV:CAC ratio which stands at a strong **11.9x**.

#### Growth Tactics to Address Churn:
1. **Automated Lifecycle Email Campaign:** Trigger targeted tutorials when a user stops active usage for 48 hours.
2. **Mobile App NPS Campaign:** Find out why mobile ratings dropped to 3.2 stars. We should run in-app microsurveys.
3. **Customer Spotlight Program:** Feature highly active users in our monthly newsletter to foster community.

#### Target Channels to Revitalize:
- **Email Newsletters:** Promote new product features directly to inactive users.
- **Referral Loop:** Launch a customer referral reward system (e.g., $50 credits for both parties).

<button class="chat-action-btn" onclick="app.addTaskFromChat('Build automated 7-day retention email campaign', 'Marketing')">Add Campaign to Action Board</button>`,
        Elena: `### Churn Reduction - Operations & Customer Support
Operations must align around our onboarding bottlenecks. A 35% setup drop-off is operational waste.

#### Actionable Workflows:
1. **Automated VIP Alerts:** When a client with >$200/mo potential signs up, automatically notify the Customer Success team via Slack for high-touch onboarding.
2. **Support Ticket Review:** 40% of onboarding support queries relate to "database sync errors".
3. **API Integration Guides:** Simplify onboarding documentation.

#### Recommended Action Plan:
- **Audit support scripts:** standardizing onboarding trouble-shooting.
- **Implement Intercom Live Chat:** during the developer API setup phase.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Integrate onboarding live-chat assistance', 'Operations')">Add Integration to Action Board</button>`
      },
      marketing: {
        Sarah: `### Marketing ROI Review - Financial Analyst
Our current CAC is **$180** against an LTV of **$2,150**. This gives us an exceptionally strong LTV:CAC ratio of **11.9x**. We are currently under-leveraging paid acquisition.

#### Marketing Spend Allocation:
- **Google Search (42%):** Good volume, but rising CPC ($8.50/click) is reducing margin.
- **Content Marketing (25%):** Highest ROI. High initial cost, but zero variable costs. Leads convert 2.2x faster.
- **Cold Outreach (15%):** High effort, low predictability. LTV from these accounts is higher but cycle times are long (90+ days).

#### Recommendations:
1. **Double down on SEO Content:** Shift 10% budget from low-performing search ads to long-form SEO guides.
2. **Create custom landing pages:** Boost conversions from 2.1% to 3.5% to decrease CAC dynamically.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Shift 10% budget from search ads to SEO', 'Finance')">Add Budget Shift to Action Board</button>`,
        Marcus: `### Acquisition & Expansion Strategy - Growth Specialist
To scale CloudScale from **$45,200 MRR** to **$100,000 MRR**, we need to expand our channel mix. Relying on Google Search for 42% of traffic is a strategic risk.

#### Growth Playbook:
1. **Launch Co-Marketing Webinars:** Partner with non-competing tools in the DevOps space to tap into their audiences.
2. **Affiliate Expansion:** Double our affiliate payouts from 10% to 20% for the first year. It currently only accounts for 10% of users.
3. **Interactive Tools (Side-Project Marketing):** Build a free calculator tool that targets developer speed optimization.

#### Channel Scaling Goals:
* **Organic Referrals:** Raise from 8% to 15% via a viral in-app invite loop.
* **Affiliate Channels:** Increase target share to 20% within 90 days.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Establish co-marketing partnerships with non-competing tools', 'Marketing')">Add Partnership to Action Board</button>`,
        Elena: `### Marketing Pipeline - Operations perspective
Our marketing pipeline suffers from poor handoffs. Leads are coming in from Google Search but our sales/support operations are not optimized to close them fast.

#### Process Fixes:
1. **Lead Scoring system:** Integrate a scoring mechanism to pass only ready accounts to Customer Success.
2. **Standard Operating Procedures (SOP):** Document demo call guidelines to ensure consistent conversion rates (currently varies from 15% to 45% by rep).
3. **Automate calendar bookings:** Remove friction in scheduling demo calls.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Establish SOP for sales demo follow-ups', 'Operations')">Add SOP to Action Board</button>`
      }
    }
  },
  ecommerce: {
    name: "E-Commerce Store (LuxeDecor)",
    type: "ecommerce",
    kpis: {
      primary: { label: "Monthly Gross Revenue", value: "$89,400", trend: "+8.7% MoM", isPositive: true },
      secondary1: { label: "Conversion Rate", value: "3.2%", trend: "+0.5% MoM", isPositive: true },
      secondary2: { label: "Average Order Value (AOV)", value: "$75.50", trend: "-$2.30 Decrease", isPositive: false },
      secondary3: { label: "Repeat Customer Rate", value: "28.0%", trend: "+2.1% Increase", isPositive: true },
      secondary4: { label: "Ad Spend Return (ROAS)", value: "3.4x", trend: "Target: 4.0x", isPositive: false }
    },
    charts: {
      revenue: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Gross Sales ($)",
            data: [68000, 71500, 75000, 81000, 84900, 89400],
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.15)",
            fill: true,
            tension: 0.4
          }
        ]
      },
      channels: {
        labels: ["Instagram Shopping", "Google Search", "Email Campaigns", "Pinterest Feed", "Direct / Word"],
        data: [48, 22, 18, 7, 5],
        colors: ["#ec4899", "#6366f1", "#10b981", "#ef4444", "#f59e0b"]
      }
    },
    swot: {
      strengths: [
        "Highly engaging social media presence (48% of sales via Instagram)",
        "Excellent product quality reflected in high customer reviews (4.7 avg)",
        "Strong repeat customer trend (28% return rate)"
      ],
      weaknesses: [
        "AOV dropping ($75.50), squeeze on fulfillment profits",
        "High shipping costs eating into margins on small orders",
        "Heavy inventory lock-up in slow-moving accessory items"
      ],
      opportunities: [
        "Introduce curated bundles to increase AOV",
        "Launch SMS marketing program for high-converting VIPs",
        "Expand into international shipping (particularly Canada/UK)"
      ],
      threats: [
        "Rising Meta CPMs (advertising costs) cutting into ROAS",
        "Disruption in overseas supply chain adding 2-week delays",
        "New competitor matching our designs at lower prices"
      ]
    },
    kanban: [
      { id: "e-t1", title: "Create product bundle offers", description: "Design 3 curated set combinations with a 15% discount to push average order value past $90.", status: "todo", category: "Product" },
      { id: "e-t2", title: "Set up Klaviyo SMS channel", description: "Implement abandoned cart SMS flows to supplement email triggers.", status: "inprogress", category: "Marketing" },
      { id: "e-t3", title: "Negotiate packaging vendor rates", description: "Meet with suppliers to reduce box and wrapping costs to preserve unit margins.", status: "done", category: "Finance" }
    ],
    chatResponses: {
      retention: {
        Sarah: `### Repeat Purchase & LTV Analysis - Financial View
Our **Repeat Customer Rate is 28.0%**. This is a stable baseline, but e-commerce brands with 35%+ repeat purchase rates have 2x higher valuation multiples because retention requires zero direct ad spend.

#### Financial Impacts:
1. **Margin Analysis:** A new customer order ($75.50 AOV) costs $22 in marketing, resulting in a net product contribution of **$28.50** after COGS and shipping. A repeat customer order has a net product contribution of **$50.50** (no marketing cost).
2. **Impact of 5% Lift:** Raising repeat rate from 28% to 33% will generate an extra **$4,470/month** in high-margin sales.

#### Financial Recommendations:
- **Create a Tiered Loyalty Program:** Give points for purchases, social shares, and birthdays. This rewards retention and raises switching costs.
- **High-Margin Subscriptions:** Offer auto-delivery refills for maintenance items (e.g., candles, wax melts) at a 10% discount to generate predictable MRR.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Design VIP Loyalty Program structures', 'Finance')">Add Loyalty Plan to Action Board</button>`,
        Marcus: `### E-Commerce Retention - Growth & Engagement
We need to turn first-time buyers into brand advocates. The customer relationship shouldn't end at the confirmation email.

#### Growth Playbook:
1. **Unboxing Experience WOW Factor:** Insert custom thank you cards signed by the team and include a 15% discount code for their next purchase valid for 30 days.
2. **Win-back Email Flows:** Create a automated Klaviyo campaign targeting customers who haven't ordered in 60 days.
3. **VIP Early Access:** Offer our top 5% repeat customers early access to new product drops via SMS.

#### Target Channels:
* **SMS:** 98% open rates vs. 20% in email. Use SMS for quick flash sales.
* **Instagram DMs:** Actively message repeat buyers to ask for user-generated content (UGC) in exchange for gift cards.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Build automated 60-day customer win-back email sequence', 'Marketing')">Add Campaign to Action Board</button>`,
        Elena: `### Logistics & Fulfillment Operations for Retention
The fastest way to lose a repeat customer is bad shipping times or damaged packages.

#### Operational Priorities:
1. **Fulfillment Speed (SLA):** Ensure orders placed before 2:00 PM ship same-day. Current stats show 12% of orders take over 48 hours to process.
2. **Feedback Loop:** Automatically trigger a product feedback survey 14 days after delivery to identify quality issues.
3. **Inventory Management:** Ensure hot-sellers never go out of stock, which causes retention leaks.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Integrate automatic post-delivery feedback surveys', 'Operations')">Add Surveys to Action Board</button>`
      },
      marketing: {
        Sarah: `### Marketing Performance & ROAS Audit - Financial Analyst
Our current **ROAS (Return on Ad Spend) is 3.4x**, down from our target of **4.0x**. Rising ad costs are cutting into operating cash flow.

#### Performance breakdown by Channel:
- **Instagram Shopping (48% of sales):** Driving the volume, but conversion costs rose by 14% this quarter.
- **Google Search (22% of sales):** Solid search intent. CPA is stable, but keywords are limited.
- **Email Campaigns (18% of sales):** Incredible ROI (40:1). Highly underutilized; we only send 1 newsletter a week.

#### Financial Recommendations:
1. **Increase Email Send Frequency:** Transition from 1 to 3 emails per week (incorporating educational content and best-sellers). This is essentially free marketing.
2. **Cap low-ROAS ad sets:** Re-allocate budget from broad target ad-sets below 2.0x ROAS into lookalike audiences of repeat buyers.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Increase email campaigns to 3 times per week', 'Finance')">Add Email Increase to Action Board</button>`,
        Marcus: `### Social & Acquisition Funnel - Growth Specialist
Instagram Shopping represents **48%** of our traffic, making us vulnerable to algorithm shifts. We need to diversify into organic video channels.

#### Scaling Operations:
1. **TikTok & Instagram Reels Organic:** Partner with 15 micro-influencers per month. Send them free products in exchange for short videos.
2. **Affiliate program launch:** Invite micro-influencers to earn a 10% commission on sales they refer.
3. **Enhance Landing Page Conversions:** Current conversion rate is 3.2%. Adding social proof widgets and express checkouts (Apple Pay, ShopPay) could push this to 3.8%.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Partner with 15 micro-influencers for content creation', 'Marketing')">Add Influencer Plan to Action Board</button>`,
        Elena: `### Marketing Execution & Inventory Operations
Marketing cannot run in a silo. We frequently run campaigns for products that are low in stock, leading to backorders and negative reviews.

#### Operational Checklists:
1. **Stock Sync Protocol:** Implement daily synchronization reports between Shopify inventory and Meta Ad Catalog to turn off ads for items under 10 units.
2. **Wholesale Sourcing:** Reduce product packaging costs by order volume consolidation, improving marketing margins.
3. **Fulfillment Partner Integration:** Link ad dashboard with shipment data.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Sync Facebook Ad catalog with Shopify inventory limits', 'Operations')">Add Sync to Action Board</button>`
      }
    }
  },
  retail: {
    name: "Retail Store & Cafe (UrbanBites)",
    type: "retail",
    kpis: {
      primary: { label: "Monthly Gross Revenue", value: "$32,800", trend: "+4.1% MoM", isPositive: true },
      secondary1: { label: "Average Transaction Value", value: "$18.50", trend: "+$0.80 MoM", isPositive: true },
      secondary2: { label: "Staff Labor Cost Share", value: "34.0%", trend: "+1.5% Increase", isPositive: false },
      secondary3: { label: "Monthly Foot Traffic", value: "1,780 visits", trend: "-2.4% Decrease", isPositive: false },
      secondary4: { label: "Customer Loyalty Share", value: "42.0%", trend: "+5.0% Growth", isPositive: true }
    },
    charts: {
      revenue: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Sales ($)",
            data: [26500, 27800, 29200, 30500, 31400, 32800],
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            fill: true,
            tension: 0.4
          }
        ]
      },
      channels: {
        labels: ["Foot Traffic / Local", "Google Maps / Business", "Social Media Specials", "Direct Mailers", "Local Delivery Apps"],
        data: [52, 24, 12, 7, 5],
        colors: ["#10b981", "#6366f1", "#f59e0b", "#a855f7", "#ec4899"]
      }
    },
    swot: {
      strengths: [
        "Highly visible corner location with heavy walk-in traffic",
        "Loyalty program is highly adopted (42% of transactions)",
        "Excellent rating on Yelp & Google Maps (4.8 stars)"
      ],
      weaknesses: [
        "High staff labor costs (34%) impacting profit margins",
        "Slow table turnover during peak morning hours (8am - 10am)",
        "Limited menu variety for evening sales (after 4pm)"
      ],
      opportunities: [
        "Introduce grab-and-go catering platters for local offices",
        "Host weekly events (acoustic night, book clubs) to drive evening traffic",
        "Implement QR code table ordering to optimize staffing hours"
      ],
      threats: [
        "Opening of national franchise cafe 2 blocks away",
        "Increasing lease rent forecast for next renewal cycle",
        "Rising food costs (milk, coffee beans, eggs) squeezed wholesale margins"
      ]
    },
    kanban: [
      { id: "r-t1", title: "Launch corporate catering packages", description: "Design a menu flyer and email nearby offices offering lunch platter deliveries.", status: "todo", category: "Sales" },
      { id: "r-t2", title: "Implement QR table ordering system", description: "Test a QR order provider on 5 tables to see if we can reduce morning staffing needs.", status: "inprogress", category: "Operations" },
      { id: "r-t3", title: "Negotiate vendor rates for dairy", description: "Request volume pricing from our local dairy supplier to offset cheese and milk price hikes.", status: "done", category: "Finance" }
    ],
    chatResponses: {
      retention: {
        Sarah: `### Labor & Menu Profitability Analysis - Financial Analyst
Our gross sales are **$32,800**, but **Staff Labor Costs stand at 34.0%**, which is on the high end for food and beverage retail (ideal is 28-30%).

#### Financial Analysis:
1. **Labor Breakdown:** During non-peak hours (2:00 PM - 5:00 PM), staff utility is below 40%, yet scheduling remains fixed.
2. **COGS Pinch:** Coffee beans and dairy wholesale prices rose by 8% this quarter.

| Category | Labor % | Margin Target | Status |
|---|---|---|---|
| Morning Shift | 25% | 72% | Excellent |
| Afternoon Shift | 48% | 68% | Underperforming |

#### Financial Recommendations:
- **Stagger Staff Schedules:** Transition from fixed 8-hour blocks to overlapping 4-hour shifts.
- **Menu Engineering:** Audit ingredient cost per dish. Highlight high-margin items (e.g., espresso beverages, bakery goods) on the menu board and train staff to upsell.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Stagger staff schedules to reduce afternoon labor cost', 'Finance')">Add Staggering to Action Board</button>`,
        Marcus: `### Foot Traffic & Local Engagement Strategy - Growth Specialist
Our **Foot Traffic has decreased by 2.4%** this month. We need to convert our existing neighborhood residents into daily habitual visitors.

#### Local Growth Tactics:
1. **Geofenced Social Media Ads:** Run target ads on Instagram for people within a 1-mile radius during lunch hours (11:30 AM - 1:30 PM) offering a 10% discount.
2. **Loyalty Program Boost:** Create a 'Double Points Tuesday' promotion to stimulate sales on historically slow weekdays.
3. **Office Outreach:** Distribute a physical menu and 100 free coffee vouchers to offices within walking distance.

#### Target Channels:
* **Google Maps SEO:** Optimize keywords in our Google Business Profile (e.g. "Best Latte in Midtown").
* **Local Delivery Integration:** Increase listing visibility on DoorDash/UberEats.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Launch double points Tuesday promotion', 'Marketing')">Add Promotion to Action Board</button>`,
        Elena: `### Operations & Staff Optimization
We must address labor costs and service speed operational friction.

#### Operational Actions:
1. **QR Code Table Ordering:** Let customers sit, order, and pay from their table. This frees up staff from cash register duty, allowing 1 less server during afternoon shifts.
2. **Prep Station Standardization:** Re-organize the sandwich prep bar to cut preparation time down by 30 seconds per order.
3. **Cross-Training Staff:** Ensure baristas can handle cash registers and light food prep to improve efficiency.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Create standard layout for food prep stations', 'Operations')">Add Layout SOP to Action Board</button>`
      },
      marketing: {
        Sarah: `### Marketing & Local Acquisition Economics
For a retail storefront, marketing is primarily a factor of rent (paying for high foot traffic location) and local search optimization.

#### Channel Productivity:
- **Foot Traffic (52%):** Our primary driver. We pay a premium rent, so window merchandising is key.
- **Google Maps (24%):** Highest digital ROI. Driving out-of-town visitors searching for breakfast.
- **Social Specials (12%):** Decent for event announcements, but low conversion for daily lunch.

#### Financial Recommendations:
1. **A/B Test Window Signage:** Change sandwich boards outside daily. A 5% increase in walk-in conversion pays for the sign in 3 days.
2. **Review delivery margins:** Local delivery apps (5% of sales) charge a 30% commission. Raise prices on these apps by 20% to preserve margins.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Raise menu prices on delivery apps by 20%', 'Finance')">Add Price Raise to Action Board</button>`,
        Marcus: `### Neighborhood Brand & Community Marketing
We need to create 'reasons to visit' outside of just food and coffee. Community integration is our competitive moat against national chains.

#### Marketing Campaigns:
1. **Host 'Acoustic Open Mic' Night:** On Thursday evenings (4 PM - 8 PM), hire a local musician. Offer special pairing menus.
2. **'Coffee with a Cop' or 'Local Meetups':** Host community events to position our space as the neighborhood hub.
3. **Instagrammable Corner:** Install a neon sign or flower wall to encourage customer photos.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Plan monthly local acoustic live music nights', 'Marketing')">Add Event Plan to Action Board</button>`,
        Elena: `### Store Operations for Local Acquisition
A beautiful storefront that is dirty or slow kills local marketing.

#### Operational Priorities:
1. **Sidewalk Appeal Audit:** Clean storefront windows daily, sweep the sidewalk, and update the chalk sign by 7:30 AM.
2. **Peak Hour Speed Check:** Track ticket times during 8:00 AM - 9:30 AM. Target is under 3 minutes for coffee and 5 minutes for hot food.
3. **Google Review Prompt SOP:** Train cashiers to say: "If you liked your coffee, please leave us a review on Google!" to boost local search rankings.

<button class="chat-action-btn" onclick="app.addTaskFromChat('Train staff on peak hour ticketing SLAs', 'Operations')">Add Training to Action Board</button>`
      }
    }
  }
};
