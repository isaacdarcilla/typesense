import { SearchResult } from '@/types';

export const Results = ({ results }: { results: SearchResult | null }) => {
  return (
    <div className="max-w-xl space-y-4">
      {results && <small className="-mt-4 text-end">✨ {results?.found} results found - Searched {results?.out_of} recipes in {results?.search_time_ms}ms.</small>}
      {results?.hits?.map((result, index) => (
        <div key={index} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg mx-auto max-w-xl hover:scale-105">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
              dangerouslySetInnerHTML={{ __html: result.highlight?.animal_name?.snippet || result.document.animal_name }}
            />
            <p className="mb-3 font-normal text-gray-700"
              dangerouslySetInnerHTML={{ __html: result.highlight?.text?.snippet || result.document.text }}
            />
            <div className="flex items-center gap-1">
              <a className="text-tiny hover:text-blue-500" href={`https://wikipedia.org${result.document.wikipedia_link}`} target="_blank">
                Wikipedia <sup>[1]</sup>
              </a>
              &bull;
              <a className="text-tiny hover:text-blue-500" href={result.document.source} target="_blank">
                Source <sup>[1]</sup>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}