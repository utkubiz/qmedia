import { useLoginMutation } from "@/features/auth/authApiSlice";
import { setTokens } from "@/features/auth/authSlice";
import { loginSchema } from "@/features/auth/loginSchema";
import { useAppDispatch } from "@/state/store";
import { handleApiError } from "@/utils/handleApiError";
import { isAuthenticated } from "@/utils/isAuthenticated";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import type { z } from "zod";

interface LoginFormInputs {
	tenantId: string;
	email: string;
	password: string;
}

export default function Login() {
	if (isAuthenticated()) {
		return <Navigate to="/" replace />;
	}

	const { t } = useTranslation();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useAppDispatch();

	const [searchParams] = useSearchParams();
	const tenantId = searchParams.get("tenantId");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			tenantId: tenantId ?? "671e78c1a476d560ed40bad9",
			email: "emreutku0@gmail.com",
			password: "emre1992",
		},
	});

	const onSubmit: SubmitHandler<LoginFormInputs> = async (data: z.infer<typeof loginSchema>) => {
		try {
			const userData = await login(data).unwrap();
			dispatch(setTokens(userData));
			navigate("/");
		} catch (error: unknown) {
			handleApiError(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div className="w-full form-control">
				<label className="label" htmlFor="password">
					<span className="label-text">{t("labels.tenantId")}</span>
				</label>
				<input
					{...register("tenantId")}
					type="text"
					disabled={!!tenantId}
					placeholder="671e90baa476d560ed40badf"
					className="w-full input input-bordered"
				/>
			</div>
			<div className="w-full form-control">
				<label className="label" htmlFor="password">
					<span className="label-text">{t("labels.email")}</span>
				</label>
				<input
					{...register("email")}
					type="email"
					name="email"
					placeholder={t("placeholders.email")}
					className="w-full input input-bordered"
				/>
				{errors.email && <p className="mt-2 text-error">{errors.email.message}</p>}
			</div>
			<div className="w-full form-control">
				<label className="label" htmlFor="password">
					<span className="label-text">{t("labels.password")}</span>
				</label>
				<input
					{...register("password")}
					type="password"
					name="password"
					placeholder={t("placeholders.password")}
					className="w-full input input-bordered"
				/>
				{errors.password && <p className="mt-2 text-error">{errors.password.message}</p>}
			</div>
			<div className="pt-4 form-control">
				<button type="submit" className="btn btn-primary btn-block">
					{t("buttons.login")}
					{isLoading ? "..." : ""}
				</button>
			</div>
		</form>
	);
}
