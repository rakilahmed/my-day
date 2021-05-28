import { DeleteForever } from '@material-ui/icons';

const CompletedItem = ({ completedItem, onDeleteItem }) => {
  return (
    <div
      className="items"
      style={{ textDecoration: 'line-through', color: '#989898' }}
    >
      {completedItem.item}
      <DeleteForever
        style={{ color: '#F88379', cursor: 'pointer' }}
        onClick={() => onDeleteItem('completed', completedItem)}
      />
    </div>
  );
};

export default CompletedItem;
