export const APP_NAME = 'Ark Talk Hub';
export enum ALLOWED_ROLE {
  ADMIN = 'admin',
  ATTENDEE = 'attendee',
}

export const ROLE = {
  ADMIN: 'admin',
  ATTENDEE: 'attendee',
};

export const SIDE_BAR_MENU = {
  navMain: [
    {
      title: 'Home',
      role: [ROLE.ADMIN],
      items: [
        {
          title: 'Ark Talk Hub',
          url: '/ark-talk-hub',
        },
        {
          title: 'Dashboard',
          url: '/dashboard',
        },
      ],
    },
    {
      title: 'Talk Speakers',
      role: [ROLE.ADMIN],
      items: [
        {
          title: 'Add Speaker',
          url: '/add-speaker',
        },
        {
          title: 'View Speakers',
          url: '/view-speakers',
        },
      ],
    },
    {
      title: 'Topics',
      role: [ROLE.ADMIN],
      items: [
        {
          title: 'Add Topic',
          url: '/add-topic',
        },
        {
          title: 'View Topics',
          url: '/view-topics',
        },
      ],
    },
    {
      title: 'Attendees',
      role: [ROLE.ADMIN],
      items: [
        {
          title: 'View Attendees',
          url: '/view-attendees',
        },
      ],
    },
    {
      title: 'Talk Topics',
      role: [ROLE.ATTENDEE],
      items: [
        {
          title: 'Ark Talk Hub',
          url: '/ark-talk-hub',
        },
        {
          title: 'Availalabe Topics',
          url: '/available-topics',
        },
      ],
    },
    {
      title: 'Community',
      role: [ROLE.ATTENDEE],

      items: [
        {
          title: 'Chat Channels',
          url: '/chat',
        },
      ],
    },
    {
      title: 'Session',
      role: [ROLE.ADMIN, ROLE.ATTENDEE],

      items: [
        {
          title: 'Log out',
          url: '/logout',
        },
      ],
    },
  ],
};
