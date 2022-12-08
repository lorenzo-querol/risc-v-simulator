const CurrentLine = ({ currentLine }: { currentLine: string }) => {
	return (
		<>
			<div className="font-semibold text-white">Current Line</div>
			<div className="flex items-center p-4 text-xs bg-white rounded-md">
				{currentLine === "" ? "Waiting for program to run..." : currentLine}
			</div>
		</>
	);
};

export default CurrentLine;
