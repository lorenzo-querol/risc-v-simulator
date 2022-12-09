const CurrentLine = ({
	currentLine,
	errorMessage,
}: {
	currentLine: string;
	errorMessage: string;
}) => {
	return (
		<>
			<div className="font-semibold text-white">Current Line / Error Log</div>
			<div className="flex items-center p-4 text-xs bg-white rounded-md font-code">
				{currentLine !== "" && currentLine}
				{errorMessage !== "" && (
					<span className="font-bold text-red-600">{errorMessage}</span>
				)}
				{currentLine === "" && errorMessage === "" && (
					<span>Waiting for program to run...</span>
				)}
			</div>
		</>
	);
};

export default CurrentLine;
