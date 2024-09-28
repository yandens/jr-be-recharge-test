export type NewsDto = {
  title: string;
  snippet: string;
  content: string;
  category_id: number;
};

export type NewsSearchDto = {
  query: string;
  page: number;
  size: number;
};
