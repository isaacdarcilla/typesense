import { SearchResult } from '@/types';
import { formatCurrency, formatTime } from '@/utils/helper';
import { Chip, Image } from '@nextui-org/react';

export const Results = ({ results }: { results: SearchResult | null }) => {
  return (
    <div className="max-w-xl space-y-4">
      {results && (
        <div className='w-full flex justify-between items-center -mt-4 mx-3'>
          <small>🔍 {results?.found} results found - Searched {results?.out_of} recipes in {results?.search_time_ms}ms.</small>
        </div>
      )}
      {results?.hits?.map((result, index) => (
        <div key={index} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg mx-auto max-w-xl hover:scale-105 hover:shadow-lg">
          <div className="flex flex-col justify-between p-4 leading-normal">
            {result.document.poster_path && (
              <Image
                className='rounded-none mb-2'
                alt={result.document.title}
                src={`https://image.tmdb.org/t/p/w45${result.document.poster_path}`}
              />
            )}
            <div className='flex justify-between items-center'>
              <h5
                className="text-2xl font-extrabold tracking-tight text-gray-900"
                dangerouslySetInnerHTML={{ __html: result.highlight?.title?.snippet || result.document.title }}
              />
              <Chip
                variant="shadow"
                size='sm'
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
              >
                {result.document?.vote_average}
              </Chip>

            </div>
            <div className='flex justify-start items-center gap-1 my-2 text-gray-500'>
              <small className='border-2 px-1 font-bold'>{result.document.certification}</small>
              <small>{result.document.genres}</small>&bull;
              <small>{formatTime(Number(result.document.runtime))}</small>
            </div>

            <blockquote className="mb-3 font-normal text-gray-700"
            >
              {result.document.overview}
            </blockquote>

            <hr />

            <div className="flex flex-col items-start mt-3 gap-1 text-neutral-600">
              <small className="text-tiny">
                Language: {result.document.original_language || '-'}
              </small>
              <small className="text-tiny">
                Release Date: {result.document.release_date || '-'}
              </small>
              <small className="text-tiny">
                Budget: {formatCurrency(Number(result.document.budget)) || '-'}
              </small>
              <a className="text-tiny hover:text-blue-500" href={result.document.homepage} target="_blank">
                Website: {result.document.homepage || '-'}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}