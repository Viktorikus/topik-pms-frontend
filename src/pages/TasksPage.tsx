import { useState } from 'react';
// import Modal from '../common/Modal';
import Modal from '../components/common/Modal'; // Update the path if Modal is in 'components'
import CalendarView from '../components/tasks/CalendarView'; 
import KanbanBoard from '../components/tasks/KanbanBoard';

const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <h1>Tasks Calendar</h1>
        <CalendarView />
      <h1>Task Board</h1>
        <KanbanBoard />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <form>
          <input type="text" placeholder="Task title" />
          <button type="submit">Create</button>
        </form>
      </Modal>
    </div>
  );
};