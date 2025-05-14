const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "thanks",
    alias: ["thanksto", "credit"],
    desc: "Affiche les crédits et remerciements",
    category: "main",
    react: "🙏",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const message = `
╭──❍ 🤝 *BIG THANKS TO* ❍───╮

│ HI  @${m.sender.split("@")[0]}

│• DYBY TECH ★

│• DEV PROFESSEUR ★

│• YOU ★

╰─────────────────────────╯
`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/sy6isf.jpg' }, // image stable et illustrative
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender]
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("ThanksTo Error:", err);
        await conn.sendMessage(from, { text: `Une erreur est survenue: ${err.message}` }, { quoted: mek });
    }
});
