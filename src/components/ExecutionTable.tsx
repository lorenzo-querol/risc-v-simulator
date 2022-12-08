const ExecutionTable = () => {
	return (
		<div className="space-y-4">
			<div className="font-semibold text-white">Execution Table</div>

			<div className="p-4 bg-white rounded-md">
				<table>
					<tr>
						<th>Instruction</th>
					</tr>
					<tr>
						<th>IR</th>
					</tr>
					<tr>
						<th>PC</th>
					</tr>
					<tr>
						<th>NPC</th>
					</tr>
					<tr>
						<th>A</th>
					</tr>
					<tr>
						<th>B</th>
					</tr>
					<tr>
						<th>IMM</th>
					</tr>
					<tr>
						<th>COND</th>
					</tr>
					<tr>
						<th>ALU</th>
					</tr>
					<tr>
						<th>LMD</th>
					</tr>
					<tr>
						<th>RN</th>
					</tr>
				</table>
			</div>
		</div>
	);
};

export default ExecutionTable;
