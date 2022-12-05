import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { Mode } from "../types";
import { MODES } from "../constants";

type ModeSelectProps = {
	selectedMode: Mode;
	handleModeSelect: (mode: Mode) => void;
};

const ModeSelect = ({ selectedMode, handleModeSelect }: ModeSelectProps) => {
	return (
		<Listbox value={selectedMode} onChange={handleModeSelect}>
			<div className="relative z-10 w-64">
				<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
					<span className="font-semibold text-gray-900">{selectedMode.name}</span>
					<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5 text-gray-900"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
							/>
						</svg>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{MODES.map((mode, modeIdx) => (
							<Listbox.Option
								key={modeIdx}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? "bg-amber-100 text-amber-900" : "text-gray-900"
									}`
								}
								value={mode}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected ? "font-medium" : "font-normal"
											}`}
										>
											{mode.name}
										</span>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M4.5 12.75l6 6 9-13.5"
													/>
												</svg>
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};

export default ModeSelect;
