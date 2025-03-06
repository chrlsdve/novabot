require('dotenv').config(); // Load environment variables

const {ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');

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
    .setColor('#d94f41')
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


client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);

  cron.schedule('0 6 * * *', async () => {
    const guild = client.guilds.cache.find(g => g.name === 'ꌗꂦ꒒ꍏꋪ ꌗꉣꍏꉓꍟ ꂦꎇ ꈤꂦꃴꍏ');
    if (!guild) return console.log('Guild not found.');

    const cosmicLounge = client.channels.cache.get('1334553960891285605');
    if (!cosmicLounge) return console.log('Cosmic lounge channel not found.');

    const role = guild.roles.cache.find(role => role.name === '💫𝑵𝒐𝒗𝒂 𝒔𝒕𝒂𝒓𝒔');
    if (!role) return console.log('Role not found.');

    const embed = new EmbedBuilder()
      .setColor('#d94f41')
      .setAuthor({ name: 'Miskie Nova', iconURL: 'https://cdn-longterm.mee6.xyz/plugins/embeds/images/1334544134257508363/c4af5d7b09fe6447d850ae1ce9fc68a10d464b633f167bdaefa778e16324e16f.jpeg' })
      .setTitle('✨ Good morning, Nova Star! 🌟')
      .setDescription(`Good morning ${role}! ☀️  
Don't forget to have your breakfast, and may your day be as radiant as a supernova and as fierce as a queen on the runway.`)
      .setImage('https://cdn-longterm.mee6.xyz/plugins/embeds/images/1334544134257508363/014da2e5b0a1217e42c3e086b57c09627d8a585692512e85ab7a4d5b4d34e271.jpeg')
      .setFooter({ text: '💫 Love you all to the galaxies and back! 🚀' });

    await cosmicLounge.send({ content: `${role}`, embeds: [embed] });
    console.log('Morning message sent.');
  }, {
    timezone: "Asia/Manila"
  });
});



// Auto-reply to images with reactions and an embed
const targetChannelId = '1334568160719933491'; // Replace with your photo channel's ID

const randomReplies = [
  '✨ 𝐒𝐭𝐞𝐥𝐥𝐚𝐫 𝐬𝐡𝐨𝐭! 𝐘𝐨𝐮𝐫 𝐠𝐚𝐥𝐚𝐱𝐲 𝐬𝐡𝐢𝐧𝐞𝐬 𝐞𝐯𝐞𝐧 𝐛𝐫𝐢𝐠𝐡𝐭𝐞𝐫 𝐧𝐨𝐰!',
  '🌠 𝐂𝐨𝐬𝐦𝐢𝐜 𝐦𝐚𝐬𝐭𝐞𝐫𝐩𝐢𝐞𝐜𝐞! 𝐊𝐞𝐞𝐩 𝐬𝐡𝐚𝐫𝐢𝐧𝐠 𝐲𝐨𝐮𝐫 𝐜𝐞𝐥𝐞𝐬𝐭𝐢𝐚𝐥 𝐚𝐫𝐭!',
  '🚀 𝐓𝐡𝐚𝐭 𝐩𝐢𝐜 𝐣𝐮𝐬𝐭 𝐛𝐥𝐚𝐬𝐭𝐞𝐝 𝐦𝐞 𝐭𝐨 𝐚𝐧𝐨𝐭𝐡𝐞𝐫 𝐝𝐢𝐦𝐞𝐧𝐬𝐢𝐨𝐧!',
  '🌌 𝐋𝐨𝐨𝐤𝐬 𝐥𝐢𝐤𝐞 𝐚 𝐬𝐭𝐚𝐫 𝐰𝐚𝐬 𝐛𝐨𝐫𝐧!',
  '🌟 𝐘𝐨𝐮𝐫 𝐜𝐫𝐞𝐚𝐭𝐢𝐯𝐢𝐭𝐲 𝐢𝐬 𝐥𝐢𝐠𝐡𝐭𝐢𝐧𝐠 𝐮𝐩 𝐭𝐡𝐞 𝐮𝐧𝐢𝐯𝐞𝐫𝐬𝐞!',
  '🌠 𝐀𝐛𝐬𝐨𝐥𝐮𝐭𝐞𝐥𝐲 𝐫𝐚𝐝𝐢𝐚𝐧𝐭! 𝐀 𝐭𝐫𝐮𝐞 𝐍𝐨𝐯𝐚 𝐬𝐭𝐚𝐫 𝐦𝐨𝐦𝐞𝐧𝐭!',
];

client.on('messageCreate', (message) => {
  if (message.channel.id === targetChannelId && message.attachments.size > 0 && !message.author.bot) {
    const randomReply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
    const userMention = `<@${message.author.id}>`;

    const replyEmbed = new EmbedBuilder()
      .setColor('#d94f41')
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setDescription(`${randomReply} ${userMention}`)
      //.setImage(message.attachments.first().url)
      .setFooter({ text: '🌟 Keep dazzling us with your art!' });

    message.reply({ embeds: [replyEmbed] }).then((msg) => {
      msg.react('🫶');
      msg.react('💖');
      msg.react('✨');
    }).catch(console.error);
  }
});

