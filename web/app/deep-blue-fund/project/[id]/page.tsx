import { seaCleaningProjects } from '../../../../data/seaCleaningProjects';
import { notFound } from 'next/navigation';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = seaCleaningProjects.find((proj) => proj.id === parseInt(params.id));

  if (!project) {
    return notFound();
  }

  return (
      <div className="flex flex-col md:flex-row justify-between gap-12 p-20 bg-[#1a1a1a] text-white rounded-xl shadow-lg max-w-5xl w-full">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-6">
            <div>
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
            Description of the project goes here.
          </p>
        </div>

        <div className=" bg-[#292929] p-8 rounded-lg shadow-xl flex flex-col gap-6">
          <div className="flex gap-8 items-center">
            <h2 className="text-2xl font-bold">Total Rewards</h2>
            <p className="text-3xl font-semibold">{project.fundingGoal.toLocaleString()} USD</p>
          </div>

          <div className="flex flex-col gap-6 border-t border-gray-600 pt-6">
            <div className="flex justify-between">
              <span className="text-gray-400 text-lg">Status</span>
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
              <span className="text-gray-400 text-lg">Start Time</span>
              <span className="text-white text-xl">{project.startDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400 text-lg">End Time</span>
              <span className="text-white text-xl">{project.endDate}</span>
            </div>
          </div>

          <button className="mt-8 bg-purple-600 text-white py-3 text-lg rounded-md hover:bg-purple-700 transition">
            Donate to this project
          </button>
        </div>
      </div>
  );
}
