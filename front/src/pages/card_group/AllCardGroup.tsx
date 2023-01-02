import { MainLayout } from "../../layout/main";
import {AiOutlinePlus} from 'react-icons/ai';
import { useQuery } from "@tanstack/react-query";
import { allCardGroup } from "../../api/card_group";

export default function AllCardGroup(){

    const {data, isLoading} = useQuery(['card-group'], allCardGroup);

    console.log(data);
    return (
        <MainLayout>
            <div
                className="w-full flex justify-between"
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
                {!isLoading && (
                    <div></div>
                )}
            </div>
        </MainLayout>
    )
}