// Auto-reply for runway looks channel
const runwayChannelId = '1334554404384411780'; // Replace with your runway look channel's ID

const runwayReplies = [
  '💃 Strut it, star! That runway has never seen such elegance!',
  '🌟 Serving looks, slaying hearts — you are a galactic fashion icon!',
  '✨ The category is: Serve... and you ATE!',
  '🚀 Out of this world! Your look just launched into the fashion cosmos!',
  '🌠 Fierce, fabulous, flawless — you OWN that runway!',
  '🔥 This galaxy isn’t ready for your cosmic charisma, uniqueness, nerve, and talent!',
];

client.on('messageCreate', (message) => {
  if (message.channel.id === runwayChannelId && message.attachments.size > 0 && !message.author.bot) {
    const randomRunwayReply = runwayReplies[Math.floor(Math.random() * runwayReplies.length)];
    const userMention = `<@${message.author.id}>`;

    const runwayEmbed = new EmbedBuilder()
      .setColor('#d94f41')
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTitle('🌟 Runway Royalty Alert! 🌟')
      .setDescription(`${randomRunwayReply} ${userMention}`)
      //.setImage(message.attachments.first().url)
      .setFooter({ text: '✨ Keep the looks coming — the galaxy is your runway!' });

    message.reply({ embeds: [runwayEmbed] }).then((msg) => {
      msg.react('👑');
      msg.react('🔥');
      msg.react('🌌');
    }).catch(console.error);
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
    const role = interaction.guild.roles.cache.find(role => role.name === '🚀 Starlet');
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


// Level-up channel ID
const levelUpChannelId = '1345759905344262179';

// Level rewards with correct badge URLs and role IDs
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

// Function to check for level-ups and assign rewards
const checkLevelUp = async (member, userData) => {
  const neededXP = xpToNextLevel(userData.level);

  if (userData.xp >= neededXP) {
    userData.xp = 0;
    userData.level += 1;
    client.emit('levelUp', member, userData.level);
  }
};

// Level-up event listener
client.on('levelUp', async (member, level) => {
  const channel = client.channels.cache.get(levelUpChannelId);
  if (!channel) return console.log('Level-up channel not found.');

  const reward = levelRewards[level];
  if (reward) {
    const levelEmbed = new EmbedBuilder()
      .setColor('#d94f41')
      .setTitle('🌟 Cosmic Ascension! 🌟')
      .setDescription(`✨ Congratulations, ${member}! ✨\n\nYou've **leveled up to Level ${level}** and your star shines even brighter in the **Nova Galaxy**! 🌌\n\n**🌠 Your reward:**\n> 🏅 **New Badge:**\n> 🌟 **Role Upgrade** — Claim your cosmic crown! 👑`)
      .setImage(reward.badge)
      .setFooter({ text: 'Keep glowing and growing — the universe is yours to conquer! 🚀' });

    const msg = await channel.send({ content: `🌟 **Hats off to ${member}!** 🚀`, embeds: [levelEmbed] });

    // Add reactions
    await msg.react('🌠');
    await msg.react('✨');
    await msg.react('🚀');

    // Assign role
    const role = member.guild.roles.cache.get(reward.roleId);
    if (role) {
      await member.roles.add(role);
      console.log(`Assigned role ${role.name} to ${member.user.tag} for reaching Level ${level}`);
    } else {
      console.log(`Role for Level ${level} not found.`);
    }
  }
});

// Test level-up command for moderators
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!testLevelUp')) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('❌ You don’t have permission to use this command.');
    }

    const args = message.content.split(' ');
    const level = parseInt(args[1]);

    if (isNaN(level) || !levelRewards[level]) {
      return message.reply('⚠️ Please provide a valid level to test (1, 6, 11, 16, 21).');
    }

    const reward = levelRewards[level];
    const levelEmbed = new EmbedBuilder()
      .setColor('#d94f41')
      .setTitle('🌟 Cosmic Ascension Test! 🌟')
      .setDescription(`✨ **Test Preview** for **Level ${level}** ✨\n\nThis is how the message will look when someone levels up. 🌠\n\n**🏅 Reward:**\n> 🌌 **Badge:** Displayed below\n> 🎖️ **Role:** Will be auto-assigned`)
      .setImage(reward.badge)
      .setFooter({ text: 'Test only — keep conquering the galaxy!' });

    const testMsg = await message.channel.send({ content: `🌠 **Test Complete!** (Level ${level})`, embeds: [levelEmbed] });

    // Add fun reactions
    await testMsg.react('🛸');
    await testMsg.react('🌠');
    await testMsg.react('💫');
  }
});


client.login(process.env.TOKEN); // Ensure your .env has the correct bot token
