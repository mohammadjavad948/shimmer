import { AsideItem } from "./Item";
import { MdDashboard } from 'react-icons/md';
import {BsCardText} from 'react-icons/bs';
import {FaLayerGroup} from 'react-icons/fa';

export default function Aside(){

    return (
        <div className="bg-gray-300 flex-1 rounded-lg p-1 flex flex-col gap-1">
            <AsideItem>
                <MdDashboard size={25}/>
            </AsideItem>
            <AsideItem>
                <BsCardText size={20}/>
            </AsideItem>
            <AsideItem>
                <FaLayerGroup size={20}/>
            </AsideItem>
        </div>
    )
}