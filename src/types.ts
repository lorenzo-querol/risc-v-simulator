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
