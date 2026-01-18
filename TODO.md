# Task Manager VS Code Extension: Work Plan

## MVP Features

- [X] **Create a custom Webview panel for the Task Manager UI**
- [X] **Display three columns:**
  - [X] TODO
  - [X] DOING
  - [X] DONE
- [X] **Create Task card**
- [ ] **Implement draggable task cards**
  - [ ] Allow moving tasks between columns
- [ ] **Persist tasks in the workspace (e.g., workspace storage or a JSON file)**

## Future Enhancements

- [X] **Add "steps" to tasks**
  - [ ] Allow adding, editing, and removing steps
  - [ ] Allow checking steps as completed
- [ ] **Task editing (title, description, etc.)**
- [ ] **Task deletion**
- [ ] **Task due dates or priorities**

## Stretch Goals

- [ ] **Integrate with GitHub Issues or other external systems**
- [ ] **Customizable columns**
- [ ] **Keyboard shortcuts for task management**
- [ ] **MCP integration**

### Current

#### Implement Drag and Drop with In-Column Reordering

**Goal:** Add native HTML5 drag and drop functionality to move and reorder task cards both between columns and within the same column. ~~Replace StartColumn with standard column component for consistency.~~

**Implementation Steps:**

1. **Enhance task data model** in [KanbanTaskProps.tsx](src/webview-ui/interface/KanbanTaskProps.tsx)
   - ~~Add `order: number` property to `Task` interface for maintaining sort order within columns~~
   - ~~Update existing task creation logic to assign order values~~
    - size of tasks list is used to set order when creating tasks

2. **Add task reorder handler** in [Kanban.tsx](src/webview-ui/board/Kanban.tsx)
   - ~~Create `moveTask(taskId: string, newStatus: string, newOrder: number)` function~~
   - ~~Reorder tasks array based on drop target location and recalculate order values~~
   - ~~Sort tasks by order property when filtering by status~~

3. **Make TaskCards draggable** in [TaskCard.tsx](src/webview-ui/card/TaskCard.tsx)
   - ~~Add `draggable={true}` attribute~~
   - ~~Implement `onDragStart` to store task ID, current status, and source order in `dataTransfer`~~
   - ~~Add `onDragEnd` handler for cleanup~~

4. **Create DropIndicator component** in [src/webview-ui/card/DropIndicator.tsx](src/webview-ui/card/DropIndicator.tsx)
   - Visual component showing horizontal line at insertion point
   - Receives `visible` and positioning props
   - Style with prominent color/border for visibility

5. **Convert columns to intelligent drop zones** in [column.tsx](src/webview-ui/board/column.tsx)
   - Accept `status`, `tasks`, `onMoveTask`, and `children` props
   - Implement `onDragOver` to calculate insertion index based on mouse Y-coordinate
   - Render DropIndicator component at calculated position
   - Implement `onDrop` to trigger moveTask with new status and order
   - Handle edge cases: empty columns, top/bottom drops, same-column reordering

6. **Update Kanban to use unified columns ---- DONE** in [Kanban.tsx](src/webview-ui/board/Kanban.tsx)
   - Replace StartColumn with column.tsx for all three columns
   - Pass status prop ("todo" | "doing" | "done") to each column
   - Render CreateCard as first child in TODO column
   - Pass moveTask callback to all columns

7. **Add drag visual feedback** in [style.css](src/webview-ui/styling/style.css)
   - `.dragging` class: reduced opacity on source card
   - `.drag-over` class: background highlight on target column
   - `.drop-indicator` class: horizontal line styling (2-3px height, accent color)
   - Cursor styles for draggable elements

**Edge Cases to Handle:**
- Dropping on empty columns
- Dropping at very top or bottom of column
- Dropping in same position (no-op)
- Rapid successive drags (state cleanup)
- Invalid drop targets

**Future Considerations:**
- Persistence will be added in later phase
- Focus on functionality and user experience first