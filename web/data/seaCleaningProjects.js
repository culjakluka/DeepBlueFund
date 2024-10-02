const ProjectStatus = {
  ACTIVE: 0,
  UPCOMING: 1,
  FINISHED: 2,
};

const seaCleaningProjects = [
  {
    id: 1,
    startDate: '2023-11-01',
    endDate: '2024-02-01',
    locationName: 'Zlatni Rat Beach',
    fundingGoal: 50000,
    projectOwner: 'Ocean Conservation Society',
    status: ProjectStatus.FINISHED,
  },
  {
    id: 2,
    startDate: '2024-05-15',
    endDate: '2024-08-15',
    locationName: 'Punta Rata Beach',
    fundingGoal: 30000,
    projectOwner: 'Clean Oceans Initiative',
    status: ProjectStatus.UPCOMING,
  },
  {
    id: 3,
    startDate: '2024-04-10',
    endDate: '2024-07-20',
    locationName: 'Sakarun Beach',
    fundingGoal: 75000,
    projectOwner: 'EcoWave Fund',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 4,
    startDate: '2023-12-01',
    endDate: '2024-05-01',
    locationName: 'Poreč Bay',
    fundingGoal: 200000,
    projectOwner: 'Blue Planet Alliance',
    status: ProjectStatus.FINISHED,
  },
  {
    id: 5,
    startDate: '2024-06-01',
    endDate: '2024-09-30',
    locationName: 'Banje Beach',
    fundingGoal: 100000,
    projectOwner: 'Sea Guardian Group',
    status: ProjectStatus.UPCOMING,
  },
  {
    id: 6,
    startDate: '2024-07-15',
    endDate: '2024-10-15',
    locationName: 'Brijuni National Park',
    fundingGoal: 120000,
    projectOwner: 'Oceanic Trust',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 7,
    startDate: '2024-09-01',
    endDate: '2024-12-01',
    locationName: 'Laguna Beach, Poreč',
    fundingGoal: 90000,
    projectOwner: 'Save Our Seas Foundation',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 8,
    startDate: '2024-10-10',
    endDate: '2024-12-10',
    locationName: 'Kamenjak Cape',
    fundingGoal: 45000,
    projectOwner: 'Marine Preservation Society',
    status: ProjectStatus.UPCOMING,
  },
  {
    id: 9,
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    locationName: 'Plitvice Lakes (Lake Cleanup)',
    fundingGoal: 60000,
    projectOwner: 'Island Clean Up Crew',
    status: ProjectStatus.FINISHED,
  },
  {
    id: 10,
    startDate: '2024-02-15',
    endDate: '2024-05-15',
    locationName: 'Krk Island',
    fundingGoal: 80000,
    projectOwner: 'Oceanic Trust',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 11,
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    locationName: 'Makarska Riviera',
    fundingGoal: 70000,
    projectOwner: 'Save Our Seas Foundation',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 12,
    startDate: '2024-04-01',
    endDate: '2024-07-01',
    locationName: 'Kornati National Park',
    fundingGoal: 95000,
    projectOwner: 'Marine Preservation Society',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 13,
    startDate: '2024-10-01',
    endDate: '2025-01-01',
    locationName: 'Brela Beach',
    fundingGoal: 40000,
    projectOwner: 'Blue Planet Alliance',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 14,
    startDate: '2024-06-01',
    endDate: '2024-09-01',
    locationName: 'Hvar Island',
    fundingGoal: 120000,
    projectOwner: 'EcoWave Fund',
    status: ProjectStatus.UPCOMING,
  },
  {
    id: 15,
    startDate: '2024-07-01',
    endDate: '2024-10-01',
    locationName: 'Omiš Riviera',
    fundingGoal: 150000,
    projectOwner: 'Sea Guardian Group',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 16,
    startDate: '2024-09-15',
    endDate: '2024-12-15',
    locationName: 'Sibenik-Knin County',
    fundingGoal: 80000,
    projectOwner: 'Ocean Conservation Society',
    status: ProjectStatus.UPCOMING,
  },
  {
    id: 17,
    startDate: '2024-05-01',
    endDate: '2024-08-01',
    locationName: 'Split Beach',
    fundingGoal: 50000,
    projectOwner: 'Clean Oceans Initiative',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 18,
    startDate: '2024-10-01',
    endDate: '2025-01-01',
    locationName: 'Sakarun Beach',
    fundingGoal: 100000,
    projectOwner: 'Island Clean Up Crew',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 19,
    startDate: '2024-09-01',
    endDate: '2024-12-01',
    locationName: 'Banje Beach',
    fundingGoal: 70000,
    projectOwner: 'Oceanic Trust',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 20,
    startDate: '2024-12-01',
    endDate: '2025-03-01',
    locationName: 'Brijuni National Park',
    fundingGoal: 90000,
    projectOwner: 'Save Our Seas Foundation',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 21,
    startDate: '2024-11-01',
    endDate: '2025-02-01',
    locationName: 'Laguna Beach, Poreč',
    fundingGoal: 50000,
    projectOwner: 'Marine Preservation Society',
    status: ProjectStatus.UPCOMING,
  },
  {
    id: 22,
    startDate: '2024-08-01',
    endDate: '2024-11-01',
    locationName: 'Kamenjak Cape',
    fundingGoal: 30000,
    projectOwner: 'Blue Planet Alliance',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 23,
    startDate: '2024-10-01',
    endDate: '2025-01-01',
    locationName: 'Plitvice Lakes (Lake Cleanup)',
    fundingGoal: 60000,
    projectOwner: 'Sea Guardian Group',
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 24,
    startDate: '2024-04-01',
    endDate: '2024-07-01',
    locationName: 'Krk Island',
    fundingGoal: 80000,
    projectOwner: 'Ocean Conservation Society',
    status: ProjectStatus.UPCOMING,
  },
];

export { seaCleaningProjects, ProjectStatus };
