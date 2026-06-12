export type MessageRole = "user" | "assistant" | "error";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ChatRequestBody {
  message: string;
}

export interface ChatResponseBody {
  reply: string;
}

export interface ChatErrorBody {
  error: string;
}
