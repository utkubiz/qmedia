import { Store } from "./store.model";

export const StoreRepository = {
	create: async ({ name }: { name: string }) => {
		return Store.create({ name });
	},
	findById: async ({ id }: { id: string }) => {
		return Store.findById(id);
	},
};
