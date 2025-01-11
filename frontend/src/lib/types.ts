export type AuthUserProps = {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductTypes = {
  _id: string;
  userId: string;
  name: string;
  currentPrice: number;
  initialPrice: number;
  url: string;
  image: string | null;
  lastChecked: Date;
};
