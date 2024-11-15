export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  content: string;
  author: string;
}

export interface NewsResponse {
  articles: Article[];
  status: string;
  totalResults: number;
}