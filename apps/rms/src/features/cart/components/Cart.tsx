import { useCreateOrderMutation } from "@/features/orders/orderApiSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { handleApiError } from "@/utils/handleApiError";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { clearCart, removeItem, updateQuantity } from "../cartSlice";

export default function Cart() {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { items, total } = useAppSelector((state) => state.cart);
	const [createOrder, { isLoading }] = useCreateOrderMutation();
	const [notes, setNotes] = useState("");
	const [showNotes, setShowNotes] = useState(false);

	const handleCreateOrder = async () => {
		if (items.length === 0) {
			toast.error(t("errors.emptyCart"));
			return;
		}

		try {
			await createOrder({
				items: items.map((item) => ({
					menuItemId: item.item._id,
					quantity: item.quantity,
				})),
				notes: notes.trim() || undefined,
			}).unwrap();

			toast.success(t("messages.orderCreated"));
			dispatch(clearCart());
			setNotes("");
		} catch (error) {
			handleApiError(error);
		}
	};

	const handleClearCart = () => {
		if (window.confirm(t("messages.confirmClearCart"))) {
			dispatch(clearCart());
			toast.success(t("messages.cartCleared"));
		}
	};

	if (items.length === 0) {
		return <div className="p-4 text-center text-gray-500">{t("messages.cartEmpty")}</div>;
	}

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-auto">
				{items.map((cartItem) => (
					<div key={cartItem.item._id} className="flex flex-col p-4 border-b border-base-200">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<h3 className="font-medium">{cartItem.item.name}</h3>
								<p className="text-sm text-gray-500">
									{cartItem.item.price.toFixed(2)} {cartItem.item.currency}
								</p>
							</div>
							<button
								type="button"
								onClick={() => dispatch(removeItem(cartItem.item._id))}
								className="w-12 h-12 p-0 touch-manipulation btn btn-ghost btn-sm"
								aria-label={t("tooltips.removeFromCart")}
							>
								<Trash2 className="w-5 h-5 text-error" />
							</button>
						</div>
						<div className="flex items-center justify-between mt-2">
							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={() =>
										dispatch(
											updateQuantity({
												itemId: cartItem.item._id,
												quantity: cartItem.quantity - 1,
											}),
										)
									}
									className="w-12 h-12 p-0 touch-manipulation btn btn-ghost btn-sm"
									aria-label={t("tooltips.decreaseQuantity")}
								>
									<Minus className="w-5 h-5" />
								</button>
								<span className="w-8 text-lg text-center">{cartItem.quantity}</span>
								<button
									type="button"
									onClick={() =>
										dispatch(
											updateQuantity({
												itemId: cartItem.item._id,
												quantity: cartItem.quantity + 1,
											}),
										)
									}
									className="w-12 h-12 p-0 touch-manipulation btn btn-ghost btn-sm"
									aria-label={t("tooltips.increaseQuantity")}
								>
									<Plus className="w-5 h-5" />
								</button>
							</div>
							<span className="font-medium">
								{(cartItem.item.price * cartItem.quantity).toFixed(2)} {cartItem.item.currency}
							</span>
						</div>
					</div>
				))}
			</div>
			<div className="p-4 space-y-4 border-t">
				{!showNotes ? (
					<button
						type="button"
						onClick={() => setShowNotes(true)}
						className="w-full h-12 touch-manipulation btn btn-ghost"
					>
						{t("buttons.addNote")}
					</button>
				) : (
					<div className="w-full form-control">
						<label className="label" htmlFor="orderNotes">
							<span className="font-medium label-text">{t("labels.orderNotes")}</span>
							<button
								type="button"
								onClick={() => {
									setShowNotes(false);
									setNotes("");
								}}
								className="h-10 touch-manipulation btn btn-ghost btn-sm"
							>
								{t("buttons.cancel")}
							</button>
						</label>
						<textarea
							id="orderNotes"
							className="w-full h-24 resize-none textarea textarea-bordered"
							placeholder={t("placeholders.orderNotes")}
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							maxLength={500}
						/>
					</div>
				)}

				<div className="flex items-center justify-between">
					<span className="text-lg font-medium">{t("labels.total")}</span>
					<span className="text-lg font-medium">
						{total.toFixed(2)} {items[0]?.item.currency}
					</span>
				</div>

				<button
					type="button"
					onClick={handleClearCart}
					className="w-full h-12 touch-manipulation btn btn-ghost text-error"
				>
					{t("buttons.clearCart")}
				</button>

				<button
					type="button"
					onClick={handleCreateOrder}
					disabled={isLoading}
					className="w-full text-lg h-14 touch-manipulation btn btn-primary"
				>
					{isLoading ? <span className="loading loading-spinner" /> : t("buttons.placeOrder")}
				</button>
			</div>
		</div>
	);
}
