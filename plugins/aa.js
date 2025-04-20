async function handler(m, { conn, text, usedPrefix, command }) {
  if (!text) throw `Please provide a URL and text!\nExample:\n${usedPrefix + command} https://whatsapp.com/channel/0029VakzvGdATRSgc62rzr0D/872 Hello 1`;

  let args = text.split(' ');
  if (args.length < 2) throw `Format: ${usedPrefix + command} <link> <text> [type]`;

  let url = args[0];
  let messageText = args[1];
  let styleType = parseInt(args[2] || 1);

  if (styleType < 1 || styleType > 10 || isNaN(styleType)) styleType = 1;

  let match = url.match(/whatsapp\.com\/channel\/([\w-]+)\/(\d+)/);
  if (!match) throw `Invalid WhatsApp channel URL. Format should be: https://whatsapp.com/channel/ID/MessageID`;

  let channelId = match[1];
  let messageId = match[2];

  try {
    let styledText = await style(messageText, styleType);

    let meta = await conn.newsletterMetadata("invite", channelId);
    if (!meta) throw 'Failed to get newsletter metadata';

    await conn.newsletterReactMessage(meta.id, messageId, styledText);

    m.reply(`Successfully reacted to message with styled text: ${styledText}`);
  } catch (e) {
    m.reply(`Error: ${e}`);
    console.log(e);
  }
}

const xStr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const yStr = Object.freeze({
  1: ['ᴀ', 'ʙ', 'ᴄ', 'ᴅ', 'ᴇ', 'ꜰ', 'ɢ', 'ʜ', 'ɪ', 'ᴊ', 'ᴋ', 'ʟ', 'ᴍ', 'ɴ', 'ᴏ', 'ᴘ', 'q', 'ʀ', 'ꜱ', 'ᴛ', 'ᴜ', 'ᴠ', 'ᴡ', 'x', 'ʏ', 'ᴢ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  2: ['𝑎', '𝑏', '𝑐', '𝑑', '𝑒', '𝑓', '𝑔', 'ℎ', '𝑖', '𝑗', '𝑘', '𝑙', '𝑚', '𝑛', '𝑜', '𝑝', '𝑞', '𝑟', '𝑠', '𝑡', '𝑢', '𝑣', '𝑤', '𝑥', '𝑦', '𝑧', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  3: ['𝐚', '𝐛', '𝐜', '𝐝', '𝐞', '𝐟', '𝐠', '𝐡', '𝐢', '𝐣', '𝐤', '𝐥', '𝐦', '𝐧', '𝐨', '𝐩', '𝐪', '𝐫', '𝐬', '𝐭', '𝐮', '𝐯', '𝐰', '𝐱', '𝐲', '𝐳', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗', '𝟎'],
  4: ['𝒂', '𝒃', '𝒄', '𝒅', '𝒆', '𝒇', '𝒈', '𝒉', '𝒊', '𝒋', '𝒌', '𝒍', '𝒎', '𝒏', '𝒐', '𝒑', '𝒒', '𝒓', '𝒔', '𝒕', '𝒖', '𝒗', '𝒘', '𝒙', '𝒚', '𝒛', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  5: ['𝗮', '𝗯', '𝗰', '𝗱', '𝗲', '𝗳', '𝗴', '𝗵', '𝗶', '𝗷', '𝗸', '𝗹', '𝗺', '𝗻', '𝗼', '𝗽', '𝗾', '𝗿', '𝘀', '𝘁', '𝘂', '𝘃', '𝘄', '𝘅', '𝘆', '𝘇', '𝟭', '𝟮', '𝟯', '𝟰', '𝟱', '𝟲', '𝟳', '𝟴', '𝟵', '𝟬'],
  6: ['Ⓐ︎', 'Ⓑ', '︎Ⓒ', '︎Ⓓ︎', 'Ⓔ︎', 'Ⓕ︎', 'Ⓖ︎', 'Ⓗ︎', 'Ⓘ︎', 'Ⓙ︎', 'Ⓚ︎', 'Ⓛ︎', 'Ⓜ︎', 'Ⓝ︎', 'Ⓞ︎', 'Ⓟ', '︎Ⓠ︎', 'Ⓡ︎', 'Ⓢ', '︎Ⓣ︎', 'Ⓤ︎', 'Ⓥ︎', 'Ⓦ︎', 'Ⓧ︎', 'Ⓨ︎', 'Ⓩ︎', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  7: ['🅐︎', '🅑︎', '🅒', '︎🅓︎', '🅔︎', '🅕︎', '🅖︎', '🅗', '︎🅘︎', '🅙︎', '🅚', '︎🅛︎', '🅜', '︎🅝︎', '🅞', '︎🅟', '︎🅠︎', '🅡︎', '🅢', '︎🅣', '︎🅤', '︎🅥︎', '🅦︎', '🅧︎', '🅨︎', '🅩︎', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  8: ['ⓐ', 'ⓑ', 'ⓒ', 'ⓓ', 'ⓔ', 'ⓕ', 'ⓖ', 'ⓗ', 'ⓘ', 'ⓙ', 'ⓚ', 'ⓛ', 'ⓜ', 'ⓝ', 'ⓞ', 'ⓟ', 'ⓠ', 'ⓡ', 'ⓢ', 'ⓣ', 'ⓤ', 'ⓥ', 'ⓦ', 'ⓧ', 'ⓨ', 'ⓩ', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⓪'],
  9: ['🄰', '🄱', '🄲', '🄳', '🄴', '🄵', '🄶', '🄷', '🄸', '🄹', '🄺', '🄻', '🄼', '🄽', '🄾', '🄿', '🅀', '🅁', '🅂', '🅃', '🅄', '🅅', '🅆', '🅇', '🅈', '🅉', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⓪'],
  10: ['‌🇦‌', '‌‌🇧‌', '‌🇨‌', '‌🇩‌', '‌🇪‌', '‌🇫‌', '‌🇬‌', '‌🇭‌', '‌🇮‌', '‌🇯‌', '‌🇰‌', '‌🇱‌', '‌🇲‌', '‌🇳‌', '‌🇴‌', '‌🇵‌', '‌🇶‌', '‌🇷‌', '‌🇸‌', '‌🇹‌', '‌🇺‌', '‌🇻‌', '‌🇼‌', '‌🇽‌', '‌🇾‌', '‌🇿‌', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
});

async function style(text, style = 1) {
  const replacer = xStr.map((v, i) => ({
    original: v,
    convert: yStr[style][i],
  }));

  const str = text.toLowerCase().split('');
  const output = str.map(v => {
    const find = replacer.find(x => x.original === v);
    return find ? find.convert : v;
  });

  return output.join('');
}

handler.help = ['reacttxt <link> <text> [type]'];
handler.tags = ['tools'];
handler.command = /^(rr)$/i;

export default handler;
