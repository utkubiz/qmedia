export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: {
		message: string;
		code?: string;
	};
}

export interface PaginatedResponse<T> extends ApiResponse {
	data: {
		items: T[];
		total: number;
		page: number;
		limit: number;
	};
}
