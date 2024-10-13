const dotenv = require("dotenv");
const { MezonClient } = require("mezon-sdk");

dotenv.config();

async function main() {
  const client = new MezonClient(process.env.APPLICATION_TOKEN);

  await client.authenticate();

  client.on("channel_message", (event) => {
    console.log("event", event);

    if (event?.content?.t === "*ping") {
      client.sendMessage(
        event?.clan_id,
        event?.channel_id,
        2,
        event?.is_public,
        { t: "pong" },
        [],
        [],
        [
          {
            message_id: '',
            message_ref_id: event.message_id,
            ref_type: 0,
            message_sender_id: event.sender_id,
            message_sender_username: event.username,
            mesages_sender_avatar: event.avatar,
            message_sender_clan_nick: event.clan_nick,
            message_sender_display_name: event.display_name,
            content: JSON.stringify(event.content),
            has_attachment: false,
          },
        ]
      );
    }
  });
}

main()
  .then(() => {
    console.log("bot start!");
  })
  .catch((error) => {
    console.error(error);
  });
