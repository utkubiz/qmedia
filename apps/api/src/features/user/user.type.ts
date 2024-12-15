export enum UserRoles {
	SUPER_ADMIN = "SUPER_ADMIN",
	STORE_OWNER = "STORE_OWNER",
	STORE_EMPLOYEE = "STORE_EMPLOYEE",
	STORE_CUSTOMER = "STORE_CUSTOMER",
}
export const userRolesEnumValues = Object.values(UserRoles).filter(() => true) as [string, ...string[]];
