export type StoryType = "origin" | "launch" | "pitch" | "case_study" | "brand_manifesto" | "explainer";
export type StoryStatus = "draft" | "review" | "published";
export type SectionStatus = "draft" | "approved";
export type AssetType = "image" | "video" | "audio" | "document";

export interface StorySection {
  id: string;
  name: string;
  content: string;
  placeholder: string;
  guidance: string;
  wordCountTarget: number;
  status: SectionStatus;
}

export interface Story {
  id: string;
  title: string;
  type: StoryType;
  status: StoryStatus;
  sections: StorySection[];
  brandVoiceId: string;
  targetAudience: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoryTemplate {
  id: string;
  name: string;
  type: StoryType;
  description: string;
  sections: { name: string; placeholder: string; guidance: string; wordCountTarget: number }[];
  examplePreview: string;
}

export interface BrandVoice {
  id: string;
  name: string;
  toneDescriptors: string[];
  examplePhrases: string[];
  avoidPhrases: string[];
  targetAudience: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  filename: string;
  type: AssetType;
  uploadDate: string;
  linkedStoryId: string | null;
  linkedStoryTitle: string | null;
  size: string;
}

// --- Story Templates ---

export const storyTemplates: StoryTemplate[] = [
  {
    id: "tpl-origin",
    name: "Origin Story",
    type: "origin",
    description: "Tell the founding story. Why does this company exist? What moment sparked the mission?",
    sections: [
      { name: "The Moment", placeholder: "Describe the pivotal moment that started it all...", guidance: "Open with a vivid, specific scene. Make the reader feel present.", wordCountTarget: 200 },
      { name: "The Struggle", placeholder: "What problem was so painful it demanded a solution?", guidance: "Show the emotional weight. Use concrete details, not abstractions.", wordCountTarget: 250 },
      { name: "The Insight", placeholder: "What did the founder see that nobody else did?", guidance: "This is the intellectual turning point. Make it feel inevitable in hindsight.", wordCountTarget: 200 },
      { name: "The Build", placeholder: "How did the idea become real?", guidance: "Show scrappiness and conviction. Include setbacks that tested belief.", wordCountTarget: 250 },
      { name: "The Mission", placeholder: "What is the company fighting for today?", guidance: "Connect the origin to the present. End with forward momentum.", wordCountTarget: 150 },
    ],
    examplePreview: "It was 2 a.m. in a Dublin flat when Sarah first realized that every product launch she'd witnessed told the same hollow story...",
  },
  {
    id: "tpl-launch",
    name: "Launch Narrative",
    type: "launch",
    description: "Build anticipation and explain why your product matters right now. Structure the reveal for maximum impact.",
    sections: [
      { name: "Hook", placeholder: "Open with the tension your audience already feels...", guidance: "Start where your audience lives. Name the frustration before the solution.", wordCountTarget: 150 },
      { name: "Problem", placeholder: "Define the problem in human terms...", guidance: "Avoid technical jargon. Frame the problem as a story, not a spec sheet.", wordCountTarget: 200 },
      { name: "Transformation", placeholder: "Show what changes when the product arrives...", guidance: "Paint the before and after. Use sensory language.", wordCountTarget: 250 },
      { name: "Proof", placeholder: "Provide evidence this works...", guidance: "Use real numbers, real names, real outcomes. Specificity builds trust.", wordCountTarget: 200 },
      { name: "Call to Action", placeholder: "Tell the audience exactly what to do next...", guidance: "One clear action. Remove friction. Create urgency without manipulation.", wordCountTarget: 100 },
    ],
    examplePreview: "Your customers are drowning in features they never asked for. They don't need another dashboard. They need a story that makes them care...",
  },
  {
    id: "tpl-pitch",
    name: "Investor Pitch",
    type: "pitch",
    description: "Craft a narrative that makes investors feel the opportunity before seeing the numbers.",
    sections: [
      { name: "The World is Changing", placeholder: "Describe the macro shift creating this opportunity...", guidance: "Start big. Show the wave before showing how you'll ride it.", wordCountTarget: 200 },
      { name: "The Gap", placeholder: "What massive gap has this shift created?", guidance: "Make the gap feel urgent and underserved. Size it with data.", wordCountTarget: 200 },
      { name: "Our Weapon", placeholder: "Describe your unfair advantage...", guidance: "Be specific about what you do differently. Avoid 'AI-powered everything.'", wordCountTarget: 200 },
      { name: "Traction", placeholder: "Show what you've proven so far...", guidance: "Revenue, users, partnerships, waitlists. Numbers tell the truth.", wordCountTarget: 150 },
      { name: "The Team", placeholder: "Why is this team uniquely positioned to win?", guidance: "Connect team backgrounds to the specific problem. Show earned insight.", wordCountTarget: 150 },
      { name: "The Ask", placeholder: "What do you need and what will you do with it?", guidance: "Clear amount, clear milestones, clear timeline. Investors fund clarity.", wordCountTarget: 100 },
    ],
    examplePreview: "In the next five years, every enterprise will need to explain AI to their customers. The companies that tell the best stories will win...",
  },
  {
    id: "tpl-case-study",
    name: "Customer Case Study",
    type: "case_study",
    description: "Turn a customer success into a story that sells. Show the journey from pain to transformation.",
    sections: [
      { name: "The Challenge", placeholder: "Describe what the customer was struggling with...", guidance: "Let the customer's voice lead. Use their words, their frustrations.", wordCountTarget: 250 },
      { name: "The Approach", placeholder: "How did you solve it together?", guidance: "Show collaboration, not just implementation. Highlight key decisions.", wordCountTarget: 250 },
      { name: "The Results", placeholder: "What measurable outcomes were achieved?", guidance: "Lead with the most impressive metric. Then layer in supporting evidence.", wordCountTarget: 200 },
      { name: "The Reflection", placeholder: "What did the customer say looking back?", guidance: "End with a direct quote that captures the emotional impact.", wordCountTarget: 150 },
    ],
    examplePreview: "When Meridian Corp's CTO called us, her team had spent six months building launch materials that nobody read...",
  },
  {
    id: "tpl-manifesto",
    name: "Brand Manifesto",
    type: "brand_manifesto",
    description: "Declare what you stand for. A manifesto is a stake in the ground that attracts believers.",
    sections: [
      { name: "The Belief", placeholder: "State your core belief about the world...", guidance: "Be bold. A manifesto that doesn't polarize isn't a manifesto.", wordCountTarget: 150 },
      { name: "The Problem With Today", placeholder: "What's broken in the current way of doing things?", guidance: "Name the enemy. It's not a competitor; it's a way of thinking.", wordCountTarget: 200 },
      { name: "Our Stand", placeholder: "Declare what you're building instead...", guidance: "Use 'we believe' language. Make it feel like a movement, not a product.", wordCountTarget: 200 },
      { name: "The Invitation", placeholder: "Invite the reader to join...", guidance: "End with belonging. People join causes, not companies.", wordCountTarget: 150 },
    ],
    examplePreview: "We believe every product has a soul. Somewhere beneath the roadmap and the metrics, there's a reason this thing exists...",
  },
  {
    id: "tpl-explainer",
    name: "Product Explainer",
    type: "explainer",
    description: "Make the complex simple. Help people understand what your product does and why it matters to them.",
    sections: [
      { name: "The Setup", placeholder: "Describe the world your audience lives in...", guidance: "Mirror their daily reality. Show you understand their context.", wordCountTarget: 150 },
      { name: "The Problem", placeholder: "Name the specific friction they face...", guidance: "Be precise. Vague problems get vague attention.", wordCountTarget: 200 },
      { name: "How It Works", placeholder: "Explain the product in three clear steps...", guidance: "Simplicity is everything. If you can't explain it in three steps, rethink.", wordCountTarget: 250 },
      { name: "Why It's Different", placeholder: "Show what makes this approach unique...", guidance: "Compare to the old way, not to competitors. Show the paradigm shift.", wordCountTarget: 200 },
      { name: "Get Started", placeholder: "Make the first step effortless...", guidance: "Remove every possible barrier. One click, one action, one win.", wordCountTarget: 100 },
    ],
    examplePreview: "You've built something incredible. But every time you try to explain it, you watch people's eyes glaze over...",
  },
];

// --- Brand Voices ---

export const brandVoices: BrandVoice[] = [
  {
    id: "bv-1",
    name: "Playbook Films - Core Voice",
    toneDescriptors: ["Warm", "Confident", "Cinematic", "Direct", "Human"],
    examplePhrases: [
      "Every product has a story worth telling.",
      "We don't do corporate speak. We do campfire stories with strategy.",
      "The best narratives feel inevitable in hindsight.",
      "Complexity is the enemy of connection.",
    ],
    avoidPhrases: [
      "Synergy",
      "Leverage our platform",
      "Best-in-class",
      "Circle back",
      "Move the needle",
      "Disruptive innovation",
    ],
    targetAudience: "Product leaders, founders, and marketing teams at growth-stage tech companies",
    createdAt: "2026-03-15",
  },
  {
    id: "bv-2",
    name: "Enterprise Advisory",
    toneDescriptors: ["Authoritative", "Measured", "Precise", "Empathetic"],
    examplePhrases: [
      "The data tells a story. Let us help you read it.",
      "Transformation starts with understanding where you are.",
      "We meet organizations where they are, not where we wish they were.",
    ],
    avoidPhrases: [
      "Pivot",
      "Hack",
      "Crushing it",
      "Game-changer",
      "Low-hanging fruit",
    ],
    targetAudience: "C-suite executives and VPs at mid-market and enterprise organizations",
    createdAt: "2026-03-20",
  },
];

// --- Mock Stories ---

export const stories: Story[] = [
  {
    id: "story-1",
    title: "How Meridian Corp Found Their Voice",
    type: "case_study",
    status: "published",
    brandVoiceId: "bv-1",
    targetAudience: "SaaS founders considering narrative-driven marketing",
    sections: [
      {
        id: "s1-1", name: "The Challenge", status: "approved",
        content: "When Meridian Corp's CTO called us, her team had spent six months building launch materials that nobody read. They had a brilliant product but couldn't explain why it mattered. Their engineers spoke in technical specifications. Their marketers spoke in buzzwords. And their customers? They spoke in problems that neither group was addressing.",
        placeholder: "Describe what the customer was struggling with...",
        guidance: "Let the customer's voice lead.", wordCountTarget: 250,
      },
      {
        id: "s1-2", name: "The Approach", status: "approved",
        content: "We started by listening. Not to the product team, not to marketing, but to Meridian's actual customers. We ran twelve interviews in two weeks. The stories we heard were nothing like the narrative Meridian had been telling. Customers didn't care about the technology. They cared about the three hours it saved them every week.",
        placeholder: "How did you solve it together?",
        guidance: "Show collaboration.", wordCountTarget: 250,
      },
      {
        id: "s1-3", name: "The Results", status: "approved",
        content: "Within 90 days of launching the new narrative, Meridian saw a 340% increase in demo requests. Their sales cycle shortened by two weeks. But the metric that mattered most? Their NPS jumped 22 points because customers finally understood what they'd bought.",
        placeholder: "What measurable outcomes were achieved?",
        guidance: "Lead with the most impressive metric.", wordCountTarget: 200,
      },
      {
        id: "s1-4", name: "The Reflection", status: "approved",
        content: "\"We thought we had a marketing problem,\" their CTO told us. \"Turns out we had a story problem. Once we learned to tell our story through our customers' eyes, everything clicked.\"",
        placeholder: "What did the customer say looking back?",
        guidance: "End with a direct quote.", wordCountTarget: 150,
      },
    ],
    createdAt: "2026-03-18",
    updatedAt: "2026-04-02",
  },
  {
    id: "story-2",
    title: "The Future of Product Storytelling",
    type: "brand_manifesto",
    status: "review",
    brandVoiceId: "bv-1",
    targetAudience: "Product leaders who believe in narrative-driven growth",
    sections: [
      {
        id: "s2-1", name: "The Belief", status: "approved",
        content: "We believe every product has a soul. Somewhere beneath the roadmap and the metrics, there's a reason this thing exists. A moment that sparked the idea. A frustration that demanded a solution. A vision of the world as it could be. That soul is your story. And if you can't tell it, you can't sell it.",
        placeholder: "State your core belief...",
        guidance: "Be bold.", wordCountTarget: 150,
      },
      {
        id: "s2-2", name: "The Problem With Today", status: "approved",
        content: "The tech industry has forgotten how to speak human. We've replaced stories with specs, empathy with engagement metrics, and conviction with conversion funnels. We produce content that performs and narratives that numb.",
        placeholder: "What's broken?",
        guidance: "Name the enemy.", wordCountTarget: 200,
      },
      {
        id: "s2-3", name: "Our Stand", status: "draft",
        content: "We believe in narratives that move people. Not click-through rates, not impressions, not likes. Movement. The kind that makes a customer lean forward. The kind that makes an investor say yes before seeing the spreadsheet.",
        placeholder: "Declare what you're building...",
        guidance: "Use 'we believe' language.", wordCountTarget: 200,
      },
      {
        id: "s2-4", name: "The Invitation", status: "draft",
        content: "",
        placeholder: "Invite the reader to join...",
        guidance: "End with belonging.", wordCountTarget: 150,
      },
    ],
    createdAt: "2026-04-01",
    updatedAt: "2026-04-10",
  },
  {
    id: "story-3",
    title: "Launching Playbook Films v2",
    type: "launch",
    status: "draft",
    brandVoiceId: "bv-1",
    targetAudience: "Existing customers and newsletter subscribers",
    sections: [
      {
        id: "s3-1", name: "Hook", status: "draft",
        content: "Your product just shipped a major update. But the announcement reads like a changelog. Nobody cares about 47 new features. They care about the one thing that changes their Tuesday.",
        placeholder: "Open with the tension your audience already feels...",
        guidance: "Start where your audience lives.", wordCountTarget: 150,
      },
      {
        id: "s3-2", name: "Problem", status: "draft",
        content: "",
        placeholder: "Define the problem in human terms...",
        guidance: "Avoid technical jargon.", wordCountTarget: 200,
      },
      {
        id: "s3-3", name: "Transformation", status: "draft",
        content: "",
        placeholder: "Show what changes when the product arrives...",
        guidance: "Paint the before and after.", wordCountTarget: 250,
      },
      {
        id: "s3-4", name: "Proof", status: "draft",
        content: "",
        placeholder: "Provide evidence this works...",
        guidance: "Use real numbers.", wordCountTarget: 200,
      },
      {
        id: "s3-5", name: "Call to Action", status: "draft",
        content: "",
        placeholder: "Tell the audience exactly what to do next...",
        guidance: "One clear action.", wordCountTarget: 100,
      },
    ],
    createdAt: "2026-04-08",
    updatedAt: "2026-04-11",
  },
  {
    id: "story-4",
    title: "Why AI Companies Need Human Stories",
    type: "origin",
    status: "draft",
    brandVoiceId: "bv-2",
    targetAudience: "AI startup founders and product marketers",
    sections: [
      {
        id: "s4-1", name: "The Moment", status: "approved",
        content: "It was 2 a.m. in a Dublin flat when I realized every AI product launch I'd witnessed told the same hollow story. 'Powered by AI.' 'Leveraging machine learning.' 'Intelligent automation.' The words meant nothing. The products might have been extraordinary, but nobody could tell because every story sounded the same.",
        placeholder: "Describe the pivotal moment...",
        guidance: "Open with a vivid, specific scene.", wordCountTarget: 200,
      },
      {
        id: "s4-2", name: "The Struggle", status: "draft",
        content: "",
        placeholder: "What problem was so painful it demanded a solution?",
        guidance: "Show the emotional weight.", wordCountTarget: 250,
      },
      {
        id: "s4-3", name: "The Insight", status: "draft",
        content: "",
        placeholder: "What did the founder see that nobody else did?",
        guidance: "Make it feel inevitable in hindsight.", wordCountTarget: 200,
      },
      {
        id: "s4-4", name: "The Build", status: "draft",
        content: "",
        placeholder: "How did the idea become real?",
        guidance: "Show scrappiness and conviction.", wordCountTarget: 250,
      },
      {
        id: "s4-5", name: "The Mission", status: "draft",
        content: "",
        placeholder: "What is the company fighting for today?",
        guidance: "Connect the origin to the present.", wordCountTarget: 150,
      },
    ],
    createdAt: "2026-04-10",
    updatedAt: "2026-04-11",
  },
];

// --- Mock Assets ---

export const assets: Asset[] = [
  { id: "asset-1", filename: "meridian-hero-shot.jpg", type: "image", uploadDate: "2026-03-20", linkedStoryId: "story-1", linkedStoryTitle: "How Meridian Corp Found Their Voice", size: "2.4 MB" },
  { id: "asset-2", filename: "brand-manifesto-v1.mp4", type: "video", uploadDate: "2026-04-01", linkedStoryId: "story-2", linkedStoryTitle: "The Future of Product Storytelling", size: "48.2 MB" },
  { id: "asset-3", filename: "interview-audio-cto.mp3", type: "audio", uploadDate: "2026-03-22", linkedStoryId: "story-1", linkedStoryTitle: "How Meridian Corp Found Their Voice", size: "12.8 MB" },
  { id: "asset-4", filename: "launch-brief-v2.pdf", type: "document", uploadDate: "2026-04-08", linkedStoryId: "story-3", linkedStoryTitle: "Launching Playbook Films v2", size: "1.1 MB" },
  { id: "asset-5", filename: "team-photo-dublin.jpg", type: "image", uploadDate: "2026-04-05", linkedStoryId: null, linkedStoryTitle: null, size: "3.7 MB" },
  { id: "asset-6", filename: "customer-testimonial.mp4", type: "video", uploadDate: "2026-03-25", linkedStoryId: "story-1", linkedStoryTitle: "How Meridian Corp Found Their Voice", size: "32.1 MB" },
  { id: "asset-7", filename: "product-screenshots.zip", type: "document", uploadDate: "2026-04-09", linkedStoryId: "story-3", linkedStoryTitle: "Launching Playbook Films v2", size: "8.5 MB" },
  { id: "asset-8", filename: "podcast-episode-12.mp3", type: "audio", uploadDate: "2026-04-03", linkedStoryId: null, linkedStoryTitle: null, size: "22.4 MB" },
];

// --- Helper functions ---

export const storyTypeLabels: Record<StoryType, string> = {
  origin: "Origin Story",
  launch: "Launch Narrative",
  pitch: "Investor Pitch",
  case_study: "Case Study",
  brand_manifesto: "Brand Manifesto",
  explainer: "Product Explainer",
};

export const storyStatusColors: Record<StoryStatus, string> = {
  draft: "bg-amber-100 text-amber-800",
  review: "bg-blue-100 text-blue-800",
  published: "bg-emerald-100 text-emerald-800",
};

export const assetTypeIcons: Record<AssetType, string> = {
  image: "Image",
  video: "Film",
  audio: "Music",
  document: "FileText",
};

export function getCompletedSections(story: Story): number {
  return story.sections.filter((s) => s.content.trim().length > 0).length;
}

export function getStoryProgress(story: Story): number {
  if (story.sections.length === 0) return 0;
  return Math.round((getCompletedSections(story) / story.sections.length) * 100);
}

export function getWordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
