import CompletedItem from './CompletedItem';

const CompletedItems = ({ completedItems, onDeleteItem }) => {
  return (
    <div>
      {completedItems.length > 0
        ? completedItems.map((completedItem, index) => {
            return (
              <CompletedItem
                key={index}
                completedItem={completedItem}
                onDeleteItem={onDeleteItem}
              />
            );
          })
        : console.log('')}
    </div>
  );
};

export default CompletedItems;
