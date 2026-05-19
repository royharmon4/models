// scenarios.js — 80+ scenario questions mapped to model numbers

const SCENARIOS = [
  // DELEGATION & MANAGEMENT
  {
    id: 1,
    title: "The Stalled Project",
    scenario: "A manager assigned a project to a team member last month with a clear deadline. The team member hasn't provided any updates, and the deadline is approaching. When asked, they say they weren't sure if they should flag issues or just figure things out on their own.",
    context: "leadership",
    bestModels: [34, 33, 35, 9],
    explanations: {
      34: "The Delegation Cyber-Chart shows delegation broke down at the reporting checkpoint — no check-in mechanism was established.",
      33: "Define to Delegate: the reporting cadence and escalation path were not defined before delegation.",
      35: "Delegation Triangle: the wrong delegation level was chosen — this person needed 'check-do-report' not 'do-report'.",
      9: "Army Game: the team member did only what was explicitly told — initiative to flag issues was never specified."
    }
  },
  {
    id: 2,
    title: "The Bottleneck Boss",
    scenario: "A director is overwhelmed. Every decision, even small ones like approving vendor invoices under $500, requires her sign-off. Her team is frustrated and projects are delayed waiting for her. She says she doesn't trust the process.",
    context: "delegation",
    bestModels: [82, 142, 35, 94],
    explanations: {
      82: "More Time Cyber-Chart: the solution involves pre-delegating and delegating routine decisions downward.",
      142: "Tomato Plant Problem: work overload exceeds time available — the director is the bottleneck.",
      35: "Delegation Triangle: routine decisions should be at the 'do' or 'do-report' level, not 'check-do-report'.",
      94: "Organizing Pie: the director hasn't determined which decisions only she can make versus which can be delegated."
    }
  },
  {
    id: 3,
    title: "The Inherited Problem",
    scenario: "A new manager takes over a team and notices the same handoff failure keeps occurring on projects. The previous manager had the same complaint. It happens regardless of which team member is responsible.",
    context: "management",
    bestModels: [62, 37, 134, 60],
    explanations: {
      62: "Job Organization Chain: the problem is in the role design, inherited from predecessors, not any specific person.",
      37: "Deviation from Standard: there is a clear gap from standard — the question is whether it's a system problem.",
      134: "Suboptimization: a process step may be optimizing locally while causing failures downstream.",
      60: "Job Fusion Triangle: the situation itself (role design) may be the root cause, not the person."
    }
  },
  // PERFORMANCE & HIRING
  {
    id: 4,
    title: "The Struggling New Hire",
    scenario: "A newly hired sales rep isn't hitting targets after 90 days. When coached, she seems willing and engaged. However, she doesn't know the product well enough to handle technical objections and hasn't developed a consistent prospecting routine yet.",
    context: "hiring",
    bestModels: [63, 18, 145, 101],
    explanations: {
      63: "KASH Formula: the issue is a knowledge gap (product) and a habit gap (prospecting routine), not attitude.",
      18: "Can You? Will You?: she has the willingness but not yet the ability in two specific areas.",
      145: "Training Formula: training needs to close the specific knowledge and habit gaps identified.",
      101: "PESOS Formula: effective training should include preparation, explanation, demonstration, observed practice, and supervision."
    }
  },
  {
    id: 5,
    title: "The Promoted Star",
    scenario: "Your best individual contributor was promoted to manager six months ago. Their team is struggling. The new manager is still handling client work directly, avoids hard performance conversations, and the team feels rudderless.",
    context: "management",
    bestModels: [102, 114, 75, 71],
    explanations: {
      102: "Peter Principle: the best individual performer was promoted without testing managerial fit.",
      114: "Promotion Jettison: the new manager hasn't let go of their previous individual contributor duties.",
      75: "Manager Selection Diamond: the selection pattern of promoting the best operator without testing management fit was used.",
      71: "Management Definition: results should now come through others, not through direct contribution."
    }
  },
  {
    id: 6,
    title: "The Unfair Review",
    scenario: "A manager gives a stellar employee a mediocre performance review. When pressed, the manager says the employee is 'just not strategic' but can't provide any concrete examples. The employee is shocked and demoralized.",
    context: "performance",
    bestModels: [150, 29, 42, 27],
    explanations: {
      150: "X Is Good: 'not strategic' is an unsupported evaluation — it must be tied to observable evidence.",
      29: "Critical Incident Procedure: the review lacks concrete incidents to support the assessment.",
      42: "Evaluation Fusion Triangle: the evaluation should cover traits, activities, and results — not impressions.",
      27: "Connoisseur Effect: the manager may be comparing this employee to an exceptional previous benchmark."
    }
  },
  {
    id: 7,
    title: "The Safe Hire",
    scenario: "A hiring team is reviewing candidates for a key growth role. They keep eliminating candidates who have any rough edges or unconventional backgrounds. All the 'safe' finalists are technically solid but unlikely to create breakthrough results.",
    context: "hiring",
    bestModels: [44, 136, 61, 54],
    explanations: {
      44: "Failure Avoidance Selection: the process is filtering out risk — but also filtering out upside potential.",
      136: "Success Oriented Selection: a growth role needs success-oriented selection, not just failure-avoidance.",
      61: "Job Match Diagram: evaluate person-role fit specifically for a growth role, not just conventional fit.",
      54: "Identification: find who can succeed under current conditions, not just who seems safest."
    }
  },
  // CHANGE MANAGEMENT
  {
    id: 8,
    title: "The Forced Migration",
    scenario: "Leadership announces a system migration with a mandatory go-live date. No one was consulted. The team is resistant. A senior manager says, 'This always happens with change. People just don't like it.'",
    context: "change",
    bestModels: [97, 87, 21, 20],
    explanations: {
      97: "People Resist Change??: staff aren't resisting all change — they're resisting being changed with no input.",
      87: "North Wind Theory: framing the migration around how it helps the team close deals faster would reduce resistance.",
      21: "Change Grid: leadership and staff are viewing the same change very differently.",
      20: "Change Diamond: the transition lacks ceremony, group support, appropriate pacing, and early wins."
    }
  },
  {
    id: 9,
    title: "The Sudden Drop",
    scenario: "After a major software rollout, productivity metrics fall 20% in the first month. The executive team is panicking and considering reverting to the old system. The project lead believes the system is sound but execution is rough.",
    context: "change",
    bestModels: [19, 50, 56, 20],
    explanations: {
      19: "Change Curve: the dip was expected and should have been planned for — this isn't evidence of failure.",
      50: "Hawthorne Effect: the metric drop may partly reflect early adjustment, not fundamental failure.",
      56: "Incrementalism: if this had been phased, the dip would have been smaller and more manageable.",
      20: "Change Diamond: short-term low goals during transition would have set better expectations."
    }
  },
  {
    id: 10,
    title: "The Quarterly Reorg",
    scenario: "An organization has restructured its teams three times in the past 12 months. Each time, leadership says the new structure will 'finally' solve alignment issues. Teams are exhausted and cynical. Performance is declining.",
    context: "change",
    bestModels: [127, 19, 56, 88],
    explanations: {
      127: "Slot Machine Management: frequent massive changes are creating instability, not solutions.",
      19: "Change Curve: each reorg creates a new dip before benefits appear — the organization never recovers.",
      56: "Incrementalism: incremental adjustments would be less disruptive than repeated full restructures.",
      88: "Northbound Train: a clear directional philosophy is missing — structural changes can't substitute for strategic clarity."
    }
  },
  // COMMUNICATION
  {
    id: 11,
    title: "The Misread Memo",
    scenario: "A CEO sends a company-wide email about 'cost discipline.' The operations team interprets it as a freeze on all new hires. The product team thinks it means no new tools or infrastructure. Sales thinks it doesn't apply to them. No clarification was provided.",
    context: "communication",
    bestModels: [22, 122, 16, 23],
    explanations: {
      22: "Communication Cyber-Chart: the message broke down in decoding — each team filtered it through their own context.",
      122: "Selective Perception: each department heard the message through their own functional filter.",
      16: "Boss Interpreter: each department is now interpreting the message through their own informal decoder.",
      23: "Communication Guidelines: the message should have started with context and been specific about what was in scope."
    }
  },
  {
    id: 12,
    title: "The Silent Room",
    scenario: "A manager presents a new strategy to her team. She asks for questions and concerns. The room is silent. She assumes buy-in. Two weeks later, execution is poor and several team members say they never agreed with the approach.",
    context: "communication",
    bestModels: [151, 115, 22, 97],
    explanations: {
      151: "Yes Concept: silence doesn't mean agreement — real alignment requires genuine buy-in.",
      115: "Psychic Radar: a skilled communicator reads body language and hesitation before mistaking silence for agreement.",
      22: "Communication Cyber-Chart: the communication process broke down before the 'action' step.",
      97: "People Resist Change??: lack of input often creates resistance that shows up in execution, not in the room."
    }
  },
  {
    id: 13,
    title: "The Inside Joke Plan",
    scenario: "A founding team uses shorthand terms for their business model, customer segments, and product strategy. They hire a new VP of Marketing who nods along in meetings but is confused. The marketing plans she produces miss the strategic intent.",
    context: "communication",
    bestModels: [77, 16, 149, 22],
    explanations: {
      77: "Marriage-Type Communication: the founding team's shorthand is opaque to outsiders.",
      16: "Boss Interpreter: the new VP is trying to interpret without the decoding tools insiders have.",
      149: "Verbal/Extensional Worlds: the VP is operating in the verbal world of described strategy, not the direct experiential world.",
      22: "Communication Cyber-Chart: the sender-receiver gap is wide — the intended meaning isn't being received."
    }
  },
  // DECISION MAKING & PROBLEM SOLVING
  {
    id: 14,
    title: "The Growing Complaint",
    scenario: "A customer service team is receiving complaints about delivery delays. A manager wants to hire more delivery staff. On examination, the actual issue is a dispatch software bug that creates routing inefficiencies.",
    context: "operations",
    bestModels: [37, 10, 32, 130],
    explanations: {
      37: "Deviation from Standard: identify the standard being violated (delivery time) before proposing solutions.",
      10: "Aspirin Doctor: the manager proposed a solution from within their expertise (hiring) without fully diagnosing the problem.",
      32: "Decision Tree: proper problem isolation would have surfaced the software bug as root cause.",
      130: "Solution Pentagon: the correct response is corrective (fix the bug), not just adaptive (hire more people)."
    }
  },
  {
    id: 15,
    title: "The Town Hall Boost",
    scenario: "After a motivational town hall, sales numbers spike 18% the following week. The CEO credits the town hall and schedules more. By the third town hall, sales have reverted to baseline and the events feel stale.",
    context: "strategy",
    bestModels: [45, 50, 90, 70],
    explanations: {
      45: "Fallacy of Composition: the spike may have coincided with other factors — the town hall didn't necessarily cause it.",
      50: "Hawthorne Effect: early performance improvements during observed/new events often revert.",
      90: "Operant Conditioning: a one-time event without structural consequence changes doesn't sustain behavior.",
      70: "Main Event Principle: unless something structural changes, results will revert to baseline."
    }
  },
  {
    id: 16,
    title: "The Budget Trap",
    scenario: "A product team has spent 18 months and $2M on a feature that is performing poorly. Despite low adoption data, they want to invest another $500K because 'we've come too far to stop now.'",
    context: "decision-making",
    bestModels: [137, 128, 91, 116],
    explanations: {
      137: "Sunk Cost: the $2M already spent should be written off — future decisions should be based on expected ROI, not past spend.",
      128: "So What? What If?: test the consequence of stopping versus continuing, and the failure scenarios of each.",
      91: "Opportunity Cost: $500K invested in this failing feature forecloses better alternatives.",
      116: "Pyrrhic Victory: completing the feature at high cost may not be worth the win."
    }
  },
  {
    id: 17,
    title: "The Misaligned Metrics",
    scenario: "A warehouse team is hitting its speed target (items picked per hour) with impressive numbers. However, downstream accuracy is collapsing — wrong items are being shipped at high rates. The warehouse team is thrilled; fulfillment is in crisis.",
    context: "operations",
    bestModels: [134, 51, 28, 5],
    explanations: {
      134: "Suboptimization: the warehouse is optimizing its metric at the expense of the whole system.",
      51: "Heisenberg Principle: measuring and incentivizing speed changed the behavior in ways that created new problems.",
      28: "Control Diamond: the control system tracks speed but has no mechanism for accuracy adjustment.",
      5: "Algebraic Results: the positive pick-speed numbers don't account for the negative accuracy impact."
    }
  },
  // MOTIVATION & PEOPLE
  {
    id: 18,
    title: "The Uninspired Team",
    scenario: "A manager tries to motivate his team with an exciting new project about innovation and strategic growth. The team is disengaged. Unknown to the manager, two layoff rumors are circulating and the team is worried about job security.",
    context: "leadership",
    bestModels: [84, 85, 8, 83],
    explanations: {
      84: "Motivation Stair-Steps: security needs aren't met — the team can't respond to higher-order motivators yet.",
      85: "Motivation Triangle: security need is unmet — innovation appeals to stimulation but not security.",
      8: "Anxiety Streams: anxiety about job security is driving disengagement, not the project itself.",
      83: "Motivation – Dissatisfaction: until the security fear is addressed, desire for change toward growth won't emerge."
    }
  },
  {
    id: 19,
    title: "The Resistant Expert",
    scenario: "A senior engineer is vocally opposed to a new development methodology. His manager tries to force compliance. The resistance intensifies. On reflection, the engineer is the team's only expert in the legacy system that the new process must integrate with.",
    context: "change",
    bestModels: [8, 68, 6, 97],
    explanations: {
      8: "Anxiety Streams: resistance likely stems from identity and purpose concerns, not just the methodology itself.",
      68: "Magic Hand: the engineer's indispensability may be generating ambivalent feelings — both valued and resented.",
      6: "Ambivalence: the engineer may both see value in the new approach and feel threatened by it.",
      97: "People Resist Change??: he's not resisting all change — he's resisting being changed without his input."
    }
  },
  {
    id: 20,
    title: "The Plateaued High Performer",
    scenario: "A top sales rep has been producing solid results for three years but has stopped growing. She seems bored. When offered new training, she says she already knows all of it. Her manager isn't sure how to re-engage her.",
    context: "performance",
    bestModels: [83, 85, 81, 36],
    explanations: {
      83: "Motivation – Dissatisfaction: there's no pain point driving her to want change.",
      85: "Motivation Triangle: the stimulation need may be unmet — the role may have become too routine.",
      81: "Mobility Circle: a stretch rotation or new challenge would build both competence and re-engagement.",
      36: "Desire for Change: coaching only works when the person wants a better future state — find what she wants."
    }
  },
  // PLANNING & STRATEGY
  {
    id: 21,
    title: "The Incomplete Roadmap",
    scenario: "A leadership team presents a 12-month transformation roadmap. It has clear objectives and action steps, but no one has listed potential obstacles, dependencies, or contingency plans. The team is asked to approve it.",
    context: "planning",
    bestModels: [104, 128, 111, 103],
    explanations: {
      104: "Planning Path: the plan is missing obstacles and alternatives — two of the six required elements.",
      128: "So What? What If?: the plan hasn't stress-tested consequences or failure scenarios.",
      111: "Problem Avoidance: a pre-mortem would surface risks before they become incidents.",
      103: "Planning Fusion Triangle: does the plan address all three levels: strategic, tactical, and operational?"
    }
  },
  {
    id: 22,
    title: "The Big Bet",
    scenario: "An executive wants to launch a new product in all 50 markets simultaneously, investing $5M upfront. No market test has been run. His rationale: 'If it works in one market, it'll work everywhere.'",
    context: "strategy",
    bestModels: [80, 56, 128, 45],
    explanations: {
      80: "Minimum Commitment Rule: commit the minimum to test before full investment.",
      56: "Incrementalism: a regional pilot would reduce risk dramatically.",
      128: "So What? What If?: what happens if the market assumptions are wrong?",
      45: "Fallacy of Composition: success in one market doesn't guarantee success in all markets."
    }
  },
  {
    id: 23,
    title: "The Missed Priority",
    scenario: "A product manager spends most of her week in internal alignment meetings, reviewing dashboards, and responding to Slack messages. The highest-priority initiative — a key customer renewal at risk — hasn't been addressed in two weeks.",
    context: "planning",
    bestModels: [4, 38, 110, 142],
    explanations: {
      4: "Activity Avoidance: low-priority busy work is filling time instead of the high-priority at-risk account.",
      38: "Effectiveness – Right Things: focusing on vanity activity instead of the critical priority.",
      110: "Priority Triangle: the at-risk renewal is 'must do'; most of her week is 'nice to do.'",
      142: "Tomato Plant Problem: the schedule is too packed with low-value work to address what matters most."
    }
  },
  // PERCEPTION & THINKING
  {
    id: 24,
    title: "The IT Solution",
    scenario: "A sales team is missing revenue targets because reps are spending too much time on manual data entry instead of selling. The CTO proposes a new CRM integration. The VP of Sales believes the real issue is poor call discipline.",
    context: "sales",
    bestModels: [10, 7, 32, 37],
    explanations: {
      10: "Aspirin Doctor: CTO prescribes a tech solution because that's his expertise domain.",
      7: "Answers in Search of Questions: the CTO's toolkit shapes how he defines the problem.",
      32: "Decision Tree: properly isolate the problem before proposing solutions.",
      37: "Deviation from Standard: clarify what standard is being violated before choosing a solution."
    }
  },
  {
    id: 25,
    title: "The New Manager Impression",
    scenario: "A new VP inherits a team. She's heard from multiple people that one team member 'isn't a team player.' She hasn't worked with him yet but notices she's already treating him more critically. He's one of the team's most effective contributors.",
    context: "management",
    bestModels: [15, 123, 27, 29],
    explanations: {
      15: "Borrowed Perception: the VP has adopted others' perception without direct experience.",
      123: "Self-Fulfilling Prophecy: treating him critically may depress his performance.",
      27: "Connoisseur Effect: her judgment may be skewed by hearing others' assessments first.",
      29: "Critical Incident Procedure: any evaluation should be based on direct observation, not secondhand stories."
    }
  },
  {
    id: 26,
    title: "The Invisible Pattern",
    scenario: "A new analyst notices data anomalies in monthly reports. She flags them to her supervisor, who dismisses them as normal variation. Six months later, the anomalies turn out to have been early signals of a major compliance issue that was missed.",
    context: "operations",
    bestModels: [99, 112, 131, 43],
    explanations: {
      99: "Perceptual K-H: the supervisor couldn't see the pattern because they lacked the perceptual framework to recognize it.",
      112: "Problem Filter: the issue was ignored because it wasn't yet large enough to force action.",
      131: "Stimulus Discrimination: the supervisor failed to distinguish a meaningful signal from noise.",
      43: "Experience Paradox: even experienced managers can't retrieve relevant experience in the moment."
    }
  },
  // ORGANIZATION & SYSTEMS
  {
    id: 27,
    title: "The Star Player Risk",
    scenario: "An engineering team's entire knowledge of a legacy payment system lives in one engineer's head. He's the only one who can fix the system during outages. He's been getting better offers from competitors.",
    context: "operations",
    bestModels: [66, 57, 48, 92],
    explanations: {
      66: "Mack Truck Theory: any person can be lost at any time — cross-train before the expert leaves.",
      57: "Indispensable Person: the organization cannot afford to lose this person and has done nothing about it.",
      48: "Fugitive Information: the knowledge exists but is not retrievable without this person.",
      92: "Opportunity Wedge: the window to capture this knowledge before he leaves is closing."
    }
  },
  {
    id: 28,
    title: "The Department Feud",
    scenario: "Sales keeps promising customers custom features. Engineering keeps refusing because features distract from the roadmap. Each department's metrics look fine in isolation. Overall NPS and renewal rates are declining.",
    context: "strategy",
    bestModels: [134, 88, 91, 76],
    explanations: {
      134: "Suboptimization: each department optimizes its own goal at the expense of the whole.",
      88: "Northbound Train: strategy, incentives, and language in Sales and Engineering are pointing in different directions.",
      91: "Opportunity Cost: the conflict is consuming resources better spent elsewhere.",
      76: "Marketing Fusion Triangle: the product-channel-market alignment is broken."
    }
  },
  {
    id: 29,
    title: "The Compensation Complaint",
    scenario: "A top performer demands a raise. Her manager investigates and finds she's paid fairly by internal standards and her results are strong. She's still dissatisfied because she discovered a new hire with less experience is earning more due to market adjustments.",
    context: "management",
    bestModels: [118, 24, 25, 98],
    explanations: {
      118: "Relative Deprivation: she's comparing to the new hire, not her own history.",
      24: "Compensation Fusion Triangle: internal equity, external equity, and performance are all in tension here.",
      25: "Compensation Scale: a full five-R review might reveal legitimate reasons to adjust her compensation.",
      98: "Perceptual Fraction: her satisfaction depends on the reference point she's using."
    }
  },
  // LEADERSHIP SCENARIOS
  {
    id: 30,
    title: "The Helpless Manager",
    scenario: "A manager repeatedly escalates to his director every time a decision involves any risk or ambiguity. He says he doesn't have the authority to decide. The director is spending 30% of her time making decisions that should sit at the next level down.",
    context: "leadership",
    bestModels: [13, 2, 107, 108],
    explanations: {
      13: "Authority Syndrome: the manager uses 'I lack authority' as an excuse for nonperformance.",
      2: "Action Path: what actions are within his current authority that he could take right now?",
      107: "Power Bank Account: the manager may not recognize the informal power sources available to him.",
      108: "Power Diamond: leadership should help him understand his personal and institutional power."
    }
  },
  {
    id: 31,
    title: "The Ignored Lesson",
    scenario: "A team runs a successful incident post-mortem and produces detailed action items. Three months later, a similar incident occurs. When reviewed, the post-mortem actions were documented but never implemented.",
    context: "operations",
    bestModels: [113, 48, 73, 111],
    explanations: {
      113: "Progress Principle: progress requires correcting error — the postmortem must end with a playbook update that gets implemented.",
      48: "Fugitive Information: the lesson learned was captured but not retrievable in an actionable form.",
      73: "Management Process Cyber-Chart: the information-to-action pipeline broke down between documentation and execution.",
      111: "Problem Avoidance: preventive action from the first incident would have avoided the second."
    }
  },
  {
    id: 32,
    title: "The Withheld Promotion",
    scenario: "A high-performing analyst has been passed over for promotion twice. Her manager privately believes she's 'too good to lose' in her current role. She's started interviewing externally.",
    context: "management",
    bestModels: [74, 81, 92, 68],
    explanations: {
      74: "Management Smog: the manager feels threatened by a more competent subordinate.",
      81: "Mobility Circle: development and promotion build competence and expand career options.",
      92: "Opportunity Wedge: the window to retain her is closing.",
      68: "Magic Hand: the manager depends on her and may resent that dependence."
    }
  },
  // TRAINING & DEVELOPMENT
  {
    id: 33,
    title: "The Failed Workshop",
    scenario: "A company spent $50K on an external training program. Attendees reported high satisfaction scores. Six months later, there's no visible change in behavior. The training covered the right topics but was delivered entirely through lectures and slides.",
    context: "training",
    bestModels: [144, 101, 146, 78],
    explanations: {
      144: "Training Diamond: the method failed even though the subject matter was right.",
      101: "PESOS Formula: the training lacked showing, observing, and supervising — only preparing and explaining.",
      146: "Training Fusion Triangle: the strategy lacked on-the-job and informal learning elements.",
      78: "Meaningful Experience: passive learning without direct, visible, understood experience doesn't create lasting change."
    }
  },
  {
    id: 34,
    title: "The Wrong Fix",
    scenario: "A call center has high average handle time. Management mandates a new training program on efficiency techniques. After the training, agents are cutting calls short to hit the metric but customer satisfaction drops sharply.",
    context: "operations",
    bestModels: [63, 51, 90, 145],
    explanations: {
      63: "KASH Formula: the problem was attitude (compliance over quality), not knowledge of efficiency techniques.",
      51: "Heisenberg Principle: measuring handle time changed the behavior — agents now optimize the metric, not the outcome.",
      90: "Operant Conditioning: the incentive structure rewards short calls, so agents produce short calls.",
      145: "Training Formula: the training didn't address the right KASH gap — wrong diagnosis led to wrong intervention."
    }
  },
  // STRATEGY & GROWTH
  {
    id: 35,
    title: "The Channel Mismatch",
    scenario: "A B2B software company has a great product that solves a real problem. They built a direct sales team, but enterprise deals are too complex and too slow for the team to close. Competitors with the same product are growing faster using system integrators.",
    context: "sales",
    bestModels: [76, 7, 10, 1],
    explanations: {
      76: "Marketing Fusion Triangle: the product is solid but the channel doesn't match the market.",
      7: "Answers in Search of Questions: the company built a direct sales team because that was the known playbook.",
      10: "Aspirin Doctor: leadership prescribed the solution they knew (direct sales) rather than examining the channel fit.",
      1: "Acres of Diamonds: the opportunity may be within the existing partner ecosystem rather than a new direct team."
    }
  },
  {
    id: 36,
    title: "The Ambition Trap",
    scenario: "A high-potential manager is offered a director role that requires relocating to another city. She wants the role but has two school-age children, a spouse with a career, and an elderly parent nearby. She doesn't know how to think through the decision.",
    context: "leadership",
    bestModels: [120, 85, 109, 30],
    explanations: {
      120: "Roles and Goals: the tension between her ambitions and life-role obligations is the core of the decision.",
      85: "Motivation Triangle: security (family stability), stimulation (career growth), and identity (parent/professional) are all in tension.",
      109: "Price to Stay: the ongoing cost of staying in this role (post-relocation life) must be evaluated, not just the acquisition cost.",
      30: "Cruel Sea: any choice involves real trade-offs — there is no option without cost."
    }
  },
  // ADDITIONAL SCENARIOS
  {
    id: 37,
    title: "The Announcement Backfire",
    scenario: "A CEO announces a new performance management system via email on a Friday afternoon before a long weekend. Monday is chaotic. Rumors spread that performance reviews will include surprise terminations. No manager was briefed in advance.",
    context: "communication",
    bestModels: [22, 87, 16, 21],
    explanations: {
      22: "Communication Cyber-Chart: the message broke down — no mechanism for decoding or clarification was provided.",
      87: "North Wind Theory: the message was framed from an administrative perspective, not from 'what's in it for you.'",
      16: "Boss Interpreter: managers became unofficial (and uninformed) decoders of leadership intent.",
      21: "Change Grid: leadership sees a process improvement; staff sees a termination threat."
    }
  },
  {
    id: 38,
    title: "The Self-Made Crisis",
    scenario: "A VP of Operations deliberately delays approving routine requests, then swoops in at the last moment to resolve them and gets praised for 'saving the day.' Team members feel anxious and dependent. The VP feels indispensable.",
    context: "management",
    bestModels: [140, 68, 57, 47],
    explanations: {
      140: "The Gun: the VP is creating problems to later solve them.",
      68: "Magic Hand: manufactured dependence produces ambivalent feelings in both directions.",
      57: "Indispensable Person: the VP is engineering indispensability — and creating real organizational risk.",
      47: "Freudian Hydraulic: eventually the pressure will produce unpredictable reactions from the team."
    }
  },
  {
    id: 39,
    title: "The Short-Term Win",
    scenario: "In Q4, a sales team discounts aggressively to hit annual targets, closing deals at thin margins with customers who expect those prices to continue. Q1 of the following year opens with margin erosion and churn from customers who reject normal pricing.",
    context: "sales",
    bestModels: [14, 116, 90, 5],
    explanations: {
      14: "Behavior Is Goal Directed: the reps discounted to hit quota — the goal is the behavior driver.",
      116: "Pyrrhic Victory: hitting the annual target cost more in margin erosion and churn than the win was worth.",
      90: "Operant Conditioning: the incentive system (quota + commission) drove the behavior.",
      5: "Algebraic Results: the revenue gain must be netted against the margin and churn losses."
    }
  },
  {
    id: 40,
    title: "The Blind Spot",
    scenario: "A marketing leader dismisses every new idea as 'too complicated' or 'not our model.' When explored further, she's never operated outside a single industry and has a narrow set of frameworks. Good ideas from outside her experience are consistently underfunded.",
    context: "strategy",
    bestModels: [65, 99, 7, 122],
    explanations: {
      65: "Logic Box: her existing KASH limits what solutions she can perceive.",
      99: "Perceptual K-H: she can only see what she knows how to see.",
      7: "Answers in Search of Questions: she's shaping the problems to fit her toolkit.",
      122: "Selective Perception: her functional filters prevent accurate decoding of external ideas."
    }
  },
  {
    id: 41,
    title: "The Vanishing Benefit",
    scenario: "A team receives a major perk — catered lunches — in appreciation for extra effort during a crunch. After two months, complaints start appearing about menu choices. What was once a gift is now an expectation and source of dissatisfaction.",
    context: "management",
    bestModels: [119, 118, 83, 90],
    explanations: {
      119: "Rising Expectations: the perk quickly became the new baseline rather than an appreciated extra.",
      118: "Relative Deprivation: teams are now comparing their catered lunch quality to others, not to having no lunch at all.",
      83: "Motivation – Dissatisfaction: the perk has stopped creating dissatisfaction resolution — it's now neutral at best.",
      90: "Operant Conditioning: the consequence (catered lunch) no longer reinforces the target behavior (extra effort)."
    }
  },
  {
    id: 42,
    title: "The Impossible Standard",
    scenario: "A sales team just had their best year ever, growing 40%. Leadership sets next year's target at 50% growth. The team is demoralized before the year even starts. Three top performers start updating their resumes.",
    context: "sales",
    bestModels: [41, 119, 105, 30],
    explanations: {
      41: "Encore Problem: the team must now top a record performance under higher pressure.",
      119: "Rising Expectations: last year's exceptional result became this year's floor.",
      105: "Planning Pentagon: objectives weren't grounded in actual resource capacity — only in growth ambition.",
      30: "Cruel Sea: the aggressive target may help the company on paper while harming key individuals."
    }
  },
  {
    id: 43,
    title: "The Consultant Question",
    scenario: "A company is debating hiring an operational consultant at $80K for six months. Internal finance says it's too expensive. Preliminary analysis shows the consultant's methods typically reduce waste by 15% in organizations similar to theirs. Annual waste runs $2M.",
    context: "strategy",
    bestModels: [86, 91, 5, 80],
    explanations: {
      86: "No-Cost Consultant: $300K in savings against $80K fees makes this effectively no-cost.",
      91: "Opportunity Cost: not hiring costs $220K in net value — inaction has an opportunity cost.",
      5: "Algebraic Results: sum the positive contribution (savings) against the negative (fees).",
      80: "Minimum Commitment Rule: could the consultant be engaged for a smaller pilot first?"
    }
  },
  {
    id: 44,
    title: "The Vague Request",
    scenario: "A senior manager asks a junior team member to 'put together something on the competitive landscape for the board meeting.' Two days later, a 40-slide deck arrives. It's thorough but misses what the board actually needed. Three days of work are wasted.",
    context: "delegation",
    bestModels: [33, 69, 23, 34],
    explanations: {
      33: "Define to Delegate: the scope, audience, format, depth, and purpose were never defined.",
      69: "Main Event Compass: the request lacked what, when, how, who, and — crucially — why.",
      23: "Communication Guidelines: the assignment should have started with context and ended with specifics.",
      34: "Delegation Cyber-Chart: the communication link broke at the point of assignment."
    }
  },
  {
    id: 45,
    title: "The Reluctant Coach",
    scenario: "A manager knows a team member needs to improve her executive presence. He avoids the conversation for months, giving her only indirect hints. During her annual review, the feedback surprises and devastates her. She says she had no idea.",
    context: "performance",
    bestModels: [3, 129, 150, 141],
    explanations: {
      3: "Action T.N.T.: the coaching conversation should have happened immediately, not been deferred for months.",
      129: "Socratic Method: guiding questions earlier in the year could have helped her discover the gap herself.",
      150: "X Is Good: the feedback must be tied to observable, specific behavioral evidence.",
      141: "Three-Step Termination: even for development issues, the gap, remedy, and consequence should be explicit early."
    }
  },
  {
    id: 46,
    title: "The Resource Fight",
    scenario: "Two product teams are competing for the same three engineers. Each team says their project is the most critical. A VP tries to satisfy both by splitting the engineers. Both projects stall. Neither gets done on schedule.",
    context: "planning",
    bestModels: [121, 91, 143, 95],
    explanations: {
      121: "Scarce Resources: engineering time is the binding constraint — splitting it solves nothing.",
      91: "Opportunity Cost: spreading resources prevents either project from succeeding.",
      143: "Trade-Off Principle: choosing both means choosing neither — an explicit trade-off must be made.",
      95: "Pareto's Law: one project likely drives far more value than the other — prioritize accordingly."
    }
  },
  {
    id: 47,
    title: "The Micromanager",
    scenario: "A senior director rewrites team members' emails, attends every customer call 'just to observe,' and corrects minor formatting on internal documents. Meanwhile, a major contract renewal at risk hasn't been addressed for two weeks.",
    context: "management",
    bestModels: [46, 4, 38, 142],
    explanations: {
      46: "Flyspeck Management: major and minor issues are receiving nearly equal attention.",
      4: "Activity Avoidance: minor corrections are a refuge from the harder high-priority work.",
      38: "Effectiveness – Right Things: the director is doing many things but not the right things.",
      142: "Tomato Plant Problem: available time is consumed by low-value work."
    }
  },
  {
    id: 48,
    title: "The Reluctant Promotee",
    scenario: "A brilliant researcher is promoted to research director because she's the best researcher on the team. She excels technically but struggles to run team meetings, give feedback, or navigate stakeholder politics. She privately wants to return to individual research.",
    context: "hiring",
    bestModels: [102, 75, 61, 85],
    explanations: {
      102: "Peter Principle: promoted to the level of incompetence — great at research, struggling at management.",
      75: "Manager Selection Diamond: the best technical performer was promoted without testing managerial fit.",
      61: "Job Match Diagram: her skills and motivations don't match the new role's requirements.",
      85: "Motivation Triangle: the new role threatens her identity as a researcher."
    }
  },
  {
    id: 49,
    title: "The Confusing Strategy",
    scenario: "A company's stated strategy is customer-centricity. Their incentive system rewards new logos, not retention. Their language in meetings celebrates flashy wins over quiet renewals. New employees are confused about what actually matters.",
    context: "strategy",
    bestModels: [88, 90, 134, 151],
    explanations: {
      88: "Northbound Train: strategy, rewards, and language are pointing in different directions.",
      90: "Operant Conditioning: consequences (incentives) shape behavior — they tell the truth about what's valued.",
      134: "Suboptimization: new business team optimizes its metric at the expense of retention.",
      151: "Yes Concept: genuine alignment between strategy and execution is missing."
    }
  },
  {
    id: 50,
    title: "The Buried Lesson",
    scenario: "After a major product launch failure three years ago, a team wrote a detailed post-mortem with preventive recommendations. A new team is now planning a similar launch. No one knows the post-mortem exists. The same mistakes are being made.",
    context: "operations",
    bestModels: [48, 66, 113, 43],
    explanations: {
      48: "Fugitive Information: the lesson exists but cannot be retrieved in time.",
      66: "Mack Truck Theory: institutional knowledge was lost when the original team members moved on.",
      113: "Progress Principle: the history was written but never read — progress requires retrievable, actionable documentation.",
      43: "Experience Paradox: the organization has the experience but cannot access it when needed."
    }
  },
  {
    id: 51,
    title: "The Bonus Surprise",
    scenario: "An employee receives a 10% bonus — the highest in the company's history for her role. She thanks her manager but is noticeably underwhelmed. It turns out she's been talking to a colleague in another department who received 15%.",
    context: "management",
    bestModels: [118, 24, 98, 93],
    explanations: {
      118: "Relative Deprivation: she's comparing to her colleague, not to company history.",
      24: "Compensation Fusion Triangle: internal equity is disrupting satisfaction despite strong results.",
      98: "Perceptual Fraction: the bonus amount feels different relative to the peer benchmark.",
      93: "Organization Fusion Triangle: the reward reflects a mix of performance and internal politics she can see."
    }
  },
  {
    id: 52,
    title: "The Quiet Quitter",
    scenario: "A previously engaged team member now does exactly what's on his job description — nothing more, nothing less. He was passed over for a promotion last quarter, given no feedback about why, and received no development plan. He's actively interviewing.",
    context: "performance",
    bestModels: [83, 90, 26, 72],
    explanations: {
      83: "Motivation – Dissatisfaction: the dissatisfaction from being passed over needs to be addressed productively.",
      90: "Operant Conditioning: the consequence (being passed over with no feedback) shaped his behavior.",
      26: "Confidence Circle: no early wins or recognition are available to restore engagement.",
      72: "Management Gap: he doesn't believe the manager can or will help him achieve his objectives."
    }
  },
  {
    id: 53,
    title: "The Overpromised Feature",
    scenario: "Sales promised a prospect a custom integration feature to close a deal. Engineering says the feature would take six months to build. The deal is signed. Now both teams are in conflict. The customer is expecting delivery in 90 days.",
    context: "sales",
    bestModels: [30, 116, 143, 5],
    explanations: {
      30: "Cruel Sea: the deal benefits the company but creates real pain for the engineering team and the customer.",
      116: "Pyrrhic Victory: the deal may cost more in engineering time than the revenue justifies.",
      143: "Trade-Off Principle: closing this deal means not building something else — was that trade-off made explicitly?",
      5: "Algebraic Results: the revenue must be netted against the engineering cost and customer relationship risk."
    }
  },
  {
    id: 54,
    title: "The Initiative Gap",
    scenario: "A team consistently does exactly what they're asked but rarely solves problems proactively. When asked why no one flagged a growing issue earlier, each team member says, 'I didn't think that was my job,' or 'I didn't want to step on anyone's toes.'",
    context: "leadership",
    bestModels: [9, 151, 17, 52],
    explanations: {
      9: "Army Game: the team does only what they are explicitly told — initiative was never expected or defined.",
      151: "Yes Concept: without genuine buy-in to the mission, people default to minimum compliance.",
      17: "Business-Owner Concept: the team hasn't been encouraged to take ownership of outcomes.",
      52: "Help Philosophy: leadership hasn't established a culture of proactive problem-solving."
    }
  },
  {
    id: 55,
    title: "The Merger Resistance",
    scenario: "After an acquisition, the legacy team of the acquired company resists integrating with the acquirer's systems and culture. They say the new systems are inferior. In fact, some systems are better, some worse. The integration is six months behind.",
    context: "change",
    bestModels: [12, 97, 11, 87],
    explanations: {
      12: "Attitude Stair-Steps: the legacy team hasn't moved from awareness through to acceptance — they're stuck in dissatisfaction.",
      97: "People Resist Change??: they're not resisting all change — they're resisting specific aspects and the lack of input.",
      11: "Attitude Box: prior experience shapes their resistance — previous integrations may have gone badly.",
      87: "North Wind Theory: show how specific new systems benefit the legacy team directly."
    }
  },
  {
    id: 56,
    title: "The Delegation Dropout",
    scenario: "A manager delegates a key presentation to a direct report but keeps asking for updates every hour, modifying the slides extensively, and almost takes it back entirely the morning of the meeting. The direct report feels demoralized.",
    context: "delegation",
    bestModels: [35, 52, 18, 33],
    explanations: {
      35: "Delegation Triangle: the manager said 'do-report' but behaved like 'check-do-report' constantly.",
      52: "Help Philosophy: hovering and controlling aren't helping — they're undermining.",
      18: "Can You? Will You?: before delegating, the manager didn't assess whether the direct report was capable.",
      33: "Define to Delegate: quality standards and acceptable variation weren't defined before the task was handed off."
    }
  },
  {
    id: 57,
    title: "The Narrow Solution",
    scenario: "An operations leader proposes solving a customer satisfaction problem by issuing refunds faster. The customer data actually shows the satisfaction issue is about communication during the problem, not the resolution time itself.",
    context: "operations",
    bestModels: [10, 37, 32, 126],
    explanations: {
      10: "Aspirin Doctor: the operations leader proposed a solution within their domain (refund speed) without diagnosing the real issue.",
      37: "Deviation from Standard: the standard violation is communication quality, not refund speed.",
      32: "Decision Tree: proper problem isolation reveals the real root cause.",
      126: "Six Honest Servingmen: using what/where/when/how/why/who would have pointed to the real issue."
    }
  },
  {
    id: 58,
    title: "The Ignored Data",
    scenario: "A dashboard shows customer health scores declining steadily for six weeks. The account management team reviews the dashboard weekly but hasn't taken any action. Two accounts churn in week seven. The team says they thought the data was a glitch.",
    context: "management",
    bestModels: [28, 58, 112, 73],
    explanations: {
      28: "Control Diamond: the standard and measurement exist, but there is no adjustment mechanism — no one acts on the reading.",
      58: "Info-Action Diagram: information is being received but not converted into action.",
      112: "Problem Filter: the team avoided the problem because the solution was unclear.",
      73: "Management Process Cyber-Chart: the information-to-decision pipeline broke down between reading data and taking action."
    }
  },
  {
    id: 59,
    title: "The Drifting Founder",
    scenario: "A founder who built the company on customer obsession has gradually drifted toward internal operations work as the company grew. Customers can no longer reach her. The company culture is shifting away from its founding values without anyone noticing.",
    context: "leadership",
    bestModels: [70, 88, 38, 114],
    explanations: {
      70: "Main Event Principle: culture will drift unless deliberate action sustains it.",
      88: "Northbound Train: the directional philosophy is no longer being actively embodied by the founder.",
      38: "Effectiveness – Right Things: the founder is doing many things but not the most important ones for culture.",
      114: "Promotion Jettison: the founder hasn't fully jettisoned old duties while taking on new CEO responsibilities."
    }
  },
  {
    id: 60,
    title: "The Expensive Lesson",
    scenario: "A company ran a major ad campaign three years ago that failed badly. The lessons were well-documented. Today, a new marketing team is proposing almost the identical campaign structure. No one on the current team was there three years ago.",
    context: "strategy",
    bestModels: [48, 113, 43, 66],
    explanations: {
      48: "Fugitive Information: the lessons exist but aren't accessible to the current team.",
      113: "Progress Principle: history was written but not integrated into current decision-making.",
      43: "Experience Paradox: institutional experience exists but cannot be retrieved when needed.",
      66: "Mack Truck Theory: the institutional knowledge walked out when the original team departed."
    }
  },
  {
    id: 61,
    title: "The Bad Appraisal",
    scenario: "A manager is about to deliver harsh performance feedback to a team member who is already under significant personal stress. The manager knows the feedback is important but is not sure how or when to do it.",
    context: "performance",
    bestModels: [47, 115, 129, 150],
    explanations: {
      47: "Freudian Hydraulic: pressure under personal stress may produce unpredictable emotional reactions.",
      115: "Psychic Radar: read the room carefully before and during the conversation.",
      129: "Socratic Method: guiding questions may be more effective than blunt statements in this context.",
      150: "X Is Good: ground all feedback in specific behavioral evidence, not interpretations."
    }
  },
  {
    id: 62,
    title: "The One Solution Room",
    scenario: "A cross-functional team meets to solve a supply chain problem. Every solution proposed is operational — adjust scheduling, hire more staff, change warehouse layout. No one questions whether the sourcing contracts or vendor relationships are the real issue.",
    context: "operations",
    bestModels: [65, 7, 32, 126],
    explanations: {
      65: "Logic Box: the team's collective KASH limits them to operational solutions they know.",
      7: "Answers in Search of Questions: operational expertise frames all problems as operational.",
      32: "Decision Tree: the problem hasn't been truly isolated before solutions were proposed.",
      126: "Six Honest Servingmen: all six analytical angles haven't been explored before proposing solutions."
    }
  },
  {
    id: 63,
    title: "The Unreachable Goal",
    scenario: "After a major sales achievement, a rep is set a target that is 35% higher than ever before. He was motivated last year; now he starts sandbagging early in the year because he's sure the target is impossible regardless of what he does.",
    context: "sales",
    bestModels: [41, 123, 119, 90],
    explanations: {
      41: "Encore Problem: the record achievement created an unreachable encore target.",
      123: "Self-Fulfilling Prophecy: believing the target is impossible becomes a self-fulfilling behavioral reality.",
      119: "Rising Expectations: last year's exceptional result became this year's impossible standard.",
      90: "Operant Conditioning: if the consequence (hitting target) is perceived as unachievable, the motivating behavior stops."
    }
  },
  {
    id: 64,
    title: "The Volunteer Problem",
    scenario: "A team meeting is called to discuss a serious problem. The leader asks for volunteers to own the solution. Silence. After the meeting, two team members say privately they know how to solve it but didn't speak up because 'it wasn't their job.'",
    context: "leadership",
    bestModels: [9, 13, 2, 17],
    explanations: {
      9: "Army Game: team does only what's explicitly assigned — volunteering ownership was never expected.",
      13: "Authority Syndrome: 'not my job' is a version of authority syndrome.",
      2: "Action Path: each person had an action within their authority they chose not to take.",
      17: "Business-Owner Concept: the culture doesn't support ownership behavior."
    }
  },
  {
    id: 65,
    title: "The Growing Expectations",
    scenario: "A new team is performing above benchmarks. The manager keeps raising the bar every quarter, saying 'great work, now let's aim higher.' After six months, the team feels exhausted and starts saying they can never satisfy the manager.",
    context: "management",
    bestModels: [119, 41, 118, 83],
    explanations: {
      119: "Rising Expectations: each achievement immediately becomes the new minimum.",
      41: "Encore Problem: every result creates a new, harder encore requirement.",
      118: "Relative Deprivation: the team feels deprived relative to the moving standard.",
      83: "Motivation – Dissatisfaction: when the gap between expectation and achievement grows beyond reach, motivation collapses."
    }
  },
  {
    id: 66,
    title: "The Trusted Source",
    scenario: "An executive makes a major product decision based on a market analysis prepared by a trusted industry analyst. When the analysis is later examined, it was based largely on a survey with a small, biased sample. The decision stands unquestioned because of the analyst's reputation.",
    context: "strategy",
    bestModels: [15, 45, 32, 31],
    explanations: {
      15: "Borrowed Perception: the executive adopted the analyst's perception without interrogating the underlying data.",
      45: "Fallacy of Composition: reputation for accuracy doesn't mean this specific analysis is accurate.",
      32: "Decision Tree: the decision should have included interrogation of data quality.",
      31: "Decision Diamond: facts (data quality) weren't fully examined alongside the expert opinion."
    }
  },
  {
    id: 67,
    title: "The Operational Excellence Trap",
    scenario: "A company is extraordinarily good at executing its current business model. When market shifts emerge, the leadership team frames every new challenge as an operational problem to be optimized rather than questioning the business model itself.",
    context: "strategy",
    bestModels: [89, 65, 7, 91],
    explanations: {
      89: "Obsolescence Fusion Triangle: the business model may be becoming obsolete in function even as it's operationally excellent.",
      65: "Logic Box: operational expertise creates a logic box that prevents seeing the need for model change.",
      7: "Answers in Search of Questions: operational tools are being used to frame strategic questions.",
      91: "Opportunity Cost: deep investment in the current model forecloses investment in the new one."
    }
  },
  {
    id: 68,
    title: "The Development-Free Career",
    scenario: "A manager hasn't invested in any employee's development in two years. She says the team is too busy to take time away for training or stretch projects. Three of her top performers are growing stale and two have left in the past year.",
    context: "training",
    bestModels: [81, 92, 146, 66],
    explanations: {
      81: "Mobility Circle: not developing people prevents both their growth and their career mobility.",
      92: "Opportunity Wedge: the window to develop and retain these people is closing.",
      146: "Training Fusion Triangle: on-the-job and informal learning could develop people without taking them 'away.'",
      66: "Mack Truck Theory: underdeveloped talent walks out — and takes knowledge with them."
    }
  },
  {
    id: 69,
    title: "The Culture Mismatch",
    scenario: "A high-performing leader from a command-and-control culture joins a collaborative, flat organization. She keeps making unilateral decisions, bypassing consensus processes. Her results are strong but team morale is declining and peers are frustrated.",
    context: "leadership",
    bestModels: [11, 100, 60, 151],
    explanations: {
      11: "Attitude Box: her responses are shaped by prior experience in a different culture.",
      100: "Personality Change Methods: her leadership style reflects deep habits unlikely to change quickly.",
      60: "Job Fusion Triangle: the situation (culture) is as important as the person — and they're mismatched.",
      151: "Yes Concept: the team's alignment to her approach is absent — results come despite culture, not through it."
    }
  },
  {
    id: 70,
    title: "The Planning Blind Spot",
    scenario: "A team builds a detailed project plan with objectives, tasks, and timelines. When asked about risks and alternatives, the project lead says, 'We're planning for success.' Six weeks in, an unexpected vendor delay stops the project cold.",
    context: "planning",
    bestModels: [104, 111, 128, 130],
    explanations: {
      104: "Planning Path: the plan lacks obstacles and alternatives — two of six required elements.",
      111: "Problem Avoidance: a pre-mortem would have surfaced the vendor dependency risk.",
      128: "So What? What If?: stress-testing the plan would have revealed the single-vendor dependency.",
      130: "Solution Pentagon: contingency solutions should have been planned for likely failure scenarios."
    }
  },
  {
    id: 71,
    title: "The Talent-Poaching Fear",
    scenario: "A director refuses to promote a strong performer because the director's own projects depend on her and another department has been trying to recruit her internally. The employee has been applying for external roles out of frustration.",
    context: "management",
    bestModels: [74, 81, 92, 68],
    explanations: {
      74: "Management Smog: the director is withholding opportunity to protect their own interests.",
      81: "Mobility Circle: development and promotion would retain the employee and build the organization.",
      92: "Opportunity Wedge: the window to retain and develop her is closing.",
      68: "Magic Hand: the director depends on her and resents that dependence."
    }
  },
  {
    id: 72,
    title: "The Emergency Training",
    scenario: "After three customers complain about the same technical error, a manager calls a 90-minute emergency training session with the support team. The session covers the error type once, verbally. Two weeks later, the same error is still occurring.",
    context: "training",
    bestModels: [101, 144, 63, 78],
    explanations: {
      101: "PESOS Formula: the training only covered explaining — no showing, observing, or supervising was included.",
      144: "Training Diamond: the method (verbal one-time lecture) is inadequate even if the subject matter is right.",
      63: "KASH Formula: is this a knowledge gap, skill gap, or habit gap? Each requires a different intervention.",
      78: "Meaningful Experience: direct, observed practice would build lasting skill better than a lecture."
    }
  },
  {
    id: 73,
    title: "The Missing Evidence",
    scenario: "During a succession planning discussion, a manager recommends against a candidate by saying she 'lacks executive presence.' When pressed for specifics, the manager cites that she seems nervous in meetings and her voice wavers. No performance data is referenced.",
    context: "hiring",
    bestModels: [150, 29, 42, 27],
    explanations: {
      150: "X Is Good: 'lacks executive presence' is an unsupported evaluation — need behavioral evidence.",
      29: "Critical Incident Procedure: the evaluation should cite specific observable incidents, not impressions.",
      42: "Evaluation Fusion Triangle: the assessment focuses on a trait impression while ignoring activities and results.",
      27: "Connoisseur Effect: the manager's benchmark for 'executive presence' may be skewed by past exceptions."
    }
  },
  {
    id: 74,
    title: "The Scope Disaster",
    scenario: "A two-month project is now in its eighth month. Every week, new requirements are discovered that 'must' be included. The project team is exhausted and demoralized. The original timeline and budget have been exceeded by 300%.",
    context: "planning",
    bestModels: [96, 40, 33, 80],
    explanations: {
      96: "Parkinson's Laws: without firm scope constraints, work expands to fill available time and budget.",
      40: "Eighty Percent Rule: 80% of the value could have been delivered at a fraction of the cost.",
      33: "Define to Delegate: scope, quality level, and decision rights were never clearly defined.",
      80: "Minimum Commitment Rule: the initial commitment should have been tested before full project commitment."
    }
  },
  {
    id: 75,
    title: "The Ghosted Escalation",
    scenario: "A team lead escalates a critical issue to her manager, who says he'll look into it. Two weeks pass, no response. The team lead raises it again. Same response, same result. The team has stopped bringing issues upward.",
    context: "management",
    bestModels: [72, 52, 9, 73],
    explanations: {
      72: "Management Gap: the team no longer believes the manager can and will help them succeed.",
      52: "Help Philosophy: a manager who doesn't resolve escalations is policing, not helping.",
      9: "Army Game: eventually the team will stop raising anything that isn't explicitly required.",
      73: "Management Process Cyber-Chart: the information-to-action pipeline has a clear break at escalation handling."
    }
  },
  {
    id: 76,
    title: "The Wrong Benchmark",
    scenario: "A business unit reports 8% growth and leadership is pleased. A board member notes that the market grew 22% and three major competitors grew over 30%. The business unit is actually losing meaningful market share.",
    context: "strategy",
    bestModels: [98, 45, 5, 105],
    explanations: {
      98: "Perceptual Fraction: 8% growth feels good until measured against the right benchmark.",
      45: "Fallacy of Composition: growth alone doesn't indicate success in context of market growth.",
      5: "Algebraic Results: the growth number must be netted against market share loss.",
      105: "Planning Pentagon: objectives should include competitor results as a baseline."
    }
  },
  {
    id: 77,
    title: "The Organizational Blindness",
    scenario: "A company's processes are deeply optimized for a customer segment that is rapidly shrinking. The leadership team's metrics all look good by historical standards. No one is monitoring market composition changes. A major revenue cliff is 18 months away.",
    context: "strategy",
    bestModels: [89, 65, 112, 7],
    explanations: {
      89: "Obsolescence Fusion Triangle: the business is becoming functionally obsolete even while internally performing.",
      65: "Logic Box: the team's KASH prevents them from seeing the market composition shift.",
      112: "Problem Filter: the problem is invisible because it doesn't fit any known problem type.",
      7: "Answers in Search of Questions: existing metrics define what gets noticed and what doesn't."
    }
  },
  {
    id: 78,
    title: "The Coaching Resistance",
    scenario: "A manager is working with a coach to develop her leadership style. The coach is skilled and the sessions are productive. However, after sessions end, the manager reverts to her old patterns. Development isn't transferring to real situations.",
    context: "training",
    bestModels: [36, 100, 83, 78],
    explanations: {
      36: "Desire for Change: coaching works only when the person genuinely wants a different future state.",
      100: "Personality Change Methods: deep behavioral change in adults is difficult and rare without real motivation.",
      83: "Motivation – Dissatisfaction: insufficient dissatisfaction with current behavior means the motivation to change is weak.",
      78: "Meaningful Experience: real behavioral change requires direct, visible, understood experience — not just conversation."
    }
  },
  {
    id: 79,
    title: "The Loaded Hire",
    scenario: "An experienced hire joins a team with excellent references. On day one, her manager assumes she needs no onboarding, gives her a full portfolio immediately, and expects full productivity within two weeks. She struggles and her manager is frustrated.",
    context: "hiring",
    bestModels: [63, 106, 145, 15],
    explanations: {
      63: "KASH Formula: even experienced hires have knowledge and habit gaps specific to this new context.",
      106: "Polishing Action: onboarding refines existing skills for the new context — it shouldn't be skipped.",
      145: "Training Formula: identify the specific KASH gaps that exist between her prior experience and this role's needs.",
      15: "Borrowed Perception: the manager's perception of her readiness is based on references, not direct observation."
    }
  },
  {
    id: 80,
    title: "The Legacy Project",
    scenario: "A project that started three years ago under different leadership no longer aligns with current strategy. It has $800K remaining in budget and a dedicated team. Despite weak results, leadership keeps it running. No one wants to be the one to cancel it.",
    context: "strategy",
    bestModels: [137, 91, 116, 128],
    explanations: {
      137: "Sunk Cost: the $2M+ already spent should not determine the decision — only future value matters.",
      91: "Opportunity Cost: $800K and the team's time could produce far more value elsewhere.",
      116: "Pyrrhic Victory: completing the project may cost more than the organizational benefit it provides.",
      128: "So What? What If?: ask what continuing actually achieves, and what happens if the budget is redirected."
    }
  }
];

