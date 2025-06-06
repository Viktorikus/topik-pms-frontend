import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';
import { useTasks } from '../../hooks/useTasks';
import TaskCard from './TaskCard';
import styles from '../../styles/kanban.module.css';

const statuses = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

const KanbanBoard = () => {
  const { tasks, updateTaskStatus } = useTasks();
  const [taskColumns, setTaskColumns] = useState<Record<string, any[]>>({});

  // Inisialisasi kolom
  useEffect(() => {
    const columns: Record<string, any[]> = {};
    statuses.forEach(status => {
      columns[status.id] = tasks.filter(task => task.status === status.id);
    });
    setTaskColumns(columns);
  }, [tasks]);

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    // Update status task
    const taskId = draggableId;
    const newStatus = destination.droppableId;
    
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.kanbanBoard}>
        {statuses.map((status) => (
          <div key={status.id} className={styles.column}>
            <h3>{status.title}</h3>
            <Droppable droppableId={status.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.taskList}
                >
                  {taskColumns[status.id]?.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;