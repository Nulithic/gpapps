import { useDroppable } from "@dnd-kit/core";
import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

const Droppable = ({ id, items }: any) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
      <ul className="w-full h-96 px-5 py-2 bg-base-300 rounded list-none overflow-auto" ref={setNodeRef}>
        {items.map((item: any) => (
          <SortableItem key={item} id={item} name={item} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;
