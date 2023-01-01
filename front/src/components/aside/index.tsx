import { AsideItem } from './Item';
import { MdDashboard } from 'react-icons/md';
import { BsCardText } from 'react-icons/bs';
import { FaLayerGroup } from 'react-icons/fa';

export default function Aside() {
  return (
    <div className="flex h-11 w-[100%] flex-row gap-1 bg-gray-300 p-1 md:h-[100vh] md:w-11 md:flex-col">
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
