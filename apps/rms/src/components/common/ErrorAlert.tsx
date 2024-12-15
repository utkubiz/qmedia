export default function ErrorAlert({
	message,
}: {
	message: string;
}) {
	return (
		<div className="alert alert-error">
			<span>{message}</span>
		</div>
	);
}
