import { useDroppable } from "@dnd-kit/core";
import { verticalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Item = ({ id, dragOverlay }: any) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div style={style} className="flex items-center justify-center w-full h-12 mb-1 pl-1 bg-slate-600 rounded select-none">
      {id}
    </div>
  );
};

const SortableItem = ({ id, name }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Item id={id} name={name} />
    </li>
  );
};

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
