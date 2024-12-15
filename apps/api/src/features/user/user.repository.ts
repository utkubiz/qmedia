import { User } from "@/features/user/user.model";

export const UserRepository = {
	create: async ({ email, password, tenantId }: { email: string; password: string; tenantId: string }) => {
		const user = new User({ email, password, tenantId });
		return await user.save();
	},
	findById: async ({ id, tenantId }: { id: number; tenantId: string }) => {
		return User.findOne({ _id: id, tenantId });
	},
	findByEmail: async ({ email, tenantId }: { email: string; tenantId: string }) => {
		return User.findOne({ email, tenantId });
	},
};
