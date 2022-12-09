import { useEffect } from "react";
import { Register } from "../types";

type RegEditorProps = {
	registers: Register[];
	handleRegisterChange: (value: string, name: string) => void;
};

const RegEditor = ({ registers, handleRegisterChange }: RegEditorProps) => {
	return (
		<>
			<div className="font-semibold text-white">Registers</div>
			<div className="overflow-hidden rounded-md overlay">
				<div className="flex w-full justify-center overflow-y-auto text-xs bg-white h-[29.6rem]">
					<table className="border-separate table-auto border-spacing-3">
						<thead className="text-left">
							<tr>
								<th className="p-1 px-3 rounded-md bg-slate-200">Value</th>
								<th className="p-1 px-3 rounded-md bg-slate-200">Register</th>
								<th className="p-1 px-3 rounded-md bg-slate-200">Hexadecimal</th>
								<th className="p-1 px-3 rounded-md bg-slate-200">Binary</th>
							</tr>
						</thead>
						<tbody className="font-code">
							{registers.map((register, index) => (
								<tr key={index}>
									<td>
										{register.name === "x0" ? (
											0
										) : (
											<input
												type="text"
												className="w-24 p-1 text-xs rounded-sm form-input"
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
									<td>0x{register.hex}</td>
									<td>0b{register.bin}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default RegEditor;
