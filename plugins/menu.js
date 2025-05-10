import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../config.cjs';
import axios from 'axios';

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Africa/Nairobi").format("HH:mm:ss");
const xdate = moment.tz("Africa/Nairobi").format("DD/MM/YYYY");
const time2 = moment().tz("Africa/Nairobi").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const menu = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const mode = config.MODE === 'public' ? 'public' : 'private';
  const pref = config.PREFIX;

  const validCommands = ['list', 'help', 'menu'];

  if (validCommands.includes(cmd)) {
    const mainMenu = `
╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
┃✪╭──────────────
┃✪│ Owner : *${config.OWNER_NAME}*
┃✪│ User : *${m.pushName}*
┃✪│ Baileys : *Multi Device*
┃✪│ Type : *NodeJs*
┃✪│ Mode : *${mode}*
┃✪│ Platform : *${os.platform()}*
┃✪│ Prefix : [${prefix}]
┃✪│ Version : *3.1.0*
┃✪╰──────────────
╰━━━━━━━━━━━━━━━┈⊷

> ${pushwish} *${m.pushName}*!

╭━━〔 *Menu List* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• ❶. Download Menu      
┃✮┃• ❷. Converter Menu        
┃✮┃• ❸. AI Menu  
┃✮┃• ❹. Tools Menu  
┃✮┃• ❺. Group Menu 
┃✮┃• ❻. Search Menu   
┃✮┃• ❼. Main Menu
┃✮┃• ❽. Owner Menu 
┃✮┃• ❾. Stalk Menu     
┃✮┃• update
┃✮└───────────┈⊷
╰──────────────┈⊷
> *Reply with the number (1-9)*`;

    // Function to get menu image
    const getMenuImage = async () => {
      if (config.MENU_IMAGE && config.MENU_IMAGE.trim() !== '') {
        try {
          const response = await axios.get(config.MENU_IMAGE, { responseType: 'arraybuffer' });
          return Buffer.from(response.data, 'binary');
        } catch (error) {
          console.error('Error fetching menu image from URL, falling back to local image:', error);
          return fs.readFileSync('https://files.catbox.moe/p9aqqe.jpg');
        }
      } else {
        return fs.readFileSync('https://files.catbox.moe/p9aqqe.jpg');
      }
    };

    const menuImage = await getMenuImage();

    const sentMessage = await Matrix.sendMessage(m.from, {
      image: menuImage,
      caption: mainMenu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363397722863547@newsletter',
          newsletterName: "PROFESSEUR",
          serverMessageId: 143
        }
      }
    }, {
      quoted: m
    });

    // Send audio after sending the menu
    await Matrix.sendMessage(m.from, {
      audio: { url: 'https://files.catbox.moe/zvajiw.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });

    // Set up listener for menu selection
    Matrix.ev.on('messages.upsert', async (event) => {
      const receivedMessage = event.messages[0];
      if (!receivedMessage?.message?.extendedTextMessage) return;

      const receivedText = receivedMessage.message.extendedTextMessage.text.trim();
      if (receivedMessage.message.extendedTextMessage.contextInfo?.stanzaId !== sentMessage.key.id) return;

      let menuResponse;
      let menuTitle;
      
      switch (receivedText) {
        case "1":
          menuTitle = "Download Menu";
          menuResponse = `
╭━━〔 *Download Menu* 〕━━┈⊷
┃✯╭─────────────·๏
┃✮┃• apk
┃✮┃• facebook
┃✮┃• mediafire
┃✮┃• pinterestdl
┃✮┃• gitclone
┃✮┃• gdrive
┃✮┃• insta
┃✮┃• ytmp3
┃✮┃• ytmp4
┃✮┃• play
┃✮┃• song
┃✮┃• video
┃✮┃• ytmp3doc
┃✮┃• ytmp4doc
┃✮┃• tiktok
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "2":
          menuTitle = "Converter Menu";
          menuResponse = `
╭━━〔 *Converter Menu* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• attp
┃✮┃• attp2
┃✮┃• attp3
┃✮┃• ebinary
┃✮┃• dbinary
┃✮┃• emojimix
┃✮┃• mp3
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "3":
          menuTitle = "AI Menu";
          menuResponse = `
╭━━〔 *AI Menu* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• ai
┃✮┃• bug
┃✮┃• report
┃✮┃• gpt
┃✮┃• dalle
┃✮┃• remini
┃✮┃• gemini
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "4":
          menuTitle = "Tools Menu";
          menuResponse = `
╭━━〔 *Tools Menu* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• calculator
┃✮┃• tempmail
┃✮┃• checkmail
┃✮┃• trt
┃✮┃• tts
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "5":
          menuTitle = "Group Menu";
          menuResponse = `
╭━━〔 *Group Menu* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• linkgc
┃✮┃• setppgc
┃✮┃• setname
┃✮┃• setdesc
┃✮┃• group
┃✮┃• gcsetting
┃✮┃• welcome
┃✮┃• add
┃✮┃• kick
┃✮┃• kickall
┃✮┃• promote
┃✮┃• promoteall
┃✮┃• demote
┃✮┃• demoteall
┃✮┃• hidetag
┃✮┃• tagall
┃✮┃• antilink
┃✮┃• antitoxic
┃✮┃• getbio
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "6":
          menuTitle = "Search Menu";
          menuResponse = `
╭━━〔 *Search Menu* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• play
┃✮┃• yts
┃✮┃• imdb
┃✮┃• google
┃✮┃• gimage
┃✮┃• pinterest
┃✮┃• wallpaper
┃✮┃• wikimedia
┃✮┃• ytsearch
┃✮┃• ringtone
┃✮┃• lyrics
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "7":
          menuTitle = "Main Menu";
          menuResponse = `
╭━━〔 *Main Menu* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• ping
┃✮┃• alive
┃✮┃• owner
┃✮┃• menu
┃✮┃• infobot
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "8":
          menuTitle = "Owner Menu";
          menuResponse = `
╭━━〔 *Owner Menu* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• join
┃✮┃• leave
┃✮┃• block
┃✮┃• unblock
┃✮┃• setppbot
┃✮┃• anticall
┃✮┃• setstatus
┃✮┃• setnamebot
┃✮┃• autotyping
┃✮┃• alwaysonline
┃✮┃• autoread
┃✮┃• autosview
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "9":
          menuTitle = "Stalk Menu";
          menuResponse = `
╭━━〔 *Stalk Menu* 〕━━┈⊷
┃✮╭─────────────·๏
┃✮┃• truecaller
┃✮┃• instastalk
┃✮┃• githubstalk
┃✮└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        default:
          menuTitle = "Invalid Choice";
          menuResponse = "*Invalid Reply Please Reply With A Number Between 1 to 9*";
      }

      // Format the full response with title and description
      const fullResponse = `
╭━━━〔 *${config.BOT_NAME} - ${menuTitle}* 〕━━━┈⊷
┃✪╭──────────────
┃✪│• Owner : *${config.OWNER_NAME}*
┃✪│• User : *${m.pushName}*
┃✪│• Prefix : [${prefix}]
┃✪│• Version : *3.1.0*
┃✪╰──────────────
╰━━━━━━━━━━━━━━━┈⊷

${menuResponse}

> *${config.DESCRIPTION}*`;

      // Send the response with image and context info
      await Matrix.sendMessage(m.from, {
        image: menuImage,
        caption: fullResponse,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363397722863547@newsletter',
            newsletterName: "PROFESSEUR",
            serverMessageId: 143
          }
        }
      }, {
        quoted: receivedMessage
      });
    });
  }
};

export default menu;
            
