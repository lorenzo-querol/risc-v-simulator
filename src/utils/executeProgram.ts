import { Instruction } from "../types";
import { MEMORY_LOCATIONS, INSTRUCTIONS_OPCODES } from "../constants";

const getOperation = (funct3: string, opcode: string) => {
	const instruction = INSTRUCTIONS_OPCODES.find(
		(instruction) => instruction.funct3 === funct3 && instruction.opcode === opcode,
	);

	if (!instruction) throw new Error("Unsupported instruction");

	return instruction.name;
};

const executeOperation = (currentPC: string, operation: string, binCode: string, type: string) => {
	const A = parseInt(binCode.slice(12, 16), 2);
	const B = parseInt(binCode.slice(7, 12), 2);
	const IMM = parseInt(binCode.slice(0, 12), 2);
	let COND = 0;
	let ALU;

	switch (operation) {
		case "addi":
			ALU = A + IMM;
			break;

		case "ori":
			ALU = A | IMM;
			break;

		case "add":
			ALU = A + B;
			break;

		case "or":
			ALU = A | B;
			break;

		case "sub":
			ALU = A - B;
			break;

		case "sw":
			ALU = A + IMM;
			break;

		case "lw":
			ALU = A + IMM;
			break;

		case "beq":
			ALU = parseInt(currentPC, 16) + (IMM << 1);
			ALU = A !== B ? 1 : 0;
			break;

		case "bne":
			ALU = parseInt(currentPC, 16) + (IMM << 1);
			ALU = A !== B ? 1 : 0;
			break;

		case "blt":
			ALU = parseInt(currentPC, 16) + (IMM << 1);
			COND = A < B ? 1 : 0;
			break;

		default:
			throw new Error("Unsupported instruction");
	}

	return [ALU.toString(16).padStart(8, "0").toUpperCase(), COND.toString()];
};

export default function executeProgram(instructions: Instruction[]) {
	let IR: string[] = [],
		PC: string[] = [],
		NPC: string[] = [],
		A: string[] = [],
		B: string[] = [],
		IMM: string[] = [],
		COND: string[] = [],
		ALU: string[] = [],
		LMD: string[] = [],
		RN: string[] = [];

	let operation;
	let branchResults;
	let currentPC = MEMORY_LOCATIONS.find(
		(instruction: any) => instruction.name === "PROGRAM_START",
	)?.address!;

	instructions.map((instruction, index) => {
		// IF cycle
		IR.push(instruction.hexOpcode);
		PC.push(parseInt(currentPC, 16).toString(16).padStart(8, "0").toUpperCase());
		NPC.push((parseInt(currentPC, 16) + 4).toString(16).padStart(8, "0").toUpperCase());

		// ID cycle
		A.push(instruction.binOpcode.slice(12, 17));
		B.push(instruction.binOpcode.slice(7, 12));

		if (instruction.type === "I" || instruction.type === "R")
			IMM.push(
				parseInt(instruction.binOpcode.slice(0, 13), 2)
					.toString(16)
					.padStart(12, "0")
					.toUpperCase(),
			);

		if (instruction.type === "B" || instruction.type === "S")
			IMM.push(
				parseInt(instruction.binOpcode.slice(0, 7) + instruction.binOpcode.slice(20, 25), 2)
					.toString(16)
					.padStart(12, "0")
					.toUpperCase(),
			);

		// EX cycle
		operation = getOperation(
			instruction.binOpcode.slice(17, 20),
			instruction.binOpcode.slice(25, 32),
		);

		branchResults = executeOperation(
			currentPC,
			operation,
			instruction.binOpcode,
			instruction.type,
		);

		COND.push(branchResults[1]);
		ALU.push(branchResults[0]);

		// MEM cycle
		if (COND[index] === "1") currentPC = ALU[index];
		else PC[index] = NPC[index];

		currentPC = PC[index];
	});

	return [IR, PC, NPC, A, B, IMM, COND, ALU, LMD, RN];
}
