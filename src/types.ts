export type Mode = {
	id: number;
	name: string;
};

export type Register = {
	name: string;
	value: number;
	bin: string;
	hex: string;
};

export type Instruction = {
	memoryLocation: string;
	hexOpcode: string;
	binOpcode: string;
	type: string;
};

export type ExecutionTableType = {
	IR: string[];
	PC: string[];
	NPC: string[];
	A: string[];
	B: string[];
	IMM: string[];
	COND: string[];
	ALU: string[];
	LMD: string[];
	RN: string[];
};

export type DataEntry = {
	memoryLocation: string;
	value: number;
	bin: string;
	hex: string;
};
