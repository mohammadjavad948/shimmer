import { MainLayout } from "../../layout/main";
import {AiOutlinePlus} from 'react-icons/ai';

export default function AllCardGroup(){

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
            </div>
        </MainLayout>
    )
}