import { MainLayout } from '../../layout/main';
import { AiOutlinePlus } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { allCardGroup } from '../../api/card_group';
import { BiLockAlt, BiShow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function AllCardGroup() {
  const { data, isLoading } = useQuery(['card-group'], allCardGroup);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="mb-2 flex w-full items-center justify-between">
        <span className="text-base font-semibold text-slate-600">
          Card Groups
        </span>

        <button
          onClick={() => navigate('/card-group/new')}
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
                    {el.name}

                    {el.is_public && (
                      <span className="rounded-lg bg-gray-200 p-1 text-gray-700">
                        <BiShow />
                      </span>
                    )}

                    {!el.is_public && (
                      <span className="rounded-lg bg-gray-200 p-1 text-gray-700">
                        <BiLockAlt />
                      </span>
                    )}
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
