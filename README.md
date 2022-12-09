# RISC-V Simulator

This is a RISC-V simulator written in TypeScript. It is a work in progress, but support for RV32I is functional. The simulator is written for sequential execution, and does not support pipelining.

## Current Features

The simulator can be ran in **Single-Step Execution Mode**, where the user can step through each instruction, or in **Full Execution Mode**, where the simulator will run until it reaches the end of the program.

The user can also set initial values for the registers x1-x31, and the memory locations 0x00000000-0x00007FF. The program will run from memory location 0x00001000-0x00001FFF.

The user can also see the internal registers per cycle of the written program, which includes the PC, NPC, IR, A, B, IMM, ALU, COND, LMD, and RN registers.

## Instructions supported

-   ADDI
-   ADD
-   SUB
-   OR
-   ORI
-   BEQ
-   BNE
-   BLT
-   SW
-   LW

To install dependencies for the project, type the following command in the terminal:

```
npm install
```

To run the project locally, type the following command in the terminal:

```
npm run start
```

This should open a new tab in your browser with the project running.
