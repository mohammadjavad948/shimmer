import { MainLayout } from "../../layout/main";
import {AiOutlinePlus} from 'react-icons/ai';
import { useQuery } from "@tanstack/react-query";
import { allCardGroup } from "../../api/card_group";
import {BiLockAlt, BiShow} from "react-icons/bi";

export default function AllCardGroup(){

    const {data, isLoading} = useQuery(['card-group'], allCardGroup);

    return (
        <MainLayout>
            <div
                className="w-full flex justify-between mb-2 items-center"
            >
                <span className="text-slate-600 font-semibold text-base">
                    Card Groups
                </span>

                <button
                    className="flex gap-2 py-2 px-4 hover:bg-slate-400 font-semibold rounded-md bg-slate-300 text-slate-800 items-center"
                >
                    New
                    <AiOutlinePlus size={18}/>
                </button>
            </div>
            <div className="w-full grid grid-cols-4 gap-3">
                {!isLoading && (
                    data?.data.map((el, i) => {
                        return (
                            <div
                                className="bg-white p-4 rounded-lg hover:shadow-md cursor-pointer"
                                key={i}
                            >
                                <span
                                    className="text-lg font-bold flex gap-2 items-center"
                                >
                                    {el.name}

                                    {el.is_public && (
                                        <span className="p-1 bg-gray-200 text-gray-700 rounded-lg">
                                            <BiShow />
                                        </span>
                                    )}

                                    {!el.is_public && (
                                        <span className="p-1 bg-gray-200 text-gray-700 rounded-lg">
                                            <BiLockAlt />
                                        </span>
                                    )}
                                </span>
                            </div>
                        )
                    })
                )}
            </div>
        </MainLayout>
    )
}