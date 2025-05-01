export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">User Profile</h1>
        <hr className="mb-6 border-gray-300 dark:border-gray-600" />
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Profile ID:
          <span className="inline-block mt-2 ml-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md break-all">
            {params.id}
          </span>
        </p>
      </div>
    </div>
  );
}
