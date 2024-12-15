import { StoreRepository } from "@/features/store/store.repository";

export const StoreService = {
	create: async ({ name }: { name: string }) => {
		return StoreRepository.create({ name });
	},
	findById: async ({ id }: { id: string }) => {
		return StoreRepository.findById({ id });
	},
};
