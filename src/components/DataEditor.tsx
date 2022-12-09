import { DataEntry } from "../types";

type DataEditorProps = {
	data: DataEntry[];
};

const DataEditor = ({ data }: DataEditorProps) => {
	return (
		<div className="space-y-4">
			<div className="font-semibold text-white">Data Table</div>
			<div className="flex w-full justify-center overflow-y-auto text-xs bg-white rounded-md h-fit">
				<table className="text-center border-separate table-auto border-spacing-3">
					<thead className="">
						<tr>
							<th className="p-1 px-3 rounded-md bg-slate-200">Memory Location</th>
							<th className="p-1 px-3 rounded-md bg-slate-200">Decimal</th>
							<th className="p-1 px-3 rounded-md bg-slate-200">Hexadecimal</th>
							<th className="p-1 px-3 rounded-md bg-slate-200">Binary</th>
						</tr>
					</thead>
					<tbody className="font-code">
						{data.map((dataEntry, index) => (
							<tr key={index}>
								<td>{dataEntry.memoryLocation}</td>
								<td>{dataEntry.value}</td>
								<td>0x{dataEntry.hex}</td>
								<td>0b{dataEntry.bin}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DataEditor;