// Relationship chains between models
const RELATIONSHIP_CHAINS = [
  {
    id: "change",
    name: "Change Chain",
    description: "How attitude leads to genuine organizational change",
    models: [12, 36, 87, 56, 19, 20],
    summary: "Effective change begins with building awareness and moving through attitude stages, then creates pull rather than push, proceeds incrementally, plans for the temporary dip, and uses ceremony and pacing to smooth the transition."
  },
  {
    id: "performance",
    name: "Performance Chain",
    description: "Diagnosing and developing people to perform at their best",
    models: [18, 63, 61, 60, 42],
    summary: "Before developing someone, assess both ability and willingness. Then diagnose using KASH, ensure person-role fit, account for situational factors, and evaluate across all three dimensions: traits, activities, and results."
  },
  {
    id: "problem_solving",
    name: "Problem-Solving Chain",
    description: "From recognizing a problem to implementing the right solution",
    models: [37, 112, 32, 31, 130, 28],
    summary: "Start by identifying the gap from standard. Watch for problem-filter blind spots. Solve by isolating and generating alternatives. Use intuition, facts, experience, and policy. Choose the right solution type. Build ongoing control."
  },
  {
    id: "delegation",
    name: "Delegation Chain",
    description: "How to delegate effectively and free up management time",
    models: [33, 35, 34, 82],
    summary: "Define work clearly before delegating. Match the delegation level (do, do-report, check-do-report) to competence. Understand the five failure points when delegation breaks. Create time through delegation and simplification."
  },
  {
    id: "perception",
    name: "Perception Chain",
    description: "How perception shapes what we see and the decisions we make",
    models: [15, 122, 99, 65, 27],
    summary: "Much of what we know is borrowed from others. We filter selectively. We see only what we know how to see. Our KASH limits what we can imagine. And exceptional past experience skews our current judgments."
  },
  {
    id: "motivation",
    name: "Motivation Chain",
    description: "Understanding and activating what drives human behavior",
    models: [83, 84, 85, 36, 87],
    summary: "Motivation starts with dissatisfaction. Needs are hierarchical — security before stimulation. Three needs — security, stimulation, identity — must all be addressed. Change requires the desire to change. Create pull, not push."
  },
  {
    id: "hiring",
    name: "Hiring Chain",
    description: "From defining the role to selecting the right person",
    models: [54, 117, 61, 44, 136, 59],
    summary: "First identify what success looks like in this specific situation. Define the talent picture before sourcing. Match person to role explicitly. Avoid over-optimizing for failure avoidance. Hire for success. Cover all five interview areas."
  }
];

export { SCENARIOS, RELATIONSHIP_CHAINS };
