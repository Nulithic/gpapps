const Item = ({ id, dragOverlay }: any) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <div style={style} className="flex items-center justify-center w-full h-12 mb-1 pl-1 bg-slate-600 rounded select-none">
      {id}
    </div>
  );
};

export default Item;
