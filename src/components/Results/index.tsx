import { LegacyRef } from "react";

const Results = ({ textRef }: { textRef: LegacyRef<HTMLTextAreaElement> | undefined }) => {
  return <textarea className="textarea text-sm bg-base-300 h-auto w-full rounded resize-none focus:outline-none" readOnly ref={textRef}></textarea>;
};

export default Results;
