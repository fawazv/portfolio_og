/*
 * Guides — single source for /guides and /guides/[slug].
 * The video-editing guide comes from the owner's own MY-GUIDE-v2.md and
 * EDITING-GUIDE.md (E:\Ai Video Editor). Every number is from that reel's
 * real run; nothing is invented. Keep it that way.
 *
 * Inline text supports **bold**, *italic*, `code` and [links](https://…).
 */

export type GuideImage = { src: string; width: number; height: number; alt: string; caption?: string };

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "prompt"; label?: string; text: string }
  | { type: "tip"; text: string }
  | { type: "image"; image: GuideImage }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; head: [string, string]; rows: [string, string][] }
  | { type: "ratings" }
  | { type: "h3"; text: string };

export type GuideSection = { id: string; step?: string; title: string; blocks: GuideBlock[] };

export type GuideSkill = {
  names: string[];
  job: string;
  source: { kind: "npm" | "github" | "bundled" | "private"; label: string; href?: string };
};

export type Guide = {
  slug: string;
  title: string;
  /** Shorter title for cards and the browser tab */
  shortTitle: string;
  summary: string;
  updated: string;
  /** ISO date for metadata */
  updatedIso: string;
  readTime: string;
  tags: string[];
  author: { name: string; handle: string; href: string };
  cover: GuideImage;
  facts: { value: string; label: string }[];
  needs: string[];
  parts: { name: string; job: string }[];
  skills: GuideSkill[];
  tools: string[];
  sections: GuideSection[];
  didIt: { image: GuideImage; items: string[] };
  practices: string[];
  troubleshooting: [string, string][];
  closing: string;
};

const img = "/images/guides/claude-video-editing";

