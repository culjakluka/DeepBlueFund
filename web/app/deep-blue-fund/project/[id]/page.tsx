import { notFound } from 'next/navigation';
import PocketBase from 'pocketbase';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const url = 'https://deep-blue-fund.pockethost.io/';
  const client = new PocketBase(url);

  let project;
  try {
    project = await client.collection('seaCleaningProjects').getOne(params.id);
  } catch (error) {
    return notFound();
  }

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-12 p-20 text-white rounded-xl shadow-lg max-w-5xl w-full mt-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-6">
          <div className="mx-12">
            <h1 className="text-4xl mb-4 font-bold">{project.projectOwner}</h1>
            <span className={`text-lg px-3 py-1 rounded-md ${
              project.status === 0
                ? 'bg-green-500'
                : project.status === 1
                ? 'bg-orange-500'
                : project.status === 2
                ? 'bg-red-500'
                : 'bg-gray-500'
            }`}>
              {project.status === 0
                ? 'Active'
                : project.status === 1
                ? 'Upcoming'
                : project.status === 2
                ? 'Finished'
                : 'Unknown'}
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-xl">
          {project.description}
        </p>
      </div>

      <div className="rounded-lg shadow-xl flex flex-col gap-6">
        <div className="flex gap-8 items-center">
          <h2 className="text-2xl font-bold text-nowrap">Total Rewards:</h2>
          <p className="text-3xl font-semibold text-nowrap">{project.fundingGoal.toLocaleString()} USD</p>
        </div>

        <div className="flex flex-col gap-6 border-t border-gray-600 pt-6">
          <div className="flex justify-between">
            <span className="text-gray-400 text-lg">Status:</span>
            <span className="text-white text-xl">
              {project.status === 0
                ? 'Active'
                : project.status === 1
                ? 'Upcoming'
                : project.status === 2
                ? 'Finished'
                : 'Unknown'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 text-lg">Start Time:</span>
            <span className="text-white text-xl ml-2">{(project.startDate)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 text-lg">End Time:</span>
            <span className="text-white text-xl ml-2">{(project.endDate)}</span>
          </div>
        </div>
          {(project.status === 0 || project.status === 1) && (
            <button className="mt-8 bg-blue-600 text-white py-3 text-lg rounded-md hover:bg-blue-700 transition">
              Donate to this project
            </button>
          )}
      </div>
    </div>
  );
}
