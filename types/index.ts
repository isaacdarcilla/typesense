import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface SearchResult {
  facet_counts: any[]
  found: number
  hits: Hit[]
  out_of: number
  page: number
  request_params: RequestParams
  search_cutoff: boolean
  search_time_ms: number
}
export interface Hit {
  document: Document
  highlight: Highlight
  highlights: any[]
  text_match: number
  text_match_info: TextMatchInfo
}
export interface Snippet {
  snippet: string
}

export interface Document {
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
export interface Highlight {
  tagline: Snippet
  title: Snippet
  overview: Snippet
}
export interface TextMatchInfo {
  best_field_score: string
  best_field_weight: number
  fields_matched: number
  score: string
  tokens_matched: number
}
export interface RequestParams {
  collection_name: string
  per_page: number
  q: string
}
