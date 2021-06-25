export const telegramLinks: TelegramLink[] = [
  {
    title: "Lawnchair News Channel",
    description:
      "Get the latest information available, such as releases or other announcements.",
    icon: "/images/lawnchair-telegram-channel-icon.jpg",
    link: "https://t.me/lawnchairci",
  },
  {
    title: "Lawnchair Community Group",
    description:
      "Come here if you find any bugs, or have a feature idea. NO off topic allowed.",
    icon: "/images/lawnchair-telegram-community-group-icon.jpg",
    link: "https://t.me/lccommunity",
  },
  {
    title: "Lawnchair Style Group",
    description:
      "The place to show off your Lawnchair homescreen, your wall, or icons.",
    icon: "/images/lawnchair-telegram-style-group-icon.jpg",
    link: "https://t.me/lcstyle",
  },
  {
    title: "Lawnchair Best Setups Channel",
    description: "The best setups from the Lawnchair style group.",
    icon: "/images/lawnchair-telegram-best-setups-channel-icon.jpg",
    link: "https://t.me/bestlcstyle",
  },
  {
    title: "Lawnchair OT Telegram Group",
    description:
      "This is the place (and the ONLY place) to talk about whatever the heck you'd like.",
    icon: "/images/lawnchair-ot-telegram-group-icon.jpg",
    link: "https://lcofftopic",
  },
]

interface TelegramLink {
  title: string
  description: string
  icon: string
  link: string
}
