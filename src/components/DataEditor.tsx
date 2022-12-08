const DataEditor = () => {
	return (
		<div className="space-y-4">
			<div className="font-semibold text-white">Data Table</div>
			<div className="flex w-full justify-center overflow-y-auto text-xs bg-white rounded-md h-[29.6rem]">
				<table className="border-separate table-auto border-spacing-3">
					<thead className="text-left">
						<tr>
							<th className="p-1 px-3 rounded-md bg-slate-200">Memory Location</th>
							<th className="p-1 px-3 rounded-md bg-slate-200">Initial Value</th>
							<th className="p-1 px-3 rounded-md bg-slate-200">Hexadecimal</th>
							<th className="p-1 px-3 rounded-md bg-slate-200">Binary</th>
						</tr>
					</thead>
					<tbody className="font-code">
						{/* {instructions.map((instruction, index) => (
							<tr>
								<td>{instruction.memoryLocation}</td>
								<td>{instruction.instruction}</td>
							</tr>
						))} */}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DataEditor;
