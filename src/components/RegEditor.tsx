import { useEffect } from "react";
import { Register } from "../types";

type RegEditorProps = {
	registers: Register[];
	handleRegisterChange: (value: string, name: string) => void;
};

const RegEditor = ({ registers, handleRegisterChange }: RegEditorProps) => {
	return (
		<>
			<div className="py-2 font-semibold text-white">Registers</div>
			<div className="bg-white rounded-md text-xs h-[27rem] overflow-y-auto overflow">
				<table className="table-fixed border-separate border-spacing-3">
					<thead className="text-left">
						<tr>
							<th className="bg-slate-200 p-1 px-3 rounded-lg">Value</th>
							<th className="bg-slate-200 p-1 px-3 rounded-lg">Register</th>
							<th className="bg-slate-200 p-1 px-3 rounded-lg">Hexadecimal</th>
							<th className="bg-slate-200 p-1 px-3 rounded-lg">Binary</th>
						</tr>
					</thead>
					<tbody className="font-code">
						{registers.map((register, index) => (
							<tr>
								<td>
									{register.name === "x0" ? (
										0
									) : (
										<input
											type="text"
											className="form-input text-xs w-full rounded-sm p-1"
											onChange={(event) => {
												handleRegisterChange(
													event.target.value === ""
														? "0"
														: event.target.value,
													register.name,
												);
											}}
										/>
									)}
								</td>
								<td className="text-center">{register.name}</td>
								<td>0x{register.hex.toUpperCase().padStart(8, "0")}</td>
								<td>0b{register.bin.padStart(32, "0")}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default RegEditor;
