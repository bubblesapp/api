export type Profile = {
  uid: string;
  name: string;
  email: string;
  inviteLink?: string;
  pushNotificationsEnabled?: boolean;
  emailNotificationsEnabled?: boolean;
};
