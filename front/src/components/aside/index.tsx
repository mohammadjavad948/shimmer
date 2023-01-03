import { AsideItem } from './Item';
import { MdDashboard } from 'react-icons/md';
import { BsCardText } from 'react-icons/bs';
import { FaLayerGroup } from 'react-icons/fa';

export default function Aside() {
  return (
    <div className="flex h-11 w-[100%] flex-row gap-1 p-1 md:border-r-gray-400 md:border-r-2 md:py-3 md:px-2 md:gap-2 md:h-[100vh] md:w-48 md:flex-col">
      <AsideItem>
        <MdDashboard size={25} />
      </AsideItem>
      <AsideItem>
        <BsCardText size={20} />
      </AsideItem>
      <AsideItem>
        <FaLayerGroup size={20} />
      </AsideItem>
    </div>
  );
}
