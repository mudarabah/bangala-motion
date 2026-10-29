// All timing for the video, in seconds. Every value is a word START time from
// public/transcript.json (ElevenLabs), with the word in a comment.
// To fix sync, change one number here. Generated from the transcript — do not guess times.
//
// The voiceover file says the same script twice; only the first time is used (see voiceEnd).

export const partA = {
  import: {
    start: 0.16, // "আমরা"
    sorasori: 0.46, // "সরাসরি"
    chin: 1.26, // "চীন"
    theke: 1.56, // "থেকে"
    fashion: 2.02, // "fashion"
    amdani: 3.10, // "আমদানি"
    bangladesh: 4.36, // "বাংলাদেশে"
    khuchra: 5.24, // "খুচরা"
    paikari: 5.94, // "পাইকারি"
    bikri: 6.86, // "বিক্রি"
  },
  profit: {
    start: 7.98, // "ব্যবসা"
    munafa: 9.06, // "মুনাফার"
    nirdharito: 9.62, // "নির্ধারিত"
    ongsho: 10.46, // "অংশ"
    murabaha: 11.26, // "মুরাবাহা"
    biniyogkari: 12.94, // "বিনিয়োগকারীদের"
    share: 14.14, // "শেয়ার"
  },
  company: {
    start: 15.58, // "মুদারাবা"
    trade: 16.20, // "ট্রেড"
    limited: 16.48, // "লিমিটেড"
    sorkar: 17.20, // "সরকার"
    kortrik: 17.64, // "কর্তৃক"
    nibondhito: 18.08, // "নিবন্ধিত"
    privateLtd: 19.14, // "Private"
  },
  transparency: {
    start: 21.08, // "বিনিয়োগের"
    sscchota: 21.64, // "স্বচ্ছতা"
    apnar: 23.34, // "আপনার"
    somoporiman: 24.32, // "সমপরিমাণ"
    cheque: 25.44, // "চেক"
    tinshoto: 27.14, // "তিনশত"
    stamp: 28.00, // "স্ট্যাম্পে"
    company: 28.72, // "কোম্পানির"
    likhito: 30.48, // "লিখিত"
    sompadon: 31.30, // "সম্পাদন"
  },
  bank: {
    start: 32.78, // "এছাড়া"
    biniyog: 33.32, // "বিনিয়োগের"
    sompurno: 33.92, // "সম্পূর্ণ"
    lenden: 34.54, // "লেনদেন"
    bank: 35.84, // "ব্যাংক"
    protiti: 38.72, // "প্রতিটি"
    record: 40.50, // "record"
  },
  details: {
    start: 41.90, // "বিনিয়োগের"
    biboron: 42.48, // "বিবরণ,"
    sorbonimno: 43.56, // "সর্বনিম্ন"
    pochish: 44.92, // "পঁচিশ"
    meyad: 46.96, // "মেয়াদ"
    chhoy: 47.76, // "ছয়"
    noy: 48.80, // "নয়"
    baro: 49.82, // "বারো"
  },
  payout: {
    start: 51.08, // "মুনাফা"
    prodan: 51.52, // "প্রদান,"
    murabaha: 52.32, // "মুরাবাহা"
    proti: 54.56, // "প্রতি"
    dosh: 55.34, // "দশ"
    sheyar: 57.04, // "শেয়ারের"
    satsho: 58.06, // "সাতশো"
    taka: 59.04, // "টাকা"
  },
  principal: {
    start: 60.52, // "মেয়াদ"
    sheshe: 60.90, // "শেষে"
    biniyog: 61.32, // "বিনিয়োগের"
    mul: 61.94, // "মূল"
    sompurno: 62.90, // "সম্পূর্ণ"
    ferot: 63.66, // "ফেরত"
  },
  security: {
    start: 65.40, // "বিনিয়োগের"
    nirapotta: 65.96, // "নিরাপত্তার"
    document: 67.66, // "document"
    d1: 69.48, // "এক,"
    d1Item: 71.88, // "চেক।"
    d2: 72.70, // "দুই,"
    d2Item: 75.20, // "চুক্তিপত্র।"
    d3: 76.30, // "তিন,"
    d3Item: 77.54, // "trade"
    d4: 79.18, // "চার,"
    d4Item: 80.38, // "TIN"
    d5: 82.08, // "পাঁচ,"
    d5Item: 83.32, // "registration"
  },
  address: {
    start: 85.74, // "আমাদের"
    joint: 86.70, // "Joint"
    nibondhito: 87.60, // "নিবন্ধিত"
    thikana: 89.94, // "ঠিকানা"
    haji: 90.68, // "হাজী"
    nichtola: 92.38, // "নিচতলা,"
    borobari: 93.30, // "বড়বাড়ি"
    tongi: 94.72, // "টঙ্গী,"
    gazipur: 95.56, // "গাজীপুর।"
  },
};

export type Timeline = typeof partA;

// Last spoken word: "গাজীপুর" at 95.56 s.
export const lastWord = 95.56;
// The voiceover is cut here, in the pause (96.22–96.54 s) before the script repeats.
export const voiceEnd = 96.3;
export const tail = 1; // extra second after the audio