export const guides: Guide[] = [
  {
    slug: "claude-video-editing",
    title: "Claude × HyperFrames: how I edit my reels by talking",
    shortTitle: "Edit reels by talking to Claude",
    summary:
      "I film one take, drop it in a folder and tell Claude what I want. It cuts the dead air, captions my exact words in Malayalam and English, adds motion graphics, 3D B-roll, face-tracked effects and sound in my brand, and checks its own work. I never open a video editor.",
    updated: "November 2026",
    updatedIso: "2026-11-24",
    readTime: "9 min read",
    tags: ["Claude Code", "HyperFrames", "ffmpeg", "Video"],
    author: { name: "Mohammed Fawaz", handle: "@_.fawaz_v", href: "https://www.instagram.com/_.fawaz_v/" },
    cover: {
      src: `${img}/cover.webp`,
      width: 1440,
      height: 640,
      alt: "Four frames from the finished reel: the orbit hook, the 3D tiles, the productivity graph and the end word",
    },
    facts: [
      { value: "66.4 s", label: "finished reel from one raw take" },
      { value: "50", label: "choices rated on the storyboard" },
      { value: "5", label: "review rounds" },
    ],
    needs: [
      "Claude desktop app, **Code** tab → [claude.com/download](https://claude.com/download)",
      "Node.js 22+, Python 3.10+, ffmpeg and Google Chrome (Claude installs what's missing, after asking)",
      "Your own sound effect packs, and music you have the right to use",
      "About 20 minutes for setup",
    ],
    parts: [
      { name: "HyperFrames", job: "The editor: footage, timeline, captions, graphics, 3D, final render. The edit is HTML, so every caption sits on an exact frame." },
      { name: "ffmpeg", job: "Cuts, colour grade and voice level, done before HyperFrames." },
      { name: "Effects engine", job: "Anything that follows your face: orbit, words behind your head, punch-ins." },
      { name: "earshot", job: "Claude's ears. It can't hear, so every sound is picked and checked by measurement." },
      { name: "The skills", job: "The playbook: measure the footage, time captions, keep graphics off your face, check every render." },
      { name: "Brand sheet", job: "`brand/brand.json`: my colours, fonts, caption and title style, so every video looks like mine." },
      { name: "Four review pages", job: "Brand Lab (your look), Sound Board (your sounds), Colour Lab (your grade), Storyboard (the edit)." },
    ],
    skills: [
      {
        names: ["hyperframes", "hyperframes-cli", "hyperframes-registry", "media-use"],
        job: "The editor, its command line and its library of about 450 ready-made blocks.",
        source: { kind: "npm", label: "npm i -g hyperframes", href: "https://www.npmjs.com/package/hyperframes" },
      },
      {
        names: ["motion-doctrine", "cut-the-curve", "seam-craft", "captions-overlay"],
        job: "How graphics enter, move, leave and hand over, and how captions sit on top of the film.",
        source: { kind: "bundled", label: "hyperframes skills update" },
      },
      {
        names: ["effects"],
        job: "51 face-tracked effects (orbit, spotlight, iPhone toggles, phone fan…) and the engine that runs them.",
        source: { kind: "github", label: "claude-video-effects", href: "https://github.com/Vibha-Ramprakash/claude-video-effects" },
      },
      {
        names: ["earshot"],
        job: "Measures and describes sound, so Claude can pick, trim and check audio it can't hear.",
        source: { kind: "github", label: "earshot", href: "https://github.com/Leonxlnx/earshot" },
      },
      {
        names: ["modern-video-editing"],
        job: "My editing rules: ten guides, presets, 25 extra effects, the storyboard and Brand Lab kits.",
        source: { kind: "private", label: "My own skill, not public yet" },
      },
      {
        names: ["remotion-reel"],
        job: "Measured talking-head rules: caption placement, layouts and sound checks. A backup editor.",
        source: { kind: "private", label: "From a shared setup" },
      },
    ],
    tools: ["Claude Code", "HyperFrames", "ffmpeg", "whisper.cpp", "Node.js 22+", "Python 3.10+", "Google Chrome"],
    sections: [
      {
        id: "set-up",
        step: "01",
        title: "Set up once",
        blocks: [
          { type: "p", text: "Open an empty folder in the Code tab and paste:" },
          {
            type: "prompt",
            label: "Setup prompt",
            text: "Set up this folder for vertical reels (1080x1920, 30 fps). Create RAW, references, brand, public/sound/mine, public/music, public/media/mine, hyperframes, work, exports, scripts, bin. Check hyperframes, ffmpeg, node and python. Ask me before every download. Don't edit any video yet. End with a table: check, pass or fail.",
          },
          { type: "p", text: "Then install the skills listed in [the skills section](#skills). Start a new chat after installing." },
          { type: "tip", text: "Skills load when a chat starts, so a fresh chat is what makes them show up." },
        ],
      },
      {
        id: "before-first-edit",
        step: "02",
        title: "Before your first edit",
        blocks: [
          { type: "h3", text: "Your brand" },
          { type: "p", text: "Put 2 or 3 reels whose style you love in `references/` and paste:" },
          {
            type: "prompt",
            label: "Brand sheet prompt",
            text: "Make my brand sheet from the videos in references/: colours, fonts (one that covers Malayalam), caption style, title style, motion, sound rules and colour grade, as exact values in brand/brand.json and readable in brand/BRAND.md. Show me sample frames and wait for my yes.",
          },
          {
            type: "image",
            image: { src: `${img}/brand-sheet.webp`, width: 1200, height: 860, alt: "My brand sheet: colours, fonts and caption style", caption: "My brand sheet: every video starts from these values." },
          },
          {
            type: "p",
            text: "Then ask for a **Brand Lab**: a page of short moving samples in your brand on your own footage. Rate each one Keep, Maybe or Drop. Everything you keep becomes a ready-made style for every video.",
          },
          {
            type: "image",
            image: { src: `${img}/brand-lab.webp`, width: 1150, height: 1760, alt: "The Brand Lab page: samples to rate Keep, Maybe or Drop", caption: "The Brand Lab: samples grouped by grounds, type, captions, layouts, effects and transitions." },
          },
          { type: "h3", text: "Your sounds" },
          {
            type: "p",
            text: "Put your packs in `public/sound/mine/`, one folder per pack. Then open the **Sound Board** (`public/sound/mine/player.html`): play every sound, mark ⭐ favourites and 🚫 never-use, rename them, and press **Save choices**. Claude tries your ⭐ sounds first and never uses a 🚫 one. A moment with no fitting sound becomes a “gap” for you, and Claude never makes up a sound for it.",
          },
          {
            type: "image",
            image: { src: `${img}/sound-board.webp`, width: 1280, height: 980, alt: "The Sound Board: every sound with its waveform, loudness, favourite and never-use marks", caption: "The Sound Board: rate your sounds once, and every edit uses them." },
          },
          { type: "h3", text: "Your pictures" },
          {
            type: "p",
            text: "Effects like orbit or a phone feed need *your* screenshots or clips. Claude never generates or downloads them: it asks you, tells you exactly how many and what shape, and waits. B-roll and 3D graphics need no pictures: they're drawn from your words.",
          },
          { type: "h3", text: "Film it" },
          { type: "p", text: "One take, mistakes included, a pause between sentences. Leave room above your head. Vertical, 4K if you can." },
        ],
      },
      {
        id: "your-edit",
        step: "03",
        title: "Your edit",
        blocks: [
          { type: "p", text: "Drop the take into `RAW/` and paste:" },
          {
            type: "prompt",
            label: "Edit prompt",
            text: "Edit RAW/<your video>.mp4 into a reel, following docs/WORKFLOW.md and my brand. Cut the dead air, add captions on my exact words, and plan motion graphics, effects and sounds for each beat. Tell me which effects need my pictures and exactly what to add. Then show me the storyboard.",
          },
          { type: "p", text: "**What happens:**" },
          {
            type: "list",
            ordered: true,
            items: [
              "Claude transcribes. For Malayalam, you fix the words once in `corrected.txt`.",
              "It cuts every pause and lands each cut where the camera angle changes.",
              "It asks for any pictures an effect needs. In my reel that was 8 reel screenshots for the orbit and 3 posts for the feed. You drop them in the folder it names and reply `added`. Claude blurs names and notifications, strips location data and never touches your originals.",
              "It builds the draft, looks at the frames itself, and fixes anything that covers your face or the captions.",
            ],
          },
          { type: "h3", text: "Add B-roll and 3D from your words" },
          { type: "p", text: "No pictures needed:" },
          {
            type: "prompt",
            label: "B-roll prompt",
            text: "Add B-roll motion graphics drawn from my words, following docs/WORKFLOW.md (\"B-roll motion graphics\"): a full-screen cover or a card above my head, <how many> at most, never in the first second, and never invent numbers. Where a beat lists things, make it a 3D graphic. Show me the list before building.",
          },
          {
            type: "p",
            text: "In my reel this turned two checklists into **3D tiles** and a **3D stack**, the b-roll split into a **3D screen**, and added two cards straight from my lines (“no waste”, “edited fully in Claude”).",
          },
        ],
      },
      {
        id: "review",
        step: "04",
        title: "Review the storyboard",
        blocks: [
          {
            type: "p",
            text: "You get a page with a short clip of every beat and a preview of every single choice: cuts, captions, graphics, effects, transitions, sounds and colour. Rate each one:",
          },
          {
            type: "image",
            image: { src: `${img}/storyboard.webp`, width: 1180, height: 1010, alt: "The storyboard: a draft clip of the beat on the left, every choice with its picture and Keep, Maybe, Drop on the right", caption: "The storyboard: a draft clip per beat, and every choice with its own preview." },
          },
          { type: "ratings" },
          {
            type: "p",
            text: "Hit **Submit**, then type `done` in the chat. Claude changes the Maybes, answers your notes and sends the next round. Nothing is delivered until every item is Keep or Drop.",
          },
          { type: "h3", text: "Grade it yourself (optional)" },
          {
            type: "p",
            text: "Say “Open the Colour Lab for work/<video name>/”. You get Lightroom-style sliders on frames of your own take: start from your brand grade, Auto or a match to your reference video, then white balance, light, tone curve, colour mixer with **Protect skin**, masks that follow your face, and your own LUT. Press **Send grade**: Claude renders real frames through it so you can see the page tells the truth, then **Keep this grade**.",
          },
          {
            type: "image",
            image: { src: `${img}/colour-lab.webp`, width: 1280, height: 1480, alt: "The Colour Lab: start-from looks, a before and after split of my take, and the grading panels", caption: "The Colour Lab: grade on frames of your own take, then check it against a real render." },
          },
          { type: "h3", text: "Notes that worked for me" },
          {
            type: "list",
            items: [
              "*“The audio and video are not in sync. Fix it.”* → Claude made every cut a whole number of frames, so sound and picture run the same length.",
              "*“Add an orbit and other effects. Tell me what pictures you need.”*",
              "*“At 31 to 37 s there's a background blur. Remove it and add a motion graphic.”* → a glass card with a line that climbs to 3x exactly on the word “productivity”.",
            ],
          },
        ],
      },
      {
        id: "deliver",
        step: "05",
        title: "Deliver",
        blocks: [
          {
            type: "p",
            text: "When everything is Keep or Drop, Claude renders the final video and checks it before you see it: frame count, black or frozen frames, loudness (−14 LUFS for Instagram) and true peak. You get:",
          },
          {
            type: "table",
            head: ["File", "What it is"],
            rows: [
              ["`exports/<video>.mp4`", "The reel"],
              ["`exports/<video>.srt`", "Subtitles"],
              ["`exports/<video>-notes.md`", "The checks, plus anything still missing (like music) and each sound whose licence is unknown"],
            ],
          },
          { type: "p", text: "Then Claude asks whether to keep your pictures for next time, and cleans out the in-between files." },
        ],
      },
    ],
    didIt: {
      image: {
        src: `${img}/effects-grid.webp`,
        width: 1440,
        height: 1920,
        alt: "Twelve moments from the reel: orbit, feed, EDITOR crossed out, voice wave, 3D tiles, iPhone toggles, productivity graph, 3D screen, 3D stack, B-roll cover, B-roll overlay, end word",
      },
      items: [
        "My reels orbiting my head in the hook",
        "My real posts sliding in on a phone feed",
        "**EDITOR** written huge behind me and crossed out on “I'm not a video editor”",
        "A voice wave whose silence collapses, on “I've started editing videos”",
        "**3D tiles** building up what Claude Code makes: captions, motion graphics, sound effects, editing tools, workflows",
        "iPhone toggles flipping on as I name each field",
        "A productivity graph that tops out on the word",
        "A **3D screen** with “just a prompt?” crossed out",
        "A **3D stack** ticking off skills, proper instructions, step-by-step",
        "B-roll from my words: “no waste” on tokens, “edited fully in Claude”",
        "Captions in Malayalam and English, key words in my orange, and sounds from my own packs on every beat",
      ],
    },
    practices: [
      "**Brand first.** Make the brand sheet before the first video. It's the difference between a good edit and *your* edit.",
      "**Rate your sounds once.** ⭐ and 🚫 on the Sound Board save you a note on every video.",
      "**Review on the storyboard, not in chat.** A note on the exact item beats describing a timestamp.",
      "**Point to your words.** “When I say X” lands on the exact frame. “Around 30 seconds” doesn't.",
      "**Press Submit.** Ratings save as you click, but Claude only acts on a submitted round. Clicking a rating that's already selected clears it.",
      "**Only your own pictures and sounds.** If a picture shows someone else's work, say so. Claude won't place it where it looks like yours.",
      "**Keep what works.** Say “add this to my brand” and the next video starts from it.",
    ],
    troubleshooting: [
      ["Captions early or late", "“Captions are off on the words <words>. Re-time them against my voice.”"],
      ["Sound and picture drift apart", "“Audio and video are out of sync after <time>. Measure and fix it.”"],
      ["A graphic covers my face or the captions", "“At <time>, <graphic> covers my face. Move it.”"],
      ["An effect waits for pictures", "Add them to the folder it named and reply `added`, or reply `skip this effect`"],
      ["The colour looks off", "Rate the colour item Maybe, or open the Colour Lab"],
      ["No music", "Add a track to `public/music/`, or rate the music gap Drop"],
    ],
    closing: "That's it. Film, drop in the take, describe the edit, rate the storyboard.",
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
