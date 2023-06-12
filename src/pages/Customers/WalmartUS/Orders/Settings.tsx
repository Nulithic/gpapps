import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DndContext, DragOverlay, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable, { Item } from "./ColumnList/Droppable";
import { arrayMove, insertAtIndex, removeAtIndex } from "./ColumnList/array";

interface DialogProps {
  filterList: any[];
  tableOptions: string;
  handleTableOptions: (value: string) => void;
}
interface filterList {
  [key: string]: string[];
}

const SettingsDialog = ({ filterList, tableOptions, handleTableOptions }: DialogProps) => {
  const [itemGroups, setItemGroups] = useState<filterList>({
    group1: [],
    group2: [],
  });
  const [activeId, setActiveId] = useState(null);

  console.log(itemGroups);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: any) => {
    console.log(active);
    setActiveId(active.id);
  };
  const handleDragCancel = () => setActiveId(null);
  const handleDragOver = ({ active, over }: any) => {
    // console.log("Over:", active);
    // console.log("Over:", over);

    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups: any) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.id in itemGroups ? itemGroups[overContainer].length + 1 : over.data.current.sortable.index;

        return moveBetweenContainers(itemGroups, activeContainer, activeIndex, overContainer, overIndex, active.id);
      });
    }
  };
  const handleDragEnd = ({ active, over }: any) => {
    // console.log("End:", active);
    // console.log("End:", over);

    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;

      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.id in itemGroups ? itemGroups[overContainer].length + 1 : over.data.current.sortable.index;

      setItemGroups((itemGroups: any) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(itemGroups[overContainer], activeIndex, overIndex),
          };
        } else {
          newItems = moveBetweenContainers(itemGroups, activeContainer, activeIndex, overContainer, overIndex, active.id);
        }

        return newItems;
      });
    }

    setActiveId(null);
  };

  const moveBetweenContainers = (items: any, activeContainer: any, activeIndex: any, overContainer: any, overIndex: any, item: any) => {
    const moveObject = {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };

    return moveObject;
  };

  const handleSubmit = () => {
    const list = itemGroups.group2.map((name) => ({
      accessorKey: filterList.find((item) => item.header === name).accessorKey,
      header: name,
      enableColumnFilter: true,
    }));
    localStorage.setItem("walmartUSColumnFilters", JSON.stringify(list));

    window.location.reload();
  };

  const handleMoveAll = (group: string) => {
    switch (group) {
      case "group1":
        setItemGroups({ group1: [], group2: itemGroups.group2.concat(itemGroups.group1) });
        break;
      case "group2":
        setItemGroups({ group1: itemGroups.group2.concat(itemGroups.group1), group2: [] });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("walmartUSColumnFilters")) {
      const getList = JSON.parse(localStorage.getItem("walmartUSColumnFilters")!!);
      const filterOut = filterList.filter((item: any) => !getList.some((name: any) => name.header === item.header));
      setItemGroups({ group1: filterOut.map((item: any) => item.header), group2: getList.map((item: any) => item.header) });
    }
  }, []);

  return (
    <>
      <input type="checkbox" id="settingsDialog" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-5xl space-y-4">
          <p className="font-bold text-2xl">Settings</p>

          <div className="flex flex-col">
            <p className="font-bold text-lg">Filter</p>

            <select className="select select-bordered select-mid w-full" value={tableOptions} onChange={(e) => handleTableOptions(e.target.value)}>
              <option value="All Orders">All Orders</option>
              <option value="Active Orders">Active Orders</option>
              <option value="Archived Orders">Archived Orders</option>
            </select>
          </div>

          <div className="flex flex-col">
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragCancel={handleDragCancel} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
              <div className="flex space-x-10">
                {Object.keys(itemGroups).map((group) => (
                  <div key={group} className="flex flex-col w-full space-y-2">
                    <p className="font-bold text-lg">{group === "group1" ? "Hidden Columns" : "Active Columns"}</p>
                    <Droppable id={group} items={itemGroups[group]} />
                    <button className="btn btn-mid btn-primary" onClick={() => handleMoveAll(group)}>
                      {group === "group1" ? "Move All to Active Columns >>>" : "<<< Move All to Hidden Columns"}
                    </button>
                  </div>
                ))}
              </div>
              {createPortal(
                <DragOverlay>{activeId ? <Item id={activeId} name={activeId} dragOverlay /> : null}</DragOverlay>,
                document.getElementById("root") as HTMLElement
              )}
            </DndContext>
          </div>

          <div className="modal-action">
            <label className="btn btn-mid btn-error" htmlFor="settingsDialog">
              Cancel
            </label>
            <label className="btn btn-mid btn-secondary" onClick={handleSubmit}>
              Submit
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsDialog;
