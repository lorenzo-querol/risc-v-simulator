import { DataEntry } from "../types";
import { useState } from "react";

type DataEditorProps = {
	data: DataEntry[];
	handleDataChange: (value: string, memoryLocation: string) => void;
};

const DataEditor = ({ data, handleDataChange }: DataEditorProps) => {
	const [memoryLocation, setMemoryLocation] = useState("");
	const [value, setValue] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleDataChange(value, memoryLocation);
		setMemoryLocation("");
		setValue("");
	};

	return (
		<div className="space-y-4">
			<div className="font-semibold text-white flex space-x-4 items-center ">
				<div>Data Table</div>
				<form onSubmit={handleSubmit} className="space-x-4">
					<label className="text-xs">Address</label>
					<input
						type="text"
						className="w-24 p-1 text-xs rounded-md form-input text-black"
						value={memoryLocation}
						onChange={(event) => {
							setMemoryLocation(event.target.value);
						}}
					/>
					<label className="text-xs">Value</label>
					<input
						type="text"
						value={value}
						className="w-24 p-1 text-xs rounded-md form-input text-black"
						onChange={(event) => {
							setValue(event.target.value);
						}}
					/>
					<input
						className="cursor-pointer bg-green-600 px-2 rounded-md py-0.5"
						type="submit"
						value="Add"
					/>
				</form>
			</div>
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
