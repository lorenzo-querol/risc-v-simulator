import { ExecutionTableType } from "../types";

type ExecutionTableProps = {
	executionTable: ExecutionTableType;
};

const ExecutionTable = ({ executionTable }: ExecutionTableProps) => {
	let counter = 1;
	return (
		<div className="space-y-4">
			<div className="font-semibold text-white">Execution Table</div>

			<div className="p-4 bg-white rounded-md w-full overflow-x-auto">
				<table className="table-auto text-center border-separate border-spacing-2">
					<tbody>
						<tr>
							<th>Instruction</th>
							{executionTable.IR.map(
								(instruction, index) =>
									instruction !== " " && (
										<th key={index}>{`Cycle ${counter++}`}</th>
									),
							)}
						</tr>
						<tr>
							<th>IR</th>
							{executionTable.IR.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>PC</th>
							{executionTable.PC.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>NPC</th>
							{executionTable.NPC.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>A</th>
							{executionTable.A.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>B</th>
							{executionTable.B.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>IMM</th>
							{executionTable.IMM.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>COND</th>
							{executionTable.COND.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>ALU</th>
							{executionTable.ALU.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>LMD</th>
							{executionTable.LMD.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
						<tr>
							<th>RN</th>
							{executionTable.RN.map(
								(instruction, index) =>
									instruction !== " " && (
										<td className="font-code p-1" key={index}>
											{instruction}
										</td>
									),
							)}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ExecutionTable;
