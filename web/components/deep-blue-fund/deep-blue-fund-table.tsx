'use client';
import { useState } from 'react';
import { seaCleaningProjects } from '../../data/seaCleaningProjects';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '../shadcn/Table';
import { useRouter } from 'next/navigation';

export default function DeepBlueFundTable() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const handleRowClick = (projectId: number) => {
    router.push(`/deep-blue-fund/project/${projectId}`);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const filteredProjects = seaCleaningProjects.filter((project) => {
    if (selectedStatus === 'All') return true;
    if (selectedStatus === 'Active' && project.status === 0) return true;
    if (selectedStatus === 'Upcoming' && project.status === 1) return true;
    if (selectedStatus === 'Finished' && project.status === 2) return true;
    return false;
  });

  const sortedProjects = [...filteredProjects].sort(
    (a, b) => b.fundingGoal - a.fundingGoal
  );

  return (
    <div className='p-8 border-[1px] rounded-lg'>
      <div className='mb-4 flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Projects</h1>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className='border p-2 rounded-md bg-transparent font-bold text-lg'
        >
          <option value='All'>All</option>
          <option value='Active'>Active</option>
          <option value='Upcoming'>Upcoming</option>
          <option value='Finished'>Finished</option>
        </select>
      </div>

      <div className='overflow-x-auto bg-foreground border-[1px] rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-xl font-bold'>Project Name</TableHead>
              <TableHead className='text-xl font-bold'>Location</TableHead>
              <TableHead className='text-xl font-bold'>Status</TableHead>
              <TableHead className='text-xl font-bold'>Start Date</TableHead>
              <TableHead className='text-xl font-bold'>End Date</TableHead>
              <TableHead className='text-xl font-bold'>Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project) => (
              <TableRow
                key={project.id}
                onClick={() => handleRowClick(project.id)}
                className='cursor-pointer hover:bg-gray-100'
              >
                <TableCell className='text-lg'>
                  {project.projectOwner}
                </TableCell>
                <TableCell className='text-lg'>
                  {project.locationName}
                </TableCell>
                <TableCell className='text-lg'>
                  {project.status === 0
                    ? 'Active'
                    : project.status === 1
                    ? 'Upcoming'
                    : project.status === 2
                    ? 'Finished'
                    : 'Unknown'}
                </TableCell>
                <TableCell className='text-lg'>{project.startDate}</TableCell>
                <TableCell className='text-lg'>{project.endDate}</TableCell>
                <TableCell className='text-lg'>
                  ${project.fundingGoal.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
