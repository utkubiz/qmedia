import { useGetMenuCategoriesQuery, useUpdateMenuItemMutation } from "@/features/menu/menuApiSlice";
import { type MenuItemFormData, menuItemSchema } from "@/features/menu/menuItemSchema";
import type { MenuItem } from "@/features/menu/types/Menu";
import { handleApiError } from "@/utils/handleApiError";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import BaseModal from "../../../components/common/BaseModal";

interface EditMenuItemModalProps {
	menuId: string;
	item: MenuItem;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditMenuItemModal({ menuId, item, isOpen, onClose }: EditMenuItemModalProps) {
	const { t } = useTranslation();
	const [updateMenuItem, { isLoading }] = useUpdateMenuItemMutation();
	const { data: categories = [] } = useGetMenuCategoriesQuery(menuId);
	const [isCustomCategory, setIsCustomCategory] = useState(false);
	const [isAvailable, setIsAvailable] = useState(item.isAvailable);
	const [isActive, setIsActive] = useState(item.isActive);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<MenuItemFormData>({
		resolver: zodResolver(menuItemSchema),
		defaultValues: {
			name: item.name,
			description: item.description,
			price: item.price,
			category: item.category,
		},
	});

	const onSubmit = async (data: MenuItemFormData) => {
		try {
			await updateMenuItem({
				menuId,
				itemId: item._id,
				body: {
					...data,
					isAvailable,
					isActive,
				},
			}).unwrap();
			toast.success(t("messages.menuItemUpdated"));
			onClose();
		} catch (error) {
			handleApiError(error);
		}
	};

	const categoryField = (
		<div className="form-control">
			<label htmlFor="category" className="label">
				<span className="label-text">{t("labels.itemCategory")}</span>
			</label>
			<div className="space-y-2">
				{!isCustomCategory ? (
					<>
						<select
							{...register("category")}
							className="select select-bordered w-full"
							value={item.category}
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
							className="input input-bordered flex-1"
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
			{errors.category && <p className="text-error text-sm mt-1">{errors.category.message}</p>}
		</div>
	);

	return (
		<BaseModal isOpen={isOpen} onClose={onClose} title={t("titles.editMenuItem")}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="form-control">
					<label className="label" htmlFor="name">
						<span className="label-text">{t("labels.itemName")}</span>
					</label>
					<input type="text" {...register("name")} className="input input-bordered" />
					{errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
				</div>

				<div className="form-control">
					<label className="label" htmlFor="description">
						<span className="label-text">{t("labels.itemDescription")}</span>
					</label>
					<textarea {...register("description")} className="textarea textarea-bordered" />
				</div>

				<div className="form-control">
					<label className="label" htmlFor="price">
						<span className="label-text">{t("labels.itemPrice")}</span>
					</label>
					<input
						type="number"
						step="0.01"
						{...register("price", { valueAsNumber: true })}
						className="input input-bordered"
					/>
					{errors.price && <p className="text-error text-sm mt-1">{errors.price.message}</p>}
				</div>

				{categoryField}

				<div className="form-control">
					<label className="label cursor-pointer">
						<span className="label-text">{t("labels.available")}</span>
						<input
							type="checkbox"
							className="toggle"
							checked={isAvailable}
							onChange={(e) => setIsAvailable(e.target.checked)}
						/>
					</label>
				</div>

				<div className="form-control">
					<label className="label cursor-pointer">
						<span className="label-text">{t("labels.active")}</span>
						<input
							type="checkbox"
							className="toggle"
							checked={isActive}
							onChange={(e) => setIsActive(e.target.checked)}
						/>
					</label>
				</div>

				<div className="modal-action">
					<button type="button" className="btn" onClick={onClose}>
						{t("buttons.cancel")}
					</button>
					<button type="submit" className="btn btn-primary" disabled={isLoading}>
						{isLoading ? "..." : t("buttons.update")}
					</button>
				</div>
			</form>
		</BaseModal>
	);
}
