require('dotenv').config(); // Load environment variables

const { 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder 
} = require('discord.js');
const cron = require('node-cron');
const { OpenAI } = require('openai');

// Ensure API keys are present
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OpenAI API key is missing!");
    process.exit(1);
}

if (!process.env.DISCORD_TOKEN) {
    console.error("❌ Discord bot token is missing!");
    process.exit(1);
}

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Initialize Discord bot client is eme
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
  console.log(`🚀 Logged in as ${client.user.tag}!`);
});

// Welcome new members
client.on('guildMemberAdd', (member) => {
  const welcomeChannel = client.channels.cache.get('1334548242750373979');
  if (!welcomeChannel) return console.log('Welcome channel not found.');

  const welcomeEmbed = new EmbedBuilder()
    .setColor('#33dec1')
    .setTitle('🌌 Welcome to the Nova Galaxy! 🌟')
    .setDescription(`A new star has arrived — welcome, ${member}! ✨\nShine bright and explore the cosmos!`)
    .addFields(
      { name: '🚀 Get Started:', value: '\u200B' },
      { name: 'Introduce Yourself:', value: 'Head over to <#1334568253753655326> and let us know who you are!', inline: true },
      { name: 'Choose Your Role:', value: 'Visit <#1334553567352193065> to customize your galaxy experience.', inline: true },
      { name: 'Read the Rules:', value: 'Familiarize yourself with <#1334553418681024512> to keep the universe in harmony.', inline: false }
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setImage('https://cdn.discordapp.com/attachments/1334549471350226998/1346360193298075679/novastars.jpg')
    .setFooter({ text: '🌠 May your star shine bright! 🌠' });

  welcomeChannel.send({ content: `🌟 Welcome to the cosmos, ${member}!`, embeds: [welcomeEmbed] }).then(msg => {
    msg.react('🌌');
    msg.react('🚀');
  });
});





// Auto-reply to images with reactions and an embed
const targetChannelId = '1334568160719933491'; // Replace with your actual photo channel ID

const randomReplies = [
  '💃 Strut it, star! That runway has never seen such elegance!',
  '✨ The category is: Serve... and you ATE!',
  '🚀 Out of this world! Your look just launched into the fashion cosmos!',
  '🌠 Fierce, fabulous, flawless — you OWN that runway!',
  '🔥 This galaxy isn’t ready for your cosmic charisma, uniqueness, nerve, and talent!',
  '😍 OMG, you look amazing!! This is a whole vibe!',
  '🔥 Who gave you permission to slay like this??',
  '💖 Nova Behaviour, you are literally serving looks effortlessly!',
  '📸 This is profile pic material, no doubt!',
  '🤩 You ate this up, no crumbs left!',
  '✨ Okay model, I see you!! Vogue is calling!',
  '💯 This? This is what perfection looks like!',
  '😩 Ugh, you’re too pretty, I can’t handle it!',
  '🌟 The glow, the confidence, the ENERGY! Love it!',
  '👑 Bestie, this is ICONIC. I’m saving this in my faves!',
  '😌 Effortlessly stunning, as always!',
  '💃 Yesss, show them how it’s DONE!',
  '📢 Everyone, look at this masterpiece right here!',
  '🥺 Why are you so gorgeous?? I’m jealous!',
  '🙌 10/10, no notes, absolute perfection!',
  '🎨 Giving main character energy, love to see it!',
  '😵‍💫 I just fainted from how good this is!',
  '🫠 Melting because of how GOOD you look!',
  '🌈 Serving beauty, confidence, and a whole lot of slay!',
  '👀 Okay, but where’s my photoshoot invite??',
  '💌 Sending this to NASA because you are a STAR!',
  '🫶 The world is simply not ready for this level of beauty!',
  '🤯 Stop, you didn’t have to pop off like this!!',
  '💥 BOOM! Another serve from you, as expected!',
  '🛑 I need a moment… this is TOO GOOD.',
  '🎭 This is ART. A whole masterpiece!',
  '😤 Bestie, leave some beauty for the rest of us!',
  '💘 Instant wallpaper material, no questions asked.',
  '📸 If looking this good was a crime, you’d be in jail!',
  '🦋 The aura, the energy, the perfection—I’M OBSESSED!',
  '🥂 Cheers to another iconic moment captured!',
  '💨 You just left everyone in the dust with this one!',
  '🔥 Someone call 911, because this is TOO HOT!',
  '😎 Effortlessly cool, as always. Teach me your ways!',
  '🚀 Elevating the whole timeline with this pic!',
  '🧊 Ice cold! The drip is UNMATCHED.',
  '🎬 Main character energy? No, this is MOVIE STAR level!',
  '✨ This? This is what confidence looks like!',
  '🛍️ Giving expensive, giving luxury, giving TOP TIER.',
  '📢 EVERYONE STOP. This is the moment.',
  '🌊 Smooth, fresh, and absolutely breathtaking!',
  '🌍 The world needs to see this IMMEDIATELY!',
  '🕶️ Oh, just casually flexing on us all, huh?',
  '🖼️ Framing this because it belongs in a museum!',
  '🍯 Sweet, stunning, and absolutely golden!',
  '🧙‍♂️ Must be magic because I’m ENCHANTED!',
  '🎇 You light up every picture you take!',
  '📢 This is an official public service announcement: You SNAPPED!',
  '🎶 Beyoncé wrote “Flawless” about you, don’t lie!',
  '📷 New pic, same slay. Never missing!',
  '🍑 Looking GOOD from every angle, period!',
  '🤩 Literally giving “breathtaking” energy!',
  '💎 Rare. Priceless. Iconic. You.',
  '🛸 Extraterrestrial levels of beauty—out of this world!',
  '🌪️ This pic just shook the entire internet!',
  '💡 The lighting, the pose, the EVERYTHING? Chef’s kiss!',
  '👑 Royalty. Absolute royalty. Bowing down.',
  '🌸 So soft, so pretty, so perfect!',
  '💖 Hey Star, you just dropped the pic of the YEAR!',
  '🌟 Another day, another flawless moment from you!',
  '⚡ Electrifying! Your energy JUMPS out of this photo!',
  '🕊️ Pure elegance, no one is doing it like you!',
  '💌 Sending this pic straight to my heart, I LOVE IT!',
  '🥵 This? This is dangerously good!',
  '💃 Striking a pose and owning the moment like a PRO!',
  '🖤 Dark, mysterious, and absolutely captivating!',
  '💫 Shining so bright, I need sunglasses to look at this!',
  '🍷 Classy, sassy, and absolutely legendary!',
  '🤳 Teach me your selfie secrets because WOW!',
  '🫠 Melting at how GOOD this is!',
  '🌈 Pure perfection, as always!',
];

const multiReplies = [
  '📷 A whole collection of SLAYS?! You really didn’t come to play!',
  '👀 Every pic? A serve. You’re unstoppable!',
  '💖 Giving a full editorial moment — every frame is perfection!',
  '✨ Multi-angle beauty unlocked. This is a cosmic photoshoot!',
  '📸 OMG, a whole gallery of iconic energy!',
  '🛸 These pics just teleported me to fashion heaven!',
  '🎬 Main character energy in every. single. shot!',
  '🔥 From every angle? Still a slay. Wow!',
  '📷 A whole album of slay? This is a visual blessing!',
  '📸 Every photo is a *moment* — you’re unstoppable!',
  '👑 A gallery fit for royalty. You’re serving in every shot!',
  '🖼️ Each pic is art. Together? A whole museum exhibit!',
  '💫 A multiverse of looks, and you’re the main star in all of them!',
  '🚀 These pictures just elevated the entire timeline!',
  '🎨 You really said “let me drop a masterpiece collection” huh?',
  '📢 One photo wasn’t enough for all this fabulousness!',
  '🔥 This is what happens when perfection hits burst mode!',
  '🌠 Giving multi-dimensional beauty — you didn’t have to go THAT hard!',
  '🧃 Every pic is dripping with flavor. Iconic.',
  '🎥 You turned the photo gallery into a blockbuster slideshow!',
  '🌈 Each snap is giving a different flavor of fabulous!',
  '🪞Reflections of beauty from every angle. We love to see it!',
  '📷 This is what we call a photo *drop*! You ATE.',
];


client.on('messageCreate', (message) => {
  if (
    message.channel.id === targetChannelId &&
    message.attachments.size > 0 &&
    !message.author.bot
  ) {
    const isMulti = message.attachments.size > 1;
    const replyText = isMulti
      ? multiReplies[Math.floor(Math.random() * multiReplies.length)]
      : randomReplies[Math.floor(Math.random() * randomReplies.length)];

    const userMention = `<@${message.author.id}>`;

    const replyEmbed = new EmbedBuilder()
      .setColor('#33dec1')
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(`${replyText} ${userMention}`)
      .setFooter({ text: '🌟 Keep dazzling us with your art!' });

    message
      .reply({ embeds: [replyEmbed] })
      .then((msg) => {
        msg.react('🫶');
        msg.react('💖');
        msg.react('✨');
      })
      .catch(console.error);
  }
});




// Get the Security-Star channel
const securityStarChannelId = '1345615698390548601'; // Replace with your Security-Star channel ID

client.once('ready', async () => {
  const channel = client.channels.cache.get(securityStarChannelId);
  if (!channel) return console.log('Security-Star channel not found.');

  const embed = new EmbedBuilder()
    .setColor('#d94f41')
    .setTitle('🌌 Welcome to the Galactic Gateway! 🚀')
    .setDescription(
      '✨ Before you can explore the wonders of **ꌗꂦ꒒ꍏꋪ ꌗꉣꍏꉓꍟ ꂦꎇ ꈤꂦꃴꍏ**, we need to confirm you\'re a starborn traveler — not an imposter from the void.\n\n' +
      '**📜 Star Law Verification**\n' +
      'Click the **Verify** button below and complete the cosmic captcha to unlock the universe! 🌠\n\n' +
      '_Once verified, the galaxies of Nova will unfold before you._\n\n' +
      '🌟 **Nova Supreme** watches over this realm — follow the star path!'
    )
    .setThumbnail('https://cdn-longterm.mee6.xyz/plugins/embeds/images/1334544134257508363/c4af5d7b09fe6447d850ae1ce9fc68a10d464b633f167bdaefa778e16324e16f.jpeg')
    .setFooter({ text: '✨ Your cosmic journey begins here!' });

  const verifyButton = new ButtonBuilder()
    .setCustomId('verify')
    .setLabel('🌠 Verify')
    .setStyle(ButtonStyle.Primary);

  const actionRow = new ActionRowBuilder().addComponents(verifyButton);

  await channel.send({ embeds: [embed], components: [actionRow] });
  console.log('Verification message sent.');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'verify') {
    const role = interaction.guild.roles.cache.find(role => role.name === '🚀 Starlets');
    const member = interaction.guild.members.cache.get(interaction.user.id);

    if (!role) {
      return interaction.reply({ content: '🚨 The **Starlet** role was not found. Please contact a Nova Supreme!', ephemeral: true });
    }

    if (!member) {
      return interaction.reply({ content: '⚠️ Unable to verify you at the moment. Please try again later.', ephemeral: true });
    }

    try {
      await member.roles.add(role);
      await interaction.reply({ content: '✅ You have been verified and are now a **Starlet**! Welcome to the **Nova Galaxy**! 🌠', ephemeral: true });
    } catch (error) {
      console.error('Failed to assign role:', error);
      await interaction.reply({ content: '❌ Something went wrong while assigning your role. Please contact a Nova Supreme.', ephemeral: true });
    }
  }
});


