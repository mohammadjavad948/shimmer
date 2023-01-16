import { MainLayout } from '../../layout/main';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { allCards } from '../../api/card';

export default function AllCard() {
  const { data, isLoading } = useQuery(['card'], allCards);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="mb-2 flex w-full items-center justify-between">
        <span className="text-base font-semibold text-slate-600">Cards</span>

        <button
          onClick={() => navigate('/card/new')}
          className="flex items-center gap-2 rounded-md bg-slate-300 py-2 px-4 font-semibold text-slate-800 hover:bg-slate-400"
        >
          New
          <AiOutlinePlus size={18} />
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {!isLoading &&
          data?.data.map((el, i) => {
            return (
              <div
                className="rounded-lg bg-white p-4 hover:shadow-md"
                key={i}
              >
                <span className="flex items-center gap-2 text-lg font-bold cursor-pointer hover:text-slate-800 hover:underline">
                    {el[0].question}
                </span>

                <div className="mt-3 flex flex-col gap-1 pl-3 divide-y">
                  {el[0].answers.map((a: any, i: any) => {
                    return (
                      <div key={i} className="py-1">
                        {a}
                        {i === el[0].real_answer.index && (
                          <span className="text-lg font-bold text-green-600 ml-2">
                            &#10003;
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-between mt-4">
                  <span className="rounded-full text-sm flex items-center bg-gray-200 px-3 text-gray-700">
                    {el[1].name}      
                  </span>

                  <span className="px-2 py-1 rounded-lg text-red-600 hover:bg-red-200 cursor-pointer">
                    <AiOutlineDelete size={18}/>
                  </span>

                  <span className="rounded-full py-1 px-2 text-sm text-slate-600">
                    {new Date(el[0].created_at + 'Z').toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </MainLayout>
  );
}
