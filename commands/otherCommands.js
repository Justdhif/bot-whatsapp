const { createResponse } = require("../utils/createResponse");
const { getGreeting } = require("../utils/getGreeting");
const { database } = require("../database/database");
const { financeDB } = require("../database/financeDB");
const { noteDB } = require("../database/noteDB");
const { reminderDB } = require("../database/reminderDB");

module.exports = {
  handleMenuCommand: async (msg) => {
    const greeting = getGreeting();
    const menuContent = createResponse(
      "MENU",
      `📌 *Pilih Command Cepat:*\n\n` +
        `1 📜 Lihat Data (!list)\n` +
        `2 📝 Lihat Catatan (!note)\n` +
        `3 💰 Cek Saldo (!balance)\n` +
        `4 ⏰ Lihat Reminder (!reminders)`
    );

    // Kirim pesan teks biasa
    await msg.reply(`${greeting}${menuContent}`);
  },

  handleHelpCommand: (msg) => {
    const greeting = getGreeting();
    const helpContent = createResponse(
      "HELP",
      `📌 *Command Database:*\n` +
        ` 🔑 \`!set <key>\` - Simpan data\n` +
        ` 🔑 \`!get <key>\` - Ambil data\n` +
        ` 🔑 \`!edit <key>\` - Edit data\n` +
        ` 🔑 \`!delete <key>\` - Hapus data\n` +
        ` 🔑 \`!list\` - Lihat semua data\n\n` +
        `📌 *Command Note:*\n` +
        ` 📝 \`!note\` - Lihat semua note\n` +
        ` 📝 \`!setnote <key>\` - Simpan note\n` +
        ` 📝 \`!getnote <key>\` - Ambil note\n` +
        ` 📝 \`!editnote <key>\` - Edit note\n` +
        ` 📝 \`!deletenote <key>\` - Hapus note\n\n` +
        `📌 *Command Keuangan:*\n` +
        ` 💰 \`!income <jumlah> <deskripsi>\` - Tambah pemasukan\n` +
        ` 💰 \`!expense <jumlah> <deskripsi>\` - Tambah pengeluaran\n` +
        ` 💰 \`!balance\` - Lihat saldo\n` +
        ` 💰 \`!report\` - Unduh laporan keuangan\n` +
        ` 💰 \`!deletefinance <income/expense> <index>\` - Hapus data keuangan\n\n` +
        `📌 *Command Reminder:*\n` +
        ` ⏰ \`!remind <tanggal> <bulan> <tahun> <jam> <menit> <pesan>\` - Atur reminder\n` +
        ` ⏰ \`!reminders\` - Lihat daftar reminder\n` +
        ` ⏰ \`!deletereminder <ID>\` - Hapus reminder\n\n` +
        `📌 *Lainnya:*\n` +
        ` ℹ️ \`!info\` - Info bot\n` +
        ` 📤 \`!feedback\` - Kirim feedback\n` +
        ` 🗑️ \`!resetall\` - Reset semua data`
    );
    msg.reply(`${greeting}${helpContent}`);
  },

  handleInfoCommand: (msg) => {
    const greeting = getGreeting();
    const infoContent = createResponse(
      "INFO",
      `🤖 Hai perkenalkan aku adalah JustBot yang dirancang untuk kebutuhan MPK OSIS.\n` +
        `Aku berfungsi untuk menyimpan segala keperluan mulai dari jobdesk setiap event, catatan hasil eval, dan lain-lain.\n` +
        `Kalian bisa ketik \`!help\` untuk melihat detailnya.\n` +
        `Jam kerja bot sudah diatur mulai dari jam 5.00 sampai 10.00 WIB.\n` +
        `Selamat mencoba! ✨`
    );
    msg.reply(`${greeting}${infoContent}`);
  },

  handleFeedbackCommand: (msg) => {
    const greeting = getGreeting();
    const googleFormLink = "https://bot-advice.netlify.app/";
    msg.reply(
      `${greeting}${createResponse(
        "FEEDBACK",
        `📝 *Terima kasih atas ketertarikan Anda memberikan feedback!*\n\n` +
          `Silakan isi formulir di sini untuk memberikan saran atau masukan:\n${googleFormLink}`
      )}`
    );
  },

  handleResetAllCommand: (msg) => {
    const greeting = getGreeting();
    Object.keys(database).forEach((key) => delete database[key]);
    Object.keys(noteDB).forEach((key) => delete noteDB[key]);
    financeDB.income = [];
    financeDB.expenses = [];
    reminderDB.length = 0;

    msg.reply(
      `${greeting}${createResponse(
        "RESET ALL",
        "🗑️ *Semua data (database, note, keuangan, dan reminder) berhasil direset!* ✨"
      )}`
    );
  },
};
