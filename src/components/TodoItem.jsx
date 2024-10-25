function TodoItem({ item, onUpdateItem, onDeleteItem }) {
  const { _id: id, title, description, isCompleted } = item;

  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input
          type="checkbox"
          name="complete"
          id="complete"
          checked={isCompleted}
          onChange={() => onUpdateItem(id)}
        />
        <button className="btn" onClick={() => onDeleteItem(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
