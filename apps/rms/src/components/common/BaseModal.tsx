import { useEffect } from "react";

interface BaseModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

export default function BaseModal({ isOpen, onClose, title, children }: BaseModalProps) {
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscapeKey);
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<dialog
			className="modal modal-open"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onClose();
				}
			}}
		>
			<div className="modal-box" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
				<h3 className="mb-4 text-lg font-bold">{title}</h3>
				{children}
			</div>
		</dialog>
	);
}
