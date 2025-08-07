"use client";
import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { FetchCourseSuccessRes } from "../../api/fetch-course.api";
import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { DragHandleOutlined, EditOutlined } from "@mui/icons-material";

type CourseChaptersListProps = {
  defaultChapters: FetchCourseSuccessRes["data"]["chapters"];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  isReorderingActive: boolean;
};
export function CourseChaptersList({
  defaultChapters,
  onReorder,
  onEdit,
  isReorderingActive,
}: CourseChaptersListProps) {
  const [chapters, setChapters] = React.useState(defaultChapters);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id) + 1,
    }));

    onReorder(bulkUpdateData);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <Stack
            sx={{ gap: 2, opacity: isReorderingActive ? 0.7 : 1 }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {chapters.map((chapter, i) => (
              <Draggable key={chapter.id} draggableId={chapter.id} index={i}>
                {(provided) => (
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: chapter.isPublished ? "secondary" : "primary",
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <Stack
                      direction={"row"}
                      sx={{ alignItems: "center", gap: 2 }}
                    >
                      <IconButton
                        sx={{ cursor: "grab" }}
                        disabled={isReorderingActive}
                        {...provided.dragHandleProps}
                      >
                        <DragHandleOutlined />
                      </IconButton>
                      <Typography component={"p"} variant="body1">
                        {chapter.title}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      sx={{ alignItems: "center", gap: 1 }}
                    >
                      {chapter.isFree && (
                        <Chip label="Free" variant="outlined" />
                      )}
                      <Chip
                        label={chapter.isPublished ? "Published" : "Draft"}
                        variant={chapter.isPublished ? undefined : "outlined"}
                      />
                      <IconButton
                        disabled={isReorderingActive}
                        onClick={() => onEdit(chapter.id)}
                      >
                        <EditOutlined />
                      </IconButton>
                    </Stack>
                  </Stack>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
