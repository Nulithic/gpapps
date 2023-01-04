import { useState, useEffect } from "react";
import socket from "@/libs/socket";

interface ProgressBtnType {
  btnName: string;
  progressKey: string;
  maxProgressKey: string;
  progressKey2?: string;
  maxProgressKey2?: string;
  secondBar: boolean;
  method: (socketID: string) => any;
}

const ProgressButton = ({ btnName, progressKey, maxProgressKey, progressKey2, maxProgressKey2, secondBar, method }: ProgressBtnType) => {
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(100);
  const [progress2, setProgress2] = useState(0);
  const [maxProgress2, setMaxProgress2] = useState(100);

  const handleProgress = async () => {
    setProgress(0);
    socket.on(maxProgressKey, (args) => {
      setMaxProgress(args);
    });
    socket.on(progressKey, (args) => {
      setProgress(args);
    });

    if (secondBar) {
      setProgress2(0);
      socket.on(maxProgressKey2 as string, (args) => {
        setMaxProgress2(args);
      });
      socket.on(progressKey2 as string, (args) => {
        setProgress2(args);
      });
    }

    const data = await method(socket.id);
    if (data) {
      socket.off(maxProgressKey);
      socket.off(progressKey);
      if (secondBar) {
        socket.off(maxProgressKey2);
        socket.off(progressKey2);
      }
    }
  };

  return (
    <>
      {secondBar ? (
        (progress > 0 || progress2 > 0) && (progress < maxProgress || progress2 < maxProgress2) ? (
          <>
            <progress className="progress progress-secondary w-56" value={progress} max={maxProgress} />
            <progress className="progress progress-secondary w-56" value={progress2} max={maxProgress2} />
          </>
        ) : (
          <button className="btn btn-mid min-w-[8rem]" onClick={handleProgress}>
            {btnName}
          </button>
        )
      ) : progress > 0 && progress < maxProgress ? (
        <>
          <progress className="progress progress-secondary w-56" value={progress} max={maxProgress} />
        </>
      ) : (
        <button className="btn btn-mid min-w-[8rem]" onClick={handleProgress}>
          {btnName}
        </button>
      )}
    </>
  );
};

export default ProgressButton;
