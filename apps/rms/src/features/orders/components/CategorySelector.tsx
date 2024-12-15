interface CategorySelectorProps {
	categories: string[];
	selectedCategory: string | null;
	onSelectCategory: (category: string) => void;
}

export default function CategorySelector({ categories, selectedCategory, onSelectCategory }: CategorySelectorProps) {
	return (
		<div className="flex gap-2 pb-2 overflow-x-auto">
			{categories.map((category) => (
				<button
					key={category}
					type="button"
					onClick={() => onSelectCategory(category)}
					className={`btn min-w-fit ${selectedCategory === category ? "btn-primary" : "btn-ghost"}`}
				>
					{category}
				</button>
			))}
		</div>
	);
}
