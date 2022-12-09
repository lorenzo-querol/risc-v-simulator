import { Instruction } from "../types";

type OpcoderVersionProps = {
	instructions: Instruction[];
};

const OpcodeVersion = ({ instructions }: OpcoderVersionProps) => {
	return (
		<div className="space-y-4">
			<div className="font-semibold text-white">Program Opcode</div>
			<div className="flex w-full overflow-y-auto text-xs bg-white rounded-md h-fit">
				<table className="border-separate table-auto border-spacing-3">
					<thead className="text-left">
						<tr>
							<th className="p-1 px-3 text-center rounded-md bg-slate-200">
								Memory Location
							</th>
							<th className="p-1 px-3 text-center rounded-md bg-slate-200">
								Hex Opcode
							</th>
						</tr>
					</thead>
					<tbody className="font-code">
						{instructions.map((instruction, index) => (
							<tr key={index}>
								<td className="text-center">{instruction.memoryLocation}</td>
								<td className="text-center">{instruction.hexOpcode}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OpcodeVersion;
