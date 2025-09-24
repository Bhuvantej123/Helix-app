
export type Sender = 'user' | 'helix';

export interface ChatMessage {
  id: string;
  sender: Sender;
  content: string;
}

export enum SessionState {
  GREETING,
  PLANNING,
  TUTORING,
}
