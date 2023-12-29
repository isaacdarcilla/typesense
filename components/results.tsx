import { SearchResult } from '@/types';
import { Checkbox } from '@nextui-org/react';

export const Results = ({ results, onShowImage }: { results: SearchResult | null, onShowImage: any }) => {
  return (
    <div className="max-w-xl space-y-4">
      {results && (
        <div className='w-full flex justify-between items-center -mt-4 mx-3'>
          <small>✨ {results?.found} results found - Searched {results?.out_of} recipes in {results?.search_time_ms}ms.</small>
          <small className='text-blue-600 cursor-pointer'>
            <Checkbox onChange={onShowImage} classNames={{ label: 'text-xs' }} size='sm' defaultSelected={false}>Show With Image Only</Checkbox>
          </small>
        </div>
      )}
      {results?.hits?.map((result, index) => (
        <div key={index} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg mx-auto max-w-xl hover:scale-105">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
              dangerouslySetInnerHTML={{ __html: result.highlight?.animal_name?.snippet || result.document.animal_name }}
            />
            <blockquote className="mb-3 font-normal text-gray-700"
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
              {result.document.media_link && (
                <>
                  &bull;
                  <a className="text-tiny hover:text-blue-500" href={result.document.media_link} target="_blank">
                    View Image <sup>[1]</sup>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}