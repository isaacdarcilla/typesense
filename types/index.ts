import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Document = {
  animal_name: string;
  id: string;
  media_link: string;
  source: string;
  text: string;
  wikipedia_link: string;
};

export type TextMatchInfo = {
  best_field_score: string;
  best_field_weight: number;
  fields_matched: number;
  score: string;
  tokens_matched: number;
};

export type Hit = {
  document: Document;
  highlight: Record<string, unknown>; 
  highlights: any[]; 
  text_match: number;
  text_match_info: TextMatchInfo;
};

export type FacetCountsItem = {

};

export type RequestParams = {
  collection_name: string;
  per_page: number;
  q: string;
};

export type SearchResult = {
  facet_counts: FacetCountsItem[];
  found: number;
  hits: Hit[];
  out_of: number;
  page: number;
  request_params: RequestParams;
  search_cutoff: boolean;
  search_time_ms: number;
};
