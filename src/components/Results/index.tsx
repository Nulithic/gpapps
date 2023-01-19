import { useState, useEffect, LegacyRef } from "react";

const Results = ({ textRef }: { textRef: LegacyRef<HTMLTextAreaElement> | undefined }) => {
  return <textarea className="textarea text-lg bg-base-300 h-auto w-full rounded resize-none focus:outline-none" readOnly ref={textRef}></textarea>;
};

export default Results;
