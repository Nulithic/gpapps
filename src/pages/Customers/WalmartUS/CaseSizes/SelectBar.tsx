interface SelectBarProps {
  selection: number;
  handleDelete: () => void;
}

const SelectBar = ({ selection, handleDelete }: SelectBarProps) => {
  return (
    <>
      <div className={`flex flex-row justify-between items-center transition-all ease-in-out duration-300 ${selection ? "h-9" : "h-0 !m-0"}`}>
        <div className={`flex flex-row items-center space-x-2 transition-all ease-in-out duration-300 ${selection ? "opacity-100" : "opacity-0"}`}>
          <p>{`${selection} Selected`}</p>
          <button className="btn btn-mid btn-error" disabled={selection === 0} onClick={handleDelete}>
            Delete Selected
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectBar;
