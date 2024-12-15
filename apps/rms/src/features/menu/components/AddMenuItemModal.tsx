import { useCreateMenuItemMutation, useGetMenuCategoriesQuery } from "@/features/menu/menuApiSlice";
import { type MenuItemFormData, menuItemSchema } from "@/features/menu/menuItemSchema";
import { handleApiError } from "@/utils/handleApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import BaseModal from "../../../components/common/BaseModal";

interface AddMenuItemModalProps {
	menuId: string;
	isOpen: boolean;
	onClose: () => void;
}

export default function AddMenuItemModal({ menuId, isOpen, onClose }: AddMenuItemModalProps) {
	const { t } = useTranslation();
	const [createMenuItem, { isLoading }] = useCreateMenuItemMutation();
	const { data: categories = [] } = useGetMenuCategoriesQuery(menuId);
	const [isCustomCategory, setIsCustomCategory] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<MenuItemFormData>({
		resolver: zodResolver(menuItemSchema),
	});

	const categoryField = (
		<div className="form-control">
			<label htmlFor="category" className="label">
				<span className="label-text">{t("labels.itemCategory")}</span>
			</label>
			<div className="space-y-2">
				{!isCustomCategory ? (
					<>
						<select
							className="w-full select select-bordered"
							{...register("category")}
							onChange={(e) => {
								if (e.target.value === "custom") {
									setIsCustomCategory(true);
									setValue("category", "");
								} else {
									setValue("category", e.target.value);
								}
							}}
						>
							<option value="">{t("labels.selectCategory")}</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
							<option value="custom">{t("labels.enterCustomCategory")}</option>
						</select>
					</>
				) : (
					<div className="flex gap-2">
						<input
							type="text"
							{...register("category")}
							className="flex-1 input input-bordered"
							placeholder={t("labels.enterCustomCategory")}
						/>
						<button
							type="button"
							className="btn btn-ghost"
							onClick={() => {
								setIsCustomCategory(false);
								setValue("category", "");
							}}
						>
							<ArrowLeft className="w-5 h-5" />
						</button>
					</div>
				)}
			</div>
			{errors.category && <p className="mt-1 text-sm text-error">{errors.category.message}</p>}
		</div>
	);

	const onSubmit = async (data: MenuItemFormData) => {
		try {
			await createMenuItem({ menuId, body: data }).unwrap();
			toast.success(t("messages.menuItemCreated"));
			reset();
			onClose();
		} catch (error) {
			handleApiError(error);
		}
	};

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title={t("titles.addMenuItem")}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="form-control">
					<label htmlFor="name" className="label">
						<span className="label-text">{t("labels.itemName")}</span>
					</label>
					<input id="name" type="text" {...register("name")} className="input input-bordered" />
					{errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
				</div>

				<div className="form-control">
					<label htmlFor="description" className="label">
						<span className="label-text">{t("labels.itemDescription")}</span>
					</label>
					<textarea id="description" {...register("description")} className="textarea textarea-bordered" />
				</div>

				<div className="form-control">
					<label htmlFor="price" className="label">
						<span className="label-text">{t("labels.itemPrice")}</span>
					</label>
					<input
						id="price"
						type="number"
						step="0.01"
						{...register("price", { valueAsNumber: true })}
						className="input input-bordered"
					/>
					{errors.price && <p className="mt-1 text-sm text-error">{errors.price.message}</p>}
				</div>

				{categoryField}

				<div className="modal-action">
					<button type="button" className="btn" onClick={onClose}>
						{t("buttons.cancel")}
					</button>
					<button type="submit" className="btn btn-primary" disabled={isLoading}>
						{isLoading ? "..." : t("buttons.create")}
					</button>
				</div>
			</form>
		</BaseModal>
	);
}
