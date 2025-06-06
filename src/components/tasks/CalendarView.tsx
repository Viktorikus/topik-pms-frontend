import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from '../../styles/calendar.module.css';
import { useTasks } from '../../hooks/useTasks';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface TaskEvent extends Event {
  id: string;
  status: 'todo' | 'in_progress' | 'done';
}

const CalendarView = () => {
  const { tasks } = useTasks();
  const [selectedEvent, setSelectedEvent] = useState<TaskEvent | null>(null);

  // Konversi tasks ke format event kalender
  const events: TaskEvent[] = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: new Date(task.dueDate ?? Date.now()),
    end: new Date(new Date(task.dueDate ?? Date.now()).setHours(23, 59, 59)),
    status: task.status,
  }));

  const eventStyleGetter = (event: TaskEvent) => {
    let backgroundColor = '';
    switch (event.status) {
      case 'done':
        backgroundColor = '#4BC0C0'; // Hijau
        break;
      case 'in_progress':
        backgroundColor = '#36A2EB'; // Biru
        break;
      default:
        backgroundColor = '#FF6384'; // Merah
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        color: 'white',
        border: 'none',
      },
    };
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => setSelectedEvent(event)}
      />

      {/* Modal detail task */}
      {selectedEvent && (
        <div className={styles.eventModal}>
          <h3>{selectedEvent.title}</h3>
          <p>Due: {selectedEvent.start ? format(selectedEvent.start, 'PPP') : 'No due date'}</p>
          <p>Status: {selectedEvent.status.replace('_', ' ')}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CalendarView;