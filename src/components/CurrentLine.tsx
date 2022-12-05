const CurrentLine = ({ currentLine }: { currentLine: string }) => {
	return (
		<>
			<div className="py-2 font-semibold text-white">Current Line</div>
			<div className="p-4 bg-white rounded-md text-xs items-center flex">
				{currentLine === "" ? "Waiting for program to run..." : currentLine}
			</div>
		</>
	);
};

export default CurrentLine;