// Define bad words to watch for (you can customize this list)
const badWords = ['bitch', 'bobo', 'pangit','obob','shit']; // Add actual words
const cosmiclounge = '1334553960891285605'; // Replace with the channel ID

client.on('messageCreate', async (message) => {
  if (message.author.bot || message.channel.id !== cosmiclounge) return;

  // Check if message contains a bad word
  const foundWord = badWords.some((word) =>
    message.content.toLowerCase().includes(word)
  );

  if (foundWord) {
    const embed = new EmbedBuilder()
  .setColor('#d94f41')
  .setTitle('⚠️ Cosmic Conduct Reminder!')
  .setDescription(
    `Hey **${message.author.username}**! 🌠\n\n` +
    'We noticed some *not-so-stellar* language in your message.\n\n' +
    'Please remember that the **Nova Fam** is a positive and uplifting space. Let’s keep the cosmic vibes friendly! 🌌\n\n' +
    'Repeated violations may result in consequences from the Nova Supreme. 🚀'
  )
  .setFooter({ text: '✨ Let’s keep the galaxy glowing with positivity!' });

await message.reply({ embeds: [embed] });

    console.log(`Warned ${message.author.tag} in ${message.channel.name}`);
  }
});

const levelUpChannelId = '1345759905344262179'; // Level-up channel ID
const arcaneBotId = '1217870452253397082'; // Replace with Arcane-chan's actual bot ID

