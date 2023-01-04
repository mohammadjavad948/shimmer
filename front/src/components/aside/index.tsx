import { AsideItem } from './Item';
import { MdDashboard } from 'react-icons/md';
import { BsCardText } from 'react-icons/bs';
import { FaLayerGroup } from 'react-icons/fa';

export default function Aside() {
  return (
    <div className="flex h-11 w-[100%] flex-row gap-1 p-1 md:h-full md:w-48 md:flex-col md:gap-2 md:border-r-2 md:border-r-gray-400 md:py-3 md:px-2">
      <AsideItem icon={<MdDashboard size={25} />}>Dashboard</AsideItem>
      <AsideItem icon={<BsCardText size={20} />}>Cards</AsideItem>
      <AsideItem icon={<FaLayerGroup size={20} />}>Card Groups</AsideItem>
    </div>
  );
}
