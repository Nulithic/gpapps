interface SpinnerProps {
  size: number;
}

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <svg className="animate-spin text-primary" width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
      <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" opacity=".2" />
        <path d="M7.25.75A.75.75 0 0 1 8 0a8 8 0 0 1 8 8 .75.75 0 0 1-1.5 0A6.5 6.5 0 0 0 8 1.5a.75.75 0 0 1-.75-.75z" />
      </g>
    </svg>
  );
};

export default Spinner;
