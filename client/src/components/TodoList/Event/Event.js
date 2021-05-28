import { DeleteForever, DoneAll } from '@material-ui/icons';

const Event = ({ event, onDoneEvent, onDeleteItem }) => {
  return (
    <div className="items">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DoneAll
          style={{ color: '#90c695', cursor: 'pointer', paddingRight: '10px' }}
          onClick={() => onDoneEvent(event)}
        />
        <div>
          <p>{event.event}</p>
          <p style={{ fontSize: '13px' }}>
            {event.day} at {event.time}
          </p>
        </div>
      </div>
      <DeleteForever
        style={{ color: '#F88379', cursor: 'pointer' }}
        onClick={() => onDeleteItem('event', event)}
      />
    </div>
  );
};

export default Event;
