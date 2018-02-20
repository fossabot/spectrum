// @flow
import type {
  DBThread,
  DBInvoice,
  DBReaction,
  DBChannel,
  DBMessage,
  DBUser,
  DBCommunity,
} from '../types';

export type Job<JobData> = {
  id: string,
  data: JobData,
};

interface BullQueue<JobData> {
  add: (data: JobData) => Promise<any>;
  process: (
    cb: (job: Job<JobData>, done: Function) => void | Promise<any>
  ) => void;
}

export type ChannelNotificationJobData = {
  channel: DBChannel,
  userId: string,
};

export type ThreadNotificationJobData = { thread: DBThread };

export type CommunityNotificationJobData = {
  communityId: string,
  userId: string,
};

export type UserThreadLastSeenJobData = {
  threadId: string,
  userId: string,
  timestamp: number | Date,
};

export type InvoiceJobData = { invoice: DBInvoice };

export type ReactionNotificationJobData = {
  reaction: DBReaction,
  userId: string,
};

export type PrivateChannelRequestJobData = {
  userId: string,
  channel: DBChannel,
};

export type PrivateChannelInviteNotificationJobData = {
  recipient: { email: string, firstName?: ?string, lastName?: ?string },
  channelId: string,
  senderId: string,
  customMessage?: ?string,
};

export type CommunityInviteNotificationJobData = {
  recipient: { email: string, firstName?: ?string, lastName?: ?string },
  communityId: string,
  senderId: string,
  customMessage?: ?string,
};

export type DirectMessageNotificationJobData = {
  message: DBMessage,
  userId: string,
};

export type MessageNotificationJobData = { message: DBMessage };

export type NewUserWelcomeEmailJobData = { user: DBUser };

export type NewCommunityWelcomeEmailJobData = {
  user: DBUser,
  community: DBCommunity,
};

export type EmailValidationEmailJobData = { email: string, userId: string };

export type AdministratorEmailValidationEmailJobData = {
  email: string,
  userId: string,
  communityId: string,
  community: DBCommunity,
};

export type ReputationEventJobData = {
  userId: string,
  type: string, // TODO: Type this with the actual possible types
  entityId: string,
};

export type StripeWebhookEventJobData = {
  record: Object,
};

export type StripeCommunityPaymentEventJobData = {
  communityId: string,
};

export type AdminCommunityCreatedEmailJobData = {
  user: DBUser,
  community: DBCommunity,
};

export type AdminToxicMessageJobData = { message: DBMessage };

export type AdminToxicThreadJobData = { thread: DBThread };

export type AdminSlackImportJobData = {
  thisUser: DBUser,
  community: DBCommunity,
  invitedCount: number,
  teamName: string,
};

export type Queues = {
  // athena
  sendThreadNotificationQueue: BullQueue<ThreadNotificationJobData>,
  sendCommunityNotificationQueue: BullQueue<CommunityNotificationJobData>,
  trackUserThreadLastSeenQueue: BullQueue<UserThreadLastSeenJobData>,
  sendProInvoicePaidNotificationQueue: BullQueue<InvoiceJobData>,
  sendCommunityInvoicePaidNotificationQueue: BullQueue<InvoiceJobData>,
  sendReactionNotificationQueue: BullQueue<ReactionNotificationJobData>,
  sendPrivateChannelRequestQueue: BullQueue<PrivateChannelRequestJobData>,
  sendPrivateChannelInviteNotificationQueue: BullQueue<
    PrivateChannelInviteNotificationJobData
  >,
  sendCommunityInviteNotificationQueue: BullQueue<
    CommunityInviteNotificationJobData
  >,
  sendChannelNotificationQueue: BullQueue<ChannelNotificationJobData>,
  sendDirectMessageNotificationQueue: BullQueue<
    DirectMessageNotificationJobData
  >,
  sendMessageNotificationQueue: BullQueue<MessageNotificationJobData>,

  // hermes
  sendNewUserWelcomeEmailQueue: BullQueue<NewUserWelcomeEmailJobData>,
  sendNewCommunityWelcomeEmailQueue: BullQueue<NewCommunityWelcomeEmailJobData>,
  sendEmailValidationEmailQueue: BullQueue<EmailValidationEmailJobData>,
  sendAdministratorEmailValidationEmailQueue: BullQueue<
    AdministratorEmailValidationEmailJobData
  >,

  // mercury
  processReputationEventQueue: BullQueue<ReputationEventJobData>,

  // pluto
  stripeChargeWebhookEventQueue: BullQueue<StripeWebhookEventJobData>,
  stripeCustomerWebhookEventQueue: BullQueue<StripeWebhookEventJobData>,
  stripeSourceWebhookEventQueue: BullQueue<StripeWebhookEventJobData>,
  stripeInvoiceWebhookEventQueue: BullQueue<StripeWebhookEventJobData>,
  stripeSubscriptionWebhookEventQueue: BullQueue<StripeWebhookEventJobData>,
  stripeDiscountWebhookEventQueue: BullQueue<StripeWebhookEventJobData>,
  stripeCommunityAdministratorEmailChangedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,
  stripeCommunityAnalyticsAddedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,
  stripeCommunityAnalyticsRemovedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,
  stripeCommunityCreatedQueue: BullQueue<StripeCommunityPaymentEventJobData>,
  stripeCommunityDeletedQueue: BullQueue<StripeCommunityPaymentEventJobData>,
  stripeCommunityEditedQueue: BullQueue<StripeCommunityPaymentEventJobData>,
  stripeCommunityModeratorAddedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,
  stripeCommunityModeratorRemovedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,
  stripeCommunityPrioritySupportAddedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,
  stripeCommunityPrioritySupportRemovedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,
  stripeCommunityPrivateChannelAddedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,
  stripeCommunityPrivateChannelRemovedQueue: BullQueue<
    StripeCommunityPaymentEventJobData
  >,

  // admin
  _adminSendCommunityCreatedEmailQueue: BullQueue<
    AdminCommunityCreatedEmailJobData
  >,
  _adminProcessToxicMessageQueue: BullQueue<AdminToxicMessageJobData>,
  _adminProcessToxicThreadQueue: BullQueue<AdminToxicThreadJobData>,
  _adminProcessSlackImportQueue: BullQueue<AdminSlackImportJobData>,
};
