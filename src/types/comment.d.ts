interface Comment {
  id: string;
  content: string;
  attachment_url?: string;  // Untuk file attachment
  user: {
    id: string;
    name: string;
  };
  created_at: string;
}