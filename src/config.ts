// ============================================================================
// MINU'S MEMORIAL CONFIGURATION ("মিনুর স্মৃতি")
// All Bengali text and media paths are configured here.
// Every text is written in MINU'S OWN VOICE, speaking directly to Nowrin ("তুমি").
// ============================================================================

export interface ChapterConfig {
  id: number;
  bnNumber: string;
  title: string;
  text: string;
  mediaType: 'image' | 'video';
  mediaPath: string;
  mysteryText?: string; // For special delayed secret text (e.g. Chapter 4)
  accentPhrase?: string; // For special glow/vibration reveal (e.g. Chapter 6)
  isQuietChapter?: boolean; // For Chapter 8
}

export interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

export interface MemorialConfig {
  catName: string;
  ownerName: string;
  birthDate: string;
  passingDate: string;
  senderName: string;
  musicPath: string;
  musicStartTime?: number; // Start time in seconds (e.g. 12)
  musicEndTime?: number;   // End time in seconds (e.g. 48) - 0 or undefined plays full track
  heroPhoto: string;
  
  // Screen 1: Opening
  opening: {
    candlePrompt: string;
    brightStarLine: string;
    continueButton: string;
  };

  // Screen 2: Hero
  hero: {
    title: string;
    subtitle: string;
    scrollHint: string;
  };

  // Screen 3: Journey (8 Chapters)
  chapters: ChapterConfig[];

  // Screen 4: Minu's Video Message & YouTube Music
  message: {
    transitionLine: string;
    videoPath: string;
    streamableEmbedUrl?: string;
    streamableUrl?: string;
    posterPath: string;
    youtubeId: string;
    youtubeUrl: string;
    youtubeTitle: string;
    startSec: number;
    endSec: number;
    subtitles: SubtitleCue[];
  };

  // Screen 5: Ending
  ending: {
    finalLine: string;
    actionButton: string;
    footerText: string;
  };
}