const levelRewards = {
    1: { badge: 'https://media.discordapp.net/attachments/1334549471350226998/1347140698536804443/Subtitle_2.png', roleId: '1345752822532145194' },
    6: { badge: 'https://media.discordapp.net/attachments/1334549471350226998/1347140697928634420/Subtitle_3.png', roleId: '1345753547416932463' },
    11: { badge: 'https://media.discordapp.net/attachments/1334549471350226998/1347140697299619860/Subtitle_4.png', roleId: '1345753553595011082' },
    16: { badge: 'https://media.discordapp.net/attachments/1334549471350226998/1347140753096445962/badge2.png', roleId: '1345753557483257968' },
    21: { badge: 'https://media.discordapp.net/attachments/1334549471350226998/1347140752622358618/badge1.png', roleId: '1345753561694343219' },
};

client.once('ready', () => {
    console.log(`🚀 Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.channel.id !== levelUpChannelId) return; // Only respond in the level-up channel
    if (message.author.id !== arcaneBotId) return; // Only listen to Arcane-chan's messages

    // Extract user mention and level from Arcane-chan's message
    const levelUpRegex = /Congratulations, (<@!?(\d+)>).*?leveled up to (\d+)/;
    const match = message.content.match(levelUpRegex);

    if (!match) return; // If format is incorrect, ignore

    const userId = match[2];
    const level = parseInt(match[3]);
    const member = await message.guild.members.fetch(userId).catch(() => null);

    if (!member) return; // If user not found, exit

    // Prepare the level-up embed
    const embed = new EmbedBuilder()
        .setColor('#d94f41')
        .setTitle('🌟 Cosmic Ascension! 🌟')
        .setDescription(`✨ Congratulations, ${member}! ✨\n\nYou've **leveled up to Level ${level}** and your star shines even brighter in the **Nova Galaxy**! 🌌\n\nKeep glowing and keep growing — the universe is yours to conquer! 🚀`);

    if (levelRewards[level]) {
        embed.addFields({ name: '🏅 Reward:', value: '🎖️ **New Badge & Role Upgrade** 👑' });
        embed.setImage(levelRewards[level].badge);

        // Assign the role
        const role = message.guild.roles.cache.get(levelRewards[level].roleId);
        if (role) {
            await member.roles.add(role).catch(console.error);
        }
    }

    // Reply to Arcane-chan's level-up message
    message.reply({ embeds: [embed] }).catch(console.error);
});
client.on('messageCreate', async (message) => {
  if (message.content === '!testembed') {
      const embed = new EmbedBuilder()
          .setColor('#d94f41')
          .setTitle('🌟 Cosmic Ascension! 🌟')
          .setDescription(`✨ Congratulations, <@${message.author.id}>! ✨\n\nYou've **leveled up to Level 10** and your star shines even brighter in the **Nova Galaxy**! 🌌\n\nKeep glowing and keep growing — the universe is yours to conquer! 🚀`)
          .setImage('https://media.discordapp.net/attachments/1334549471350226998/1347140698536804443/Subtitle_2.png');
      
      message.channel.send({ embeds: [embed] });
  }
});

const INTRO_CHANNEL_ID = '1334568253753655326';

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channel.id !== INTRO_CHANNEL_ID) return;

    const welcomeMessage = await message.reply(`🚀 Welcome to the Nova Fam! ${message.author} Can’t wait to see you shine! 🌟✨`);
    await welcomeMessage.react('✨'); // Add reactions to the message
    await welcomeMessage.react('🌙'); 
});

