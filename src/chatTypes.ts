export type ChatMessage = {
  id: string;
  sender: "user" | "ai";
  text: string;
  status?: "success" | "error";
};