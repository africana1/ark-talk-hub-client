export interface IAuth {
  email: string;
  password: string;
}

export interface IBaseInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  talk?: ITalk[];
}

export interface IAttendee extends IBaseInterface {
  password: string;
}

export interface ITalk {
  appliedTalk: [];
  id: string;
  topicTitle: string;
  date: Date;
  time: string;
  location: string;
  speakerId: string;
}

export interface IAttendees {
  id: string;
  email: string;
  phone: string;
  role: string;
  registrationId: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  appliedTalk: [];
}

export interface IAppliedTalk {
  id: string;
  talkId: string;
  attendeeId: string;
}