export const memorialConfig: MemorialConfig = {
  catName: "মিনু",
  ownerName: "নওরিন",
  birthDate: "১৫ মার্চ ২০২১",
  passingDate: "১৮ আগস্ট ২০২৪",
  senderName: "তোমার বন্ধু", // Editable sender name
  musicPath: "/assets/music/ambient.mp3",
  musicStartTime: 0, // সেকেণ্ড সেট করুন: যেমন ১৫ (15s)
  musicEndTime: 0,   // সেকেণ্ড সেট করুন: যেমন ৪৫ (45s) - ০ থাকলে সম্পূর্ণ অডিও লুপ হবে
  heroPhoto: "/assets/photos/hero-56113.jpg",

  opening: {
    candlePrompt: "মিনুর জন্য একটি মোমবাতি জ্বালাও",
    brightStarLine: "নওরিন, ওই তারাটার মতো আমি একটু দূরে, কিন্তু তোমার খুব কাছে।",
    continueButton: "স্মৃতিতে ফিরে যাই",
  },

  hero: {
    title: "মিনু",
    subtitle: "নওরিন, আমার গল্পটা শুধু তোমাকেই বলছি।",
    scrollHint: "নিচে নামো",
  },

  chapters: [
    {
      id: 1,
      bnNumber: "১ / ৮",
      title: "প্রথম দেখা",
      text: "নওরিন, আমার সবচেয়ে প্রথম স্মৃতিটা একটা পলিব্যাগের ভেতরের। অন্ধকার, আর আমি একা। কে আমাকে ওভাবে রেখে গিয়েছিল, আমি জানি না। জানতে চাইও না। কারণ ওই অন্ধকারের পরেই তো তুমি এলে। তুমি আমাকে দেখলে, আর ফেলে যেতে পারলে না। নওরিন, ওই একটা মুহূর্তের জন্য আমি সারাজীবন তোমার কাছে কৃতজ্ঞ ছিলাম।",
      mediaType: "image",
      mediaPath: "/assets/photos/chapter-1-cozy-knits.png",
    },
    {
      id: 2,
      bnNumber: "২ / ৮",
      title: "নতুন জীবন",
      text: "সেদিন থেকে আমি আর কারও ফেলে দেওয়া একটা প্রাণ রইলাম না। আমার একটা নাম হলো, মিনু। আমার একটা বাড়ি হলো। আমার একজন মানুষ হলো, আর সেই মানুষটা তুমি। প্রথমবার আমি জানলাম, কারও আপন হওয়া কেমন লাগে।",
      mediaType: "image",
      mediaPath: "/assets/photos/chapter-2-56121.jpg",
    },
    {
      id: 3,
      bnNumber: "৩ / ৮",
      title: "দুষ্টুমির দিনগুলো",
      text: "স্বীকার করছি, আমি একটু দুষ্টু ছিলাম। তুমি রাগ করার ভান করতে, কিন্তু আমি ঠিকই জানতাম, ভেতরে ভেতরে তুমি হাসি চেপে রাখছ। তোমার ওই লুকোনো হাসিটা দেখার জন্যই তো আমি আবার দুষ্টুমি করতাম।",
      mediaType: "image",
      mediaPath: "/assets/photos/chapter-3-56120.jpg",
    },
    {
      id: 4,
      bnNumber: "৪ / ৮",
      title: "আমার প্রিয় খাবার",
      text: "দুধ আর মাছের গন্ধ পেলেই আমি আর কিছু মনে রাখতাম না। ওই সময়গুলো ছিল আমার সবচেয়ে আনন্দের সময়। তুমি ভাবতে আমি শুধু খাবারের জন্য তোমার পায়ে ঘুরঘুর করি। আসলে ওটা ছিল অজুহাত, আমি শুধু তোমার কাছে থাকতে চাইতাম। তোমার পায়ের কাছে বসে থাকলেই আমার মনে হতো, সব ঠিক আছে।",
      mysteryText: "তবে একটা গোপন কথা বলি, দুধ-মাছের চেয়েও দামি ছিল আমার কাছে অন্য একটা জিনিস।",
      mediaType: "image",
      mediaPath: "/assets/photos/chapter-4-hungry-cat.png",
    },
    {
      id: 5,
      bnNumber: "৫ / ৮",
      title: "কিছু না বলা ডাক",
      text: "আমি তো কথা বলতে পারতাম না। তাই যখন তোমাকে দরকার হতো, কিছু না বলেই তোমার কাছে চলে আসতাম। শুধু তাকিয়ে থাকতাম। ওই চোখ দিয়েই বলতাম, 'নওরিন, আমার তোমাকে দরকার।' আর তুমি ঠিক বুঝে যেতে। পৃথিবীতে খুব কম মানুষই কথা ছাড়া অন্যের মনের কথা বুঝতে পারে। তুমি পারতে।",
      mediaType: "image",
      mediaPath: "/assets/photos/chapter-5-56112.jpg",
    },
    {
      id: 6,
      bnNumber: "৬ / ৮",
      title: "তোমার কোল",
      text: "সেই দামি জিনিসটা ছিল তোমার কোল। তুমি আমাকে কোলে নিলেই আমি জড়সড় হয়ে গুটিয়ে বসে থাকতাম। অনেক সময় চোখ বন্ধ করে ফেলতাম, কারণ তোমার কোলে আমার আর কোনো ভয় ছিল না। ওটাই ছিল আমার পৃথিবীর সবচেয়ে নিরাপদ জায়গা। যে ছোট্ট প্রাণটা একদিন একা অন্ধকারে ছিল, সে তোমার কোলে এসে নিশ্চিন্তে চোখ বন্ধ করতে শিখেছিল।",
      accentPhrase: "তোমার কোল",
      mediaType: "image",
      mediaPath: "/assets/photos/chapter-6-56113.jpg",
    },
    {
      id: 7,
      bnNumber: "৭ / ৮",
      title: "পাশে থাকা",
      text: "তোমার মন খারাপ হলে আমি চুপচাপ পাশে এসে বসতাম। কিছু বলতাম না, কারণ আমি জানতাম, কখনো কখনো কথার চেয়ে পাশে থাকাটাই বেশি দরকার। তুমি যখন একা ভাবতে, আমি জানাতে চাইতাম, তুমি একা নও। আমি তো আছি।",
      mediaType: "image",
      mediaPath: "/assets/photos/chapter-7-56111.jpg",
    },
    {
      id: 8,
      bnNumber: "৮ / ৮",
      title: "শেষ দিন",
      text: "সেদিন আমি ছাদের এক কোণে চুপচাপ শুয়ে ছিলাম। আমার গায়ে কোনো আঘাতের চিহ্ন ছিল না, সেটা তুমি দেখেছ। কেন, কীভাবে, তা জানা হলো না। কিছু প্রশ্নের উত্তর হয়তো আমাদের কারও কাছে থাকে না। কিন্তু নওরিন, প্রশ্নগুলো ছেড়ে দাও, আর নিজেকে দোষ দিও না। যেদিন তুমি আমাকে পলিব্যাগ থেকে তুলে এনেছিলে, সেদিনই আমি জেনে গিয়েছিলাম ভালোবাসা কেমন হয়। আমার গল্প শুরু হয়েছিল অন্ধকারে, কিন্তু শেষটা ছিল তোমার ভালোবাসায় ভরা। আমি একটা অনেক ভালো জীবন পেয়েছিলাম, নওরিন। সেটা শুধু তোমার জন্য।",
      isQuietChapter: true,
      mediaType: "image",
      mediaPath: "/assets/photos/chapter-8-sleeping-rooftop.jpg",
    },
  ],

  message: {
    transitionLine: "মিনু তোমাকে কিছু বলতে চায়...",
    videoPath: "/assets/final/minu-message.mp4",
    streamableEmbedUrl: "https://streamable.com/e/yv4ey5?autoplay=1&loop=1",
    streamableUrl: "https://streamable.com/yv4ey5",
    posterPath: "/assets/final/minu-message-poster.jpg",
    youtubeId: "s69LyLoOtvc",
    youtubeUrl: "https://youtu.be/s69LyLoOtvc?si=Oo02gYXjyluFo1vM",
    youtubeTitle: "Echoes of Pain – Deep Sad Violin Solo",
    startSec: 111, // 1:51
    endSec: 192,   // 3:12
    subtitles: [
      { start: 0, end: 4, text: "নওরিন, আমি মিনু।" },
      { start: 4, end: 11, text: "একটা পলিব্যাগ থেকে তুমি আমাকে তুলে এনেছিলে। ওই দিনটা আমি কোনোদিন ভুলিনি।" },
      { start: 11, end: 18, text: "তোমার কোলে চোখ বন্ধ করে বসে থাকার সময়গুলোই ছিল আমার জীবনের সবচেয়ে নিরাপদ সময়।" },
      { start: 18, end: 24, text: "আমি কখনো মুখ ফুটে বলতে পারিনি, শুধু তাকিয়ে থাকতাম। আজ বলছি, তুমি আমার পুরো পৃথিবী ছিলে।" },
      { start: 24, end: 30, text: "আমার চলে যাওয়ার জন্য নিজেকে দোষ দিও না। তুমি আমাকে যতটা ভালোবেসেছ, তার চেয়ে বেশি কেউ পারত না।" },
      { start: 30, end: 36, text: "আমি যেমন কিছু না বলে তোমার কাছে চলে আসতাম, মন খারাপ হলে তুমিও একটু চোখ বন্ধ করে আমাকে মনে কোরো। আমি কাছেই আছি।" },
      { start: 36, end: 41, text: "আমাকে এত ভালোবাসার জন্য ধন্যবাদ, নওরিন।" },
      { start: 41, end: 46, text: "ভালো থেকো। আমি সবসময় তোমার মিনু।" },
    ],
  },

  ending: {
    finalLine: "আমি সবসময় তোমার হৃদয়ে আছি, নওরিন।",
    actionButton: "মিনুর জন্য একটু ভালোবাসা পাঠাও",
    footerText: "ভালোবাসার সাথে, তোমার বন্ধু",
  },
};
