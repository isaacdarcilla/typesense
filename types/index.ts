import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SearchResult = {
  facet_counts: any[]
  found: number
  hits: Hit[]
  out_of: number
  page: number
  request_params: RequestParams
  search_cutoff: boolean
  search_time_ms: number
}
export type Hit = {
  document: Document
  highlight: Highlight
  highlights: any[]
  text_match: number
  text_match_info: TextMatchInfo
}

export type Snippet = {
  snippet: string
}

export type Document = {
  budget: string
  certification: string
  genres: string
  homepage: string
  id: string
  original_language: string
  overview: string
  popularity: string
  poster_path: string
  release_date: string
  revenue: string
  runtime: string
  tagline: string
  title: string
  vote_average: string
  vote_count: string
}

export type Highlight = {
  tagline: Snippet
  title: Snippet
  overview: Snippet
}

export type TextMatchInfo = {
  best_field_score: string
  best_field_weight: number
  fields_matched: number
  score: string
  tokens_matched: number
}

export type RequestParams = {
  collection_name: string
  per_page: number
  q: string
}
