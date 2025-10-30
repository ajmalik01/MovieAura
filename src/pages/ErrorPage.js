export default function ErrorPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white bg-neutral-900">
      <h1 className="text-4xl font-bold mb-3">404 - Page Not Found</h1>
      <p className="opacity-75">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
        Go Home
      </a>
    </div>
  );
}