const CHANNEL_ID = "1352327865248645191"; // Replace with your actual channel ID

client.once("ready", async () => {
    console.log(`🚀 Logged in as ${client.user.tag}!`);

    // Fetch the channel
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (!channel) {
        console.log("❌ Channel not found! Check if the bot has access.");
        return;
    }

    // First embed: General Info
    const embed1 = new EmbedBuilder()
        .setColor("#4C1D95") // Deep purple galaxy color
        .setTitle("✨🌌 24/7 Cosmic Farming 🌌✨")
        .setDescription(`
𖥔・ **Always open, anytime, anywhere**  
        `)
        // .setImage("https://your-image-url.com/general-info.png") // Replace with an actual image URL
        .setFooter({ text: "☄️ Powered by Solar Space of Nova"});

    // Second embed: Farming Server Links
    const embed2 = new EmbedBuilder()
        .setColor("#6b1991") // Nova's theme color
        .setTitle("✨ Farming Server Links")
        .setDescription("*Click the blue text to open!*")
        .addFields(
          { name: "𖥔・ [🪐 Farming Server 1](<https://www.roblox.com/games/15101393044/Dress-To-Impress-STYLE-SHOWDOWN?privateServerLinkCode=99994808916380617543284492633561>)", value: "\u200B" },
          { name: "𖥔・ [🪐 Farming Server 2](<https://www.roblox.com/games/15101393044/Dress-To-Impress-STYLE-SHOWDOWN?privateServerLinkCode=35927885826186869949392334287974>)", value: "\u200B" },
          { name: "𖥔・ [🪐 Farming Server 3](<https://www.roblox.com/games/15101393044/Dress-To-Impress-STYLE-SHOWDOWN?privateServerLinkCode=19787315109919621567103030508508>)", value: "\u200B" },
          { name: "𖥔・ [🪐 Farming Server 4](<https://www.roblox.com/games/15101393044/Dress-To-Impress-STYLE-SHOWDOWN?privateServerLinkCode=97379643410168961227824030165527>)", value: "\u200B" },
          { name: "𖥔・ [🪐 Farming Server 5](<https://www.roblox.com/games/15101393044/Dress-To-Impress-STYLE-SHOWDOWN?privateServerLinkCode=97379643410168961227824030165527>)", value: "\u200B" }
      );
        // .setImage("https://your-image-url.com/farming-servers.png"); // Replace with an actual image URL

    // Send messages with error handling
    channel.send({ embeds: [embed1, embed2] })
        .then(() => console.log("✅ Farming info sent successfully!"))
        .catch(err => console.error("❌ Error sending farming info embed:", err));
});

// OpenAI API for dynamic responses





client.login(process.env.TOKEN); // Ensure your .env has the correct bot token
