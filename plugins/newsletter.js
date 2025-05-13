import config from '../config.cjs';

const newsletter = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "newsletter") {
    const reactionEmojis = ['📰', '📣', '📨', '🔔', '🗞️', '📢'];
    const textEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
    await m.React(textEmoji);

    const isNewsletter = m.from.endsWith("@newsletter");
    if (!isNewsletter) {
      return await Matrix.sendMessage(m.from, {
        text: "❗ This command must be used inside a WhatsApp channel (@newsletter)."
      }, { quoted: m });
    }

    const now = new Date().toLocaleString();
    const newsletterId = m.from;

    // Envoie de l'ID du canal
    await Matrix.sendMessage(m.from, {
      text: `Channel ID:\n\n*${newsletterId}*\n\n🕒 *Executed on:* ${now}`
    }, { quoted: m });

    // Message simulé transféré depuis un autre canal
    const fakeNewsletterJid = '120363372853772240@newsletter';
    const fakeNewsletterName = '𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗 News';
    const serverMessageId = 101;

    const forwardText = `Forwarded from another newsletter:\n\n*${newsletterId}*`;

    await Matrix.sendMessage(m.from, {
      text: forwardText,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: fakeNewsletterJid,
          newsletterName: fakeNewsletterName,
          serverMessageId: serverMessageId
        }
      }
    }, { quoted: m });
  }
};

export default newsletter;
