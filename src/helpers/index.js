import collatedTasks from '../constants';

export const collatedTasksExist = (selectedProject) => {
  collatedTasks.find((task) => selectedProject === task);
};
