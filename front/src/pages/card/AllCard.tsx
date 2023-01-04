import { MainLayout } from '../../layout/main';
import { AiOutlinePlus } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { allCards } from '../../api/card';

export default function AllCard() {
  const { data, isLoading } = useQuery(['card'], allCards);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="mb-2 flex w-full items-center justify-between">
        <span className="text-base font-semibold text-slate-600">
          Cards
        </span>

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
                className="cursor-pointer rounded-lg bg-white p-4 hover:shadow-md"
                key={i}
              >
                <div className="flex justify-between">
                  <span className="flex items-center gap-2 text-lg font-bold">
                    {el.question}
                  </span>

                  <span className="rounded-full py-1 px-2 text-sm text-slate-600">
                    {new Date(el.created_at + 'Z').toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </MainLayout>
  );
}
