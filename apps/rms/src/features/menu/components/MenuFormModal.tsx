import { useCreateMenuMutation, useUpdateMenuMutation } from "@/features/menu/menuApiSlice";
import { type MenuFormData, menuSchema } from "@/features/menu/menuSchema";
import type { Menu } from "@/features/menu/types/Menu";
import { handleApiError } from "@/utils/handleApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import BaseModal from "../../../components/common/BaseModal";

export default function MenuFormModal({
	isOpen,
	onClose,
	selectedMenu,
}: {
	isOpen: boolean;
	onClose: () => void;
	selectedMenu: Menu | null;
}) {
	const { t } = useTranslation();
	const [createMenu, { isLoading: isCreating }] = useCreateMenuMutation();
	const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MenuFormData>({
		resolver: zodResolver(menuSchema),
		defaultValues: {
			name: selectedMenu?.name || "",
		},
	});

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

	const onSubmit = async (data: MenuFormData) => {
		try {
			if (selectedMenu) {
				await updateMenu({ id: selectedMenu._id, body: data }).unwrap();
				toast.success(t("messages.menuUpdated"));
			} else {
				await createMenu(data).unwrap();
				toast.success(t("messages.menuCreated"));
			}
			onClose();
		} catch (error) {
			handleApiError(error);
		}
	};

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			title={selectedMenu ? t("titles.editMenu") : t("titles.createMenu")}
		>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="form-control">
					<label className="label" htmlFor="name">
						<span className="label-text">{t("labels.menuName")}</span>
					</label>
					<input type="text" {...register("name")} className="input input-bordered" />
					{errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
				</div>

				<div className="modal-action">
					<button type="button" className="btn" onClick={onClose}>
						{t("buttons.cancel")}
					</button>
					<button type="submit" className="btn btn-primary" disabled={isCreating || isUpdating}>
						{isCreating || isUpdating ? "..." : selectedMenu ? t("buttons.update") : t("buttons.create")}
					</button>
				</div>
			</form>
		</BaseModal>
	);
}
