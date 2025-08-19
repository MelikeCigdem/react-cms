// DraggableItem.js
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Grid } from "@mui/material";

export default function DraggableItem({ item, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(item.id),
    data: { item },
    activationConstraint: {
      delay: 180,   // basılı tutma süresi (ms)
      tolerance: 8  // küçük kaymaları es geç
    }
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    willChange: transform ? "transform" : undefined,
    opacity: isDragging ? 0.6 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "manipulation",
  };

  // listeners'i burada küçük wrapper'a veriyoruz (clickleri bozmasın)
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} style={{ display: "inline-block", width: "100%" }}>
        <Grid item xs={12} sm={6} md={4} lg={4} minHeight={60}>
          {children}
        </Grid>
      </div>
    </div>
  );
}
