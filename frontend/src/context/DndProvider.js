import { createContext, useContext, useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter
} from "@dnd-kit/core";

const DndKitContext = createContext();
export const useDndKit = () => useContext(DndKitContext);

export default function DndKitProvider({ children }) {
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null); // overlay için
  const [items, setItems] = useState([]);
  const [dropped, setDropped] = useState({});

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleDragStart = (event) => {
    setActiveId(event.active?.id ?? null);
    setActiveItem(event.active?.data?.current?.item ?? null);
  };

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;

    setActiveId(null);
    setActiveItem(null);

    const dx = delta?.x ?? 0;
    const dy = delta?.y ?? 0;
    const distance = Math.hypot(dx, dy);

    if (distance < 5) return;

    if (!over) return;

    const zoneId = over.id;
    const droppedObj = active?.data?.current?.item;
    if (!droppedObj) return;

    setDropped((prev) => ({
      ...prev,
      [zoneId]: [droppedObj],
    }));
  };


  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
  };

  const clearZone = (zoneId) =>
    setDropped((prev) => {
      const copy = { ...prev };
      delete copy[zoneId];
      return copy;
    });

  const value = useMemo(
    () => ({
      activeId,
      items,
      setItems,
      dropped,
      setDropped,
      addItem: (item) => setItems((s) => [...s, item]),
      removeItem: (id) => setItems((s) => s.filter((i) => i.id !== id)),
      clearZone,
    }),
    [activeId, items, dropped]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <DndKitContext.Provider value={value}>{children}</DndKitContext.Provider>

      {/* <DragOverlay dropAnimation={{ duration: 120 }}>
        {activeItem ? (
          <div style={{ width: 140, height: 100, boxShadow: "0 8px 20px rgba(0,0,0,0.2)", borderRadius: 6, overflow: "hidden" }}>
            <img
              src={activeItem.img}
              alt={activeItem.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ) : null}
      </DragOverlay> */}
    </DndContext>
  );
}
