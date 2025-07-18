export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  category: string;
  user: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
};